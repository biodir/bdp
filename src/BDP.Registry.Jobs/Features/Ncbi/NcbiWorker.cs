using BDP.Registry.Jobs.Abstractions;
using Hangfire;

namespace BDP.Registry.Jobs.Features.Ncbi;

[Queue("indexing")]
public sealed class NcbiWorker : IWorker
{
    private readonly INcbiSyncService _ncbiSyncService;
    private readonly ILogger<NcbiWorker> _logger;

    public NcbiWorker(INcbiSyncService ncbiSyncService, ILogger<NcbiWorker> logger)
    {
        _ncbiSyncService = ncbiSyncService;
        _logger = logger;
    }

    public async Task ExecuteAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting NCBI sync job");

        try
        {
            await _ncbiSyncService.SyncAsync(cancellationToken);
            _logger.LogInformation("NCBI sync job completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred during NCBI sync job");
            throw;
        }
    }
}
