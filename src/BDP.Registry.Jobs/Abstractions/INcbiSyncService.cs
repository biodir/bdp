namespace BDP.Registry.Jobs.Abstractions;

public interface INcbiSyncService
{
    Task SyncAsync(CancellationToken cancellationToken = default);
}
