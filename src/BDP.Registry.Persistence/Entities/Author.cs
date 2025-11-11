namespace BDP.Registry.Persistence.Entities;

public class Author
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<CitationAuthor> Citations { get; } = new List<CitationAuthor>();
}
