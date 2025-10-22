using BDP.Domain.Models;

namespace BDP.Application.Interfaces;

public interface ISourceService
{
    Task<DataSource?> GetSourceAsync(string name);
    Task<SourceVersion?> GetSourceVersionAsync(string name, string version);
    Task<List<DataSource>> SearchSourcesAsync(string query);
    Task<List<string>> GetAvailableVersionsAsync(string name);
}
