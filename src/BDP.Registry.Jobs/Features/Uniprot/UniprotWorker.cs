using BDP.Registry.Jobs.Abstractions;
using Hangfire;

namespace BDP.Registry.Jobs.Features.Uniprot;

[Queue("indexing")]
internal sealed class UniprotWorker : BaseSyncWorker<IUniprotSyncService>
{
    internal UniprotWorker(IUniprotSyncService service, ILogger<UniprotWorker> logger)
        : base(service, logger, nameof(UniprotWorker)) { }
}
