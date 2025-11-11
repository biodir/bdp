namespace BDP.Registry.Persistence.Entities;

public class Tag
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<SourceVersionTag> SourceVersions { get; } = new List<SourceVersionTag>();
}
