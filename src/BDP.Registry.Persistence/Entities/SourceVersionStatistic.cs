namespace BDP.Registry.Persistence.Entities;

public class SourceVersionStatistic
{
    public Guid Id { get; set; }
    public Guid SourceVersionId { get; set; }
    public DateTime Date { get; set; }
    public int DownloadCount { get; set; }

    public SourceVersion SourceVersion { get; set; } = null!;
}
