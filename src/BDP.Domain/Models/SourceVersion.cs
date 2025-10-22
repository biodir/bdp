using System.Collections.ObjectModel;

namespace BDP.Domain.Models;

public class SourceVersion
{
    public int Id { get; set; }
    public int SourceId { get; set; }
    public string Version { get; set; } = string.Empty;
    public DateTime ReleaseDate { get; set; }
    public string Description { get; set; } = string.Empty;
    public Collection<SourceFile> Files { get; init; } = new();
    public Dictionary<string, Collection<string>> Compatible { get; init; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
