namespace BDP.Registry.Jobs.Abstractions;

public interface IUniprotSyncService
{
    Task SyncAsync(CancellationToken cancellationToken = default);
}
