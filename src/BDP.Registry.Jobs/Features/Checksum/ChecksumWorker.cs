using BDP.Registry.Jobs.Abstractions;
using Hangfire;

namespace BDP.Registry.Jobs.Features.Checksum;

[Queue("checksum")]
public sealed class ChecksumWorker : IWorker
{
    private readonly IChecksumService _service;
    private readonly ILogger<ChecksumWorker> _logger;

    public ChecksumWorker(IChecksumService service, ILogger<ChecksumWorker> logger)
    {
        _service = service;
        _logger = logger;
    }

    public async Task ExecuteAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("ChecksumWorker started at {Time}", DateTimeOffset.Now);
        await _service.VerifyAllAsync(cancellationToken);
        _logger.LogInformation("ChecksumWorker completed at {Time}", DateTimeOffset.Now);
    }
}
