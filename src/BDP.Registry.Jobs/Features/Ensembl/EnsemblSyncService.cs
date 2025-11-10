using BDP.Registry.Jobs.Abstractions;

namespace BDP.Registry.Jobs.Features.Ensembl;

public sealed class EnsemblSyncService : IEnsemblSyncService
{
    private readonly ILogger<EnsemblSyncService> _logger;

    public EnsemblSyncService(ILogger<EnsemblSyncService> logger)
    {
        _logger = logger;
    }

    public Task SyncAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Executing Ensembl sync...");
        return Task.CompletedTask;
    }
}
