using BDP.Registry.Jobs.Abstractions;
using Hangfire;

namespace BDP.Registry.Jobs.Features.Ncbi;

[Queue("indexing")]
internal sealed class NcbiWorker : BaseSyncWorker<INcbiSyncService>
{
    internal NcbiWorker(INcbiSyncService service, ILogger<NcbiWorker> logger)
        : base(service, logger, nameof(NcbiWorker)) { }
}
