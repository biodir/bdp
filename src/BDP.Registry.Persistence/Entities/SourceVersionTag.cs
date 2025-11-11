namespace BDP.Registry.Persistence.Entities;

public class SourceVersionTag
{
    public Guid SourceVersionId { get; set; }
    public Guid TagId { get; set; }

    public SourceVersion SourceVersion { get; set; } = null!;
    public Tag Tag { get; set; } = null!;
}
