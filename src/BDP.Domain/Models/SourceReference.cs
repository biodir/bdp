namespace BDP.Domain.Models;

/// <summary>
/// Represents a reference to a source in bdp.yml (can be registry or inline)
/// </summary>
public class SourceReference
{
    public string Name { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;

    // For inline/custom sources (not from registry)
    public Uri? Url { get; set; }
    public string? Checksum { get; set; }
    public string? ChecksumAlgorithm { get; set; }
    public long? Size { get; set; }
}
