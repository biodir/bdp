using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace BDP.Registry.API;

[SuppressMessage("CodeQuality", "CA1812:Avoid uninstantiated internal classes",
    Justification = "Instantiated by dependency injection")]
[SuppressMessage("Design", "CA1515:Consider making public types internal",
    Justification = "DbContext must be public for dependency injection")]
public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

}
