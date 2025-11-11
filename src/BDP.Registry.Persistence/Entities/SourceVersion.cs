namespace BDP.Registry.Persistence.Entities;

public class SourceVersion
{
    public Guid Id { get; set; }
    public Guid SourceEntryId { get; set; }
    public string? ExternalVersion { get; set; } // version in the external source DB
    public int Version { get; set; } // internal versioning
    public Guid? SpeciesId { get; set; }
    public DateTime? LastUpdated { get; set; }
    public string? AdditionalMetadata { get; set; }

    // Navigation
    public SourceEntry SourceEntry { get; set; } = null!;
    public Species? Species { get; set; }
    public ICollection<Download> Downloads { get; } = new List<Download>();
    public ICollection<Citation> Citations { get; } = new List<Citation>();
    public ICollection<SourceVersionTag> Tags { get; } = new List<SourceVersionTag>();
    public ICollection<SourceVersionStatistic> Statistics { get; } = new List<SourceVersionStatistic>();
}
