using BDP.Domain.Models;

namespace BDP.Application.Interfaces;

public interface ISourceRegistry
{
    Task<List<DataSource>> GetAllSourcesAsync();
    Task<DataSource?> GetSourceAsync(string name);
    Task<SourceVersion?> GetSourceVersionAsync(string name, string version);
    Task<List<string>> GetAvailableVersionsAsync(string name);
    Task<List<DataSource>> SearchSourcesAsync(string query);
}
