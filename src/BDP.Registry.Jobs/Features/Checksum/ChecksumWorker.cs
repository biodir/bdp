using BDP.Registry.Jobs.Abstractions;
using Hangfire;

namespace BDP.Registry.Jobs.Features.Checksum;

[Queue("checksum")]
internal sealed class ChecksumWorker
{
    private readonly IChecksumService _service;
    private readonly ILogger<ChecksumWorker> _logger;

    internal ChecksumWorker(IChecksumService service, ILogger<ChecksumWorker> logger)
    {
        _service = service;
        _logger = logger;
    }

    public async Task ExecuteAsync()
    {
        _logger.LogInformation("ChecksumWorker started at {Time}", DateTimeOffset.Now);
        await _service.VerifyAllAsync();
        _logger.LogInformation("ChecksumWorker completed at {Time}", DateTimeOffset.Now);
    }
}
