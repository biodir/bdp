namespace BDP.Domain.Models;

/// <summary>
/// Represents a file in bdp.lock with exact URL and checksum for reproducibility
/// </summary>
public class LockedFile
{
    public string Name { get; set; } = string.Empty;
    public Uri Url { get; set; } = new("");
    public string Checksum { get; set; } = string.Empty;
    public string ChecksumAlgorithm { get; set; } = "sha256";
    public long Size { get; set; }
    public DateTime DownloadedAt { get; set; }
}
