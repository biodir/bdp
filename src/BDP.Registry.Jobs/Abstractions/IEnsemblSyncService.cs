namespace BDP.Registry.Jobs.Abstractions;

public interface IEnsemblSyncService
{
    Task SyncAsync(CancellationToken cancellationToken = default);
}
