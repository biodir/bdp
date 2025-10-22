namespace BDP.Domain.Models;

public class SourceFile
{
    public int Id { get; set; }
    public int VersionId { get; set; }
    public string Name { get; set; } = string.Empty;
    public Uri Url { get; set; } = new("");
    public long Size { get; set; }
    public string Checksum { get; set; } = string.Empty;
    public string ChecksumAlgorithm { get; set; } = "sha256";
    public DateTime CreatedAt { get; set; }
}
