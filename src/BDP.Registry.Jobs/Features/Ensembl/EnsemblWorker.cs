using BDP.Registry.Jobs.Abstractions;
using Hangfire;

namespace BDP.Registry.Jobs.Features.Ensembl;

[Queue("indexing")]
public sealed class EnsemblWorker : IWorker
{
    private readonly IEnsemblSyncService _ensemblSyncService;
    private readonly ILogger<EnsemblWorker> _logger;

    public EnsemblWorker(IEnsemblSyncService ensemblSyncService, ILogger<EnsemblWorker> logger)
    {
        _ensemblSyncService = ensemblSyncService;
        _logger = logger;
    }

    public async Task ExecuteAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting Ensembl sync job");

        try
        {
            await _ensemblSyncService.SyncAsync(cancellationToken);
            _logger.LogInformation("Ensembl sync job completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred during Ensembl sync job");
            throw;
        }
    }
}
