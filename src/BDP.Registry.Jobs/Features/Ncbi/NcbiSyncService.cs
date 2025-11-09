using BDP.Registry.Jobs.Abstractions;

namespace BDP.Registry.Jobs.Features.Ncbi;

internal sealed class NcbiSyncService : INcbiSyncService
{
    private readonly ILogger<NcbiSyncService> _logger;

    internal NcbiSyncService(ILogger<NcbiSyncService> logger)
    {
        _logger = logger;
    }

    public Task SyncAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Executing NCBI sync...");
        return Task.CompletedTask;
    }
}
