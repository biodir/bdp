using System.Net.Http.Json;
using BDP.Application.Interfaces;
using BDP.Domain.Common;
using BDP.Domain.Models;

namespace BDP.Infrastructure.Registry;

public class HttpSourceRegistry : ISourceRegistry
{
    private readonly HttpClient _httpClient;
    private readonly Uri _registryUrl;

    public HttpSourceRegistry(HttpClient httpClient, Uri? registryUrl = null)
    {
        _httpClient = httpClient;
        _registryUrl = registryUrl ?? Constants.DefaultRegistryUrl;
    }

    public async Task<List<DataSource>> GetAllSourcesAsync()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<List<DataSource>>($"{_registryUrl}/api/sources");
            return response ?? new List<DataSource>();
        }
        catch (HttpRequestException ex)
        {
            throw new InvalidOperationException($"Failed to fetch sources from registry: {ex.Message}", ex);
        }
    }

    public async Task<DataSource?> GetSourceAsync(string name)
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<DataSource>($"{_registryUrl}/api/sources/{name}");
            return response;
        }
        catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
        catch (HttpRequestException ex)
        {
            throw new InvalidOperationException($"Failed to fetch source '{name}' from registry: {ex.Message}", ex);
        }
    }

    public async Task<SourceVersion?> GetSourceVersionAsync(string name, string version)
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<SourceVersion>(
                $"{_registryUrl}/api/sources/{name}/versions/{version}");
            return response;
        }
        catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
        catch (HttpRequestException ex)
        {
            throw new InvalidOperationException(
                $"Failed to fetch version '{version}' for source '{name}' from registry: {ex.Message}", ex);
        }
    }

    public async Task<List<string>> GetAvailableVersionsAsync(string name)
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<List<string>>(
                $"{_registryUrl}/api/sources/{name}/versions");
            return response ?? new List<string>();
        }
        catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return new List<string>();
        }
        catch (HttpRequestException ex)
        {
            throw new InvalidOperationException(
                $"Failed to fetch versions for source '{name}' from registry: {ex.Message}", ex);
        }
    }

    public async Task<List<DataSource>> SearchSourcesAsync(string query)
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<List<DataSource>>(
                $"{_registryUrl}/api/search?q={Uri.EscapeDataString(query)}");
            return response ?? new List<DataSource>();
        }
        catch (HttpRequestException ex)
        {
            throw new InvalidOperationException($"Failed to search sources in registry: {ex.Message}", ex);
        }
    }
}
