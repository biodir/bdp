using BDP.Registry.Jobs.Abstractions;
using Hangfire;

namespace BDP.Registry.Jobs.Features.Uniprot;

[Queue("indexing")]
public sealed class UniprotWorker : IWorker
{
    private readonly IUniprotSyncService _uniprotSyncService;
    private readonly ILogger<UniprotWorker> _logger;

    public UniprotWorker(IUniprotSyncService uniprotSyncService, ILogger<UniprotWorker> logger)
    {
        _uniprotSyncService = uniprotSyncService;
        _logger = logger;
    }

    public async Task ExecuteAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting Uniprot sync job");

        try
        {
            await _uniprotSyncService.SyncAsync(cancellationToken);
            _logger.LogInformation("Uniprot sync job completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred during Uniprot sync job");
            throw;
        }
    }
}
