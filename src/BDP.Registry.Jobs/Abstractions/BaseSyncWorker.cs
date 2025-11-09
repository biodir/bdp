namespace BDP.Registry.Jobs.Abstractions;

internal abstract class BaseSyncWorker<TService>
    where TService : ISourceSyncService
{
    private readonly TService _service;
    private readonly ILogger _logger;
    private readonly string _name;

    protected BaseSyncWorker(TService service, ILogger logger, string name)
    {
        _service = service;
        _logger = logger;
        _name = name;
    }

    public async Task ExecuteAsync()
    {
        _logger.LogInformation("{Worker} started at {Time}", _name, DateTimeOffset.Now);
        await _service.SyncAsync();
        _logger.LogInformation("{Worker} completed at {Time}", _name, DateTimeOffset.Now);
    }
}
