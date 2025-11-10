namespace BDP.Registry.Jobs.Abstractions;

public interface IWorker
{
    Task ExecuteAsync(CancellationToken cancellationToken = default);
}
