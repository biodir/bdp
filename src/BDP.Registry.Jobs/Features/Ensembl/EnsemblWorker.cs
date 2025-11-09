using BDP.Registry.Jobs.Abstractions;
using Hangfire;

namespace BDP.Registry.Jobs.Features.Ensembl;

[Queue("indexing")]
internal sealed class EnsemblWorker : BaseSyncWorker<IEnsemblSyncService>
{
    internal EnsemblWorker(IEnsemblSyncService service, ILogger<EnsemblWorker> logger)
        : base(service, logger, nameof(EnsemblWorker)) { }
}
