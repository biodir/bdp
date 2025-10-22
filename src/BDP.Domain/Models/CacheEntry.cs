namespace BDP.Domain.Models;

/// <summary>
/// Represents a cached source file on disk
/// </summary>
public class CacheEntry
{
    public string SourceName { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string LocalPath { get; set; } = string.Empty;
    public string Checksum { get; set; } = string.Empty;
    public long Size { get; set; }
    public DateTime CachedAt { get; set; }
    public DateTime LastAccessedAt { get; set; }
}
