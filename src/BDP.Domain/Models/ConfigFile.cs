namespace BDP.Domain.Models;

public class ConfigFile
{
    public string Name { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public Dictionary<string, string> Sources { get; init; } = new();
    public Dictionary<string, object>? Metadata { get; }
    public IReadOnlyCollection<string>? Registries { get; }
}
