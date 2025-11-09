using BDP.Registry.Jobs.Abstractions;

namespace BDP.Registry.Jobs.Features.Uniprot;

internal sealed class UniprotSyncService : IUniprotSyncService
{
    private readonly ILogger<UniprotSyncService> _logger;

    internal UniprotSyncService(ILogger<UniprotSyncService> logger)
    {
        _logger = logger;
    }

    public Task SyncAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Executing UniProt sync...");
        return Task.CompletedTask;
    }
}
