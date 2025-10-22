using BDP.Application.Interfaces;
using BDP.Domain.Common;
using BDP.Domain.Models;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace BDP.Application.Services;

public class ConfigService : IConfigService
{
    private readonly ISerializer _serializer;
    private readonly IDeserializer _deserializer;

    public ConfigService()
    {
        _serializer = new SerializerBuilder()
            .WithNamingConvention(CamelCaseNamingConvention.Instance)
            .Build();

        _deserializer = new DeserializerBuilder()
            .WithNamingConvention(CamelCaseNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .Build();
    }

    public async Task<ConfigFile?> LoadConfigAsync(string? directory = null)
    {
        directory ??= Directory.GetCurrentDirectory();
        var configPath = Path.Combine(directory, Constants.ConfigFileName);

        if (!File.Exists(configPath))
        {
            return null;
        }

        try
        {
            var yaml = await File.ReadAllTextAsync(configPath);
            return _deserializer.Deserialize<ConfigFile>(yaml);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to load config file: {ex.Message}", ex);
        }
    }

    public async Task SaveConfigAsync(ConfigFile config, string? directory = null)
    {
        directory ??= Directory.GetCurrentDirectory();
        var configPath = Path.Combine(directory, Constants.ConfigFileName);

        try
        {
            var yaml = _serializer.Serialize(config);
            await File.WriteAllTextAsync(configPath, yaml);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to save config file: {ex.Message}", ex);
        }
    }

    public Task<bool> ExistsAsync(string? directory = null)
    {
        directory ??= Directory.GetCurrentDirectory();
        var configPath = Path.Combine(directory, Constants.ConfigFileName);
        return Task.FromResult(File.Exists(configPath));
    }
}
