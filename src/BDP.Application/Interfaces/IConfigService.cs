using BDP.Domain.Models;

namespace BDP.Application.Interfaces;

public interface IConfigService
{
    Task<ConfigFile?> LoadConfigAsync(string? directory = null);
    Task SaveConfigAsync(ConfigFile config, string? directory = null);
    Task<bool> ExistsAsync(string? directory = null);
}
