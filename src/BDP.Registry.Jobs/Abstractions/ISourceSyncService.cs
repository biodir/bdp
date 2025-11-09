namespace BDP.Registry.Jobs.Abstractions;

internal interface ISourceSyncService
{
    Task SyncAsync(CancellationToken cancellationToken = default);
}

internal interface IEnsemblSyncService : ISourceSyncService { }
internal interface IUniprotSyncService : ISourceSyncService { }
internal interface INcbiSyncService : ISourceSyncService { }
