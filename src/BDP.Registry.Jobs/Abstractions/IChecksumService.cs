namespace BDP.Registry.Jobs.Abstractions;

public interface IChecksumService
{
    Task VerifyAllAsync(CancellationToken cancellationToken = default);
}
