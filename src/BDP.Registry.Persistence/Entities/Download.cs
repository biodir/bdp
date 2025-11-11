namespace BDP.Registry.Persistence.Entities;

public class Download
{
    public Guid Id { get; set; }
    public Guid SourceVersionId { get; set; }
    public string Protocol { get; set; } = null!;
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1056:Uri properties should not be strings", Justification = "EF Core cannot map System.Uri directly to database")]
    public string Url { get; set; } = null!;
    public string? Format { get; set; }
    public string? Notes { get; set; }

    public SourceVersion SourceVersion { get; set; } = null!;
}
