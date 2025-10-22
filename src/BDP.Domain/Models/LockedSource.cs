using System.Collections.ObjectModel;

namespace BDP.Domain.Models;

/// <summary>
/// Represents a locked source in bdp.lock file with exact URLs and checksums
/// </summary>
public class LockedSource
{
    public string Name { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public DateTime ResolvedAt { get; set; }
    public Collection<LockedFile> Files { get; init; } = new();
}
