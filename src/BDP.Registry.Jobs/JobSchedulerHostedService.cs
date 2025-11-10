using BDP.Registry.Jobs.Abstractions;
using BDP.Registry.Jobs.Features.Checksum;
using BDP.Registry.Jobs.Features.Ensembl;
using BDP.Registry.Jobs.Features.Ncbi;
using BDP.Registry.Jobs.Features.Uniprot;
using Hangfire;

namespace BDP.Registry.Jobs;

public sealed class JobSchedulerHostedService : IHostedService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<JobSchedulerHostedService> _logger;
    private readonly IServiceProvider _serviceProvider;

    public JobSchedulerHostedService(
        IConfiguration configuration,
        ILogger<JobSchedulerHostedService> logger,
        IServiceProvider serviceProvider)
    {
        _configuration = configuration;
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Registering Hangfire recurring jobs...");

        using var scope = _serviceProvider.CreateScope();
        var recurringJobManager = scope.ServiceProvider.GetRequiredService<IRecurringJobManager>();

        var jobsSection = _configuration.GetSection("Jobs");

        ScheduleJob<ChecksumWorker>("Checksum:Verify", "verify-checksums", jobsSection, recurringJobManager);
        ScheduleJob<EnsemblWorker>("Sync:Ensembl", "sync-ensembl", jobsSection, recurringJobManager);
        ScheduleJob<UniprotWorker>("Sync:Uniprot", "sync-uniprot", jobsSection, recurringJobManager);
        ScheduleJob<NcbiWorker>("Sync:Ncbi", "sync-ncbi", jobsSection, recurringJobManager);

        _logger.LogInformation("Hangfire recurring job registration completed");
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("JobScheduler hosted service stopping");
        return Task.CompletedTask;
    }

    private void ScheduleJob<TWorker>(string configKey, string jobId, IConfigurationSection jobsSection, IRecurringJobManager recurringJobManager)
        where TWorker : class, IWorker
    {
        var section = jobsSection.GetSection(configKey);
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

        recurringJobManager.AddOrUpdate(jobId, () => ExecuteWorkerAsync(typeof(TWorker)), cron,
            new RecurringJobOptions
            {
                TimeZone = TimeZoneInfo.Utc
            });

        _logger.LogInformation("✓ Scheduled {JobId} at {Cron}", jobId, cron);
    }

    public async Task ExecuteWorkerAsync(Type workerType)
    {
        using var scope = _serviceProvider.CreateScope();
        var worker = (IWorker)scope.ServiceProvider.GetRequiredService(workerType);
        await worker.ExecuteAsync(CancellationToken.None);
    }
}
