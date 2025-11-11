namespace BDP.Registry.Persistence.Entities;

public class SourceEntry
{
    public Guid Id { get; set; }
    public Guid OrganizationId { get; set; }
    public string ExternalId { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Organization Organization { get; set; } = null!;
    public ICollection<SourceVersion> Versions { get; } = new List<SourceVersion>();
}

