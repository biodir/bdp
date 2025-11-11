namespace BDP.Registry.Persistence.Entities;

public class Organization
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Website { get; set; }
    public string? Description { get; set; }

    public ICollection<SourceEntry> SourceEntries { get; } = new List<SourceEntry>();
}
