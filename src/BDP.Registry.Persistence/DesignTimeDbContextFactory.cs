using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace BDP.Registry.Persistence;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<RegistryDbContext>
{
    public RegistryDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<RegistryDbContext>();

        var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__RegistryDatabase")
            ?? "Host=localhost;Database=bdp_registry;Username=postgres;Password=postgres";

        optionsBuilder.UseNpgsql(connectionString)
            .UseSnakeCaseNamingConvention();

        return new RegistryDbContext(optionsBuilder.Options);
    }
}
