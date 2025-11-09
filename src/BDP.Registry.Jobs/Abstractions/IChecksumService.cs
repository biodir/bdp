namespace BDP.Registry.Jobs.Abstractions;

internal interface IChecksumService
{
    Task VerifyAllAsync(CancellationToken cancellationToken = default);
}
