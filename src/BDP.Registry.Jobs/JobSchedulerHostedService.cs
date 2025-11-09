using System.Linq.Expressions;
using BDP.Registry.Jobs.Features.Checksum;
using BDP.Registry.Jobs.Features.Ensembl;
using BDP.Registry.Jobs.Features.Ncbi;
using BDP.Registry.Jobs.Features.Uniprot;
using Hangfire;

namespace BDP.Registry.Jobs;

internal sealed class JobSchedulerHostedService : IHostedService
{
    private readonly IRecurringJobManager _recurringJobManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<JobSchedulerHostedService> _logger;

    internal JobSchedulerHostedService(
        IRecurringJobManager recurringJobManager,
        IConfiguration configuration,
        ILogger<JobSchedulerHostedService> logger)
    {
        _recurringJobManager = recurringJobManager;
        _configuration = configuration;
        _logger = logger;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Registering Hangfire recurring jobs...");

        var jobs = _configuration.GetSection("Jobs");

        ScheduleJob<EnsemblWorker>("Ensembl", "sync-ensembl", jobs, w => w.ExecuteAsync());
        ScheduleJob<UniprotWorker>("Uniprot", "sync-uniprot", jobs, w => w.ExecuteAsync());
        ScheduleJob<NcbiWorker>("Ncbi", "sync-ncbi", jobs, w => w.ExecuteAsync());

        var checksumSection = jobs.GetSection("Checksum:Verify");
        if (checksumSection.Exists() && checksumSection.GetValue<bool>("Enabled"))
        {
            var cron = checksumSection.GetValue<string>("Cron");
            if (!string.IsNullOrWhiteSpace(cron))
            {
                _recurringJobManager.AddOrUpdate<ChecksumWorker>(
                    "verify-checksums",
                    w => w.ExecuteAsync(),
                    cron,
                    new RecurringJobOptions { TimeZone = TimeZoneInfo.Utc });

                _logger.LogInformation("✓ Scheduled checksum verification at {Cron}", cron);
            }
        }

        _logger.LogInformation("Hangfire recurring job registration completed");
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("JobScheduler hosted service stopping");
        return Task.CompletedTask;
    }

    private void ScheduleJob<TWorker>(
        string configKey,
        string jobId,
        IConfigurationSection jobsSection,
        Expression<Func<TWorker, Task>> methodCall)
        where TWorker : class
    {
        var section = jobsSection.GetSection($"Sync:{configKey}");
        if (!section.Exists())
        {
            _logger.LogWarning("Configuration for {ConfigKey} not found", configKey);
            return;
        }

        bool enabled = section.GetValue<bool>("Enabled");
        string? cron = section.GetValue<string>("Cron");

        if (!enabled)
        {
            _logger.LogInformation("⊗ Job {JobId} is disabled", jobId);
            return;
        }

        if (string.IsNullOrWhiteSpace(cron))
        {
            _logger.LogWarning("⊗ Job {JobId} has invalid cron expression", jobId);
            return;
        }

        _recurringJobManager.AddOrUpdate(
            jobId,
            methodCall,
            cron,
            new RecurringJobOptions { TimeZone = TimeZoneInfo.Utc });

        _logger.LogInformation("✓ Scheduled {JobId} at {Cron}", jobId, cron);
    }
}
