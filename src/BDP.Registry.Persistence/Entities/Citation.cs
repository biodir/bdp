namespace BDP.Registry.Persistence.Entities;

public class Citation
{
    public Guid Id { get; set; }
    public Guid SourceVersionId { get; set; }
    public Guid CitationTypeId { get; set; }
    public Guid? JournalId { get; set; }
    public string Title { get; set; } = null!;
    public int? Year { get; set; }
    public string? DOI { get; set; }
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1056:Uri properties should not be strings", Justification = "EF Core cannot map System.Uri directly to database")]
    public string? Url { get; set; }

    public SourceVersion SourceVersion { get; set; } = null!;
    public CitationType CitationType { get; set; } = null!;
    public Journal? Journal { get; set; }
    public ICollection<CitationAuthor> Authors { get; } = new List<CitationAuthor>();
}
