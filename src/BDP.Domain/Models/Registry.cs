namespace BDP.Domain.Models;

/// <summary>
/// Represents a registry configuration
/// </summary>
public class Registry
{
    public string Name { get; set; } = string.Empty;
    public Uri Url { get; set; } = new("");
    public int Priority { get; set; }
    public bool Enabled { get; set; } = true;
}
