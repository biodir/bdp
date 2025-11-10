using BDP.Registry.Jobs.Abstractions;

namespace BDP.Registry.Jobs.Features.Uniprot;

public sealed class UniprotSyncService : IUniprotSyncService
{
    private readonly ILogger<UniprotSyncService> _logger;

    public UniprotSyncService(ILogger<UniprotSyncService> logger)
    {
        _logger = logger;
    }

    public Task SyncAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Executing Uniprot sync...");
        return Task.CompletedTask;
    }
}
