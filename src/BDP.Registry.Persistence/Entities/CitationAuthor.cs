namespace BDP.Registry.Persistence.Entities;

public class CitationAuthor
{
    public Guid CitationId { get; set; }
    public Guid AuthorId { get; set; }

    public Citation Citation { get; set; } = null!;
    public Author Author { get; set; } = null!;
}
