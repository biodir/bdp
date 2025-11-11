using BDP.Registry.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

Console.WriteLine("Running EF migrations...");

try
{
    var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__RegistryDatabase")
                           ?? "Host=postgres;Database=bdp;Username=bdp;Password=bdp-pwd";

    var optionsBuilder = new DbContextOptionsBuilder<RegistryDbContext>()
        .UseNpgsql(connectionString, npgsql =>
            npgsql.MigrationsAssembly(typeof(RegistryDbContext).Assembly.FullName))
        .UseSnakeCaseNamingConvention()
        .LogTo(Console.WriteLine, LogLevel.Information);

    await using var context = new RegistryDbContext(optionsBuilder.Options);

    var pendingMigrations = await context.Database.GetPendingMigrationsAsync();

    if (!pendingMigrations.Any())
    {
        Console.WriteLine("No pending migrations. Database is up-to-date.");
    }
    else
    {
        Console.WriteLine("Applying migrations...");
        await context.Database.MigrateAsync();
        Console.WriteLine("Migrations applied successfully.");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Error applying migrations: {ex}");
    Environment.Exit(1);
}
