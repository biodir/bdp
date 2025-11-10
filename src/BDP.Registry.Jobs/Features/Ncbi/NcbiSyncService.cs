using BDP.Registry.Jobs.Abstractions;

namespace BDP.Registry.Jobs.Features.Ncbi;

public sealed class NcbiSyncService : INcbiSyncService
{
    private readonly ILogger<NcbiSyncService> _logger;

    public NcbiSyncService(ILogger<NcbiSyncService> logger)
    {
        _logger = logger;
    }

    public Task SyncAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Executing NCBI sync...");
        return Task.CompletedTask;
    }
}
