using BDP.Application.Interfaces;
using BDP.Domain.Models;

namespace BDP.Application.Services;

public class SourceService : ISourceService
{
    private readonly ISourceRegistry _sourceRegistry;

    public SourceService(ISourceRegistry sourceRegistry)
    {
        _sourceRegistry = sourceRegistry;
    }

    public async Task<DataSource?> GetSourceAsync(string name)
    {
        return await _sourceRegistry.GetSourceAsync(name);
    }

    public async Task<SourceVersion?> GetSourceVersionAsync(string name, string version)
    {
        return await _sourceRegistry.GetSourceVersionAsync(name, version);
    }

    public async Task<List<DataSource>> SearchSourcesAsync(string query)
    {
        return await _sourceRegistry.SearchSourcesAsync(query);
    }

    public async Task<List<string>> GetAvailableVersionsAsync(string name)
    {
        return await _sourceRegistry.GetAvailableVersionsAsync(name);
    }
}
