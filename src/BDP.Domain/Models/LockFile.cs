namespace BDP.Domain.Models;

/// <summary>
/// Represents bdp.lock file - captures exact state of installed sources
/// </summary>
public class LockFile
{
    public string Version { get; set; } = "1.0";
    public DateTime GeneratedAt { get; set; }
    public Dictionary<string, LockedSource> Sources { get; } = new();
}
