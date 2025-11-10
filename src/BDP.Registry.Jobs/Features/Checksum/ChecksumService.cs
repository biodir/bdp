using BDP.Registry.Jobs.Abstractions;

namespace BDP.Registry.Jobs.Features.Checksum;

public sealed class ChecksumService : IChecksumService
{
    private readonly ILogger<ChecksumService> _logger;

    public ChecksumService(ILogger<ChecksumService> logger)
    {
        _logger = logger;
    }

    public Task VerifyAllAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Executing checksum verification...");
        return Task.CompletedTask;
    }
}
