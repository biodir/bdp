using BDP.Registry.Jobs;
using BDP.Registry.Jobs.Abstractions;
using BDP.Registry.Jobs.Features.Checksum;
using BDP.Registry.Jobs.Features.Ensembl;
using BDP.Registry.Jobs.Features.Ncbi;
using BDP.Registry.Jobs.Features.Uniprot;
using BDP.Registry.Jobs.Utils;
using BDP.Registry.Persistence;
using Hangfire;
using Hangfire.PostgreSql;
using Serilog;

var builder = Host.CreateApplicationBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.AddSerilog((services, loggerConfiguration) =>
{
    loggerConfiguration
        .ReadFrom.Configuration(builder.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext()
        .Enrich.WithProperty("Application", "BDP.Registry.Jobs");
});

var registryDb = builder.Configuration.GetConnectionString("RegistryDatabase")
    ?? throw new InvalidOperationException("Missing RegistryDatabase connection string.");

var hangfireDb = builder.Configuration.GetConnectionString("HangfireDatabase")
    ?? throw new InvalidOperationException("Missing HangfireDatabase connection string.");

await DbUtils.EnsureDatabaseExistsAsync(hangfireDb, builder.Environment.IsDevelopment());

builder.Services.AddRegistryPersistence(registryDb, builder.Environment.IsDevelopment());

builder.Services.AddHangfire((serviceProvider, config) =>
{
    config
        .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
        .UseSimpleAssemblyNameTypeSerializer()
        .UseRecommendedSerializerSettings()
        .UsePostgreSqlStorage(c => c.UseNpgsqlConnection(hangfireDb), new PostgreSqlStorageOptions
        {
            PrepareSchemaIfNecessary = true,
            SchemaName = "hangfire",
            QueuePollInterval = TimeSpan.FromSeconds(15),
            JobExpirationCheckInterval = TimeSpan.FromHours(1),
            CountersAggregateInterval = TimeSpan.FromMinutes(5),
            InvisibilityTimeout = TimeSpan.FromMinutes(30)
        })
        .UseFilter(new AutomaticRetryAttribute { Attempts = 3 });
});

var hangfireSection = builder.Configuration.GetSection("Hangfire");
int workerCount = hangfireSection.GetValue<int?>("WorkerCount") ?? Math.Max(Environment.ProcessorCount, 4);
var queues = hangfireSection.GetSection("Queues").Get<string[]>() ?? new[] { "default" };

builder.Services.AddHangfireServer(options =>
{
    options.WorkerCount = workerCount;
    options.Queues = queues;
    options.ServerName = $"bdp-jobs-{Environment.MachineName}-{Guid.NewGuid():N}";
    options.SchedulePollingInterval = TimeSpan.FromSeconds(15);
    options.ServerCheckInterval = TimeSpan.FromMinutes(1);
    options.ServerTimeout = TimeSpan.FromMinutes(5);
    options.ShutdownTimeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddHttpClient();

// Register services and workers
builder.Services.AddScoped<IChecksumService, ChecksumService>();
builder.Services.AddScoped<ChecksumWorker>();

builder.Services.AddScoped<IEnsemblSyncService, EnsemblSyncService>();
builder.Services.AddScoped<IUniprotSyncService, UniprotSyncService>();
builder.Services.AddScoped<INcbiSyncService, NcbiSyncService>();

builder.Services.AddScoped<EnsemblWorker>();
builder.Services.AddScoped<UniprotWorker>();
builder.Services.AddScoped<NcbiWorker>();

builder.Services.AddHostedService<JobSchedulerHostedService>();

var app = builder.Build();

Log.Information("BDP.Registry.Jobs service started with {WorkerCount} workers", workerCount);
await app.RunAsync();

await Log.CloseAndFlushAsync();
