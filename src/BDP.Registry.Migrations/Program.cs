// Since I was unable to make docker-compose and Dockerfile work properly with EF bundle
// or just running dotnet ef update options - I gave in and generated this CLI tool to run migrations
// NOTE: In best interest to get rid of it and use proper solution like EF Bundle

using BDP.Registry.Persistence;
using Microsoft.EntityFrameworkCore;

Console.WriteLine("Running EF migrations...");

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__RegistryDatabase")
                       ?? "Host=postgres;Database=bdp;Username=bdp;Password=bdp-pwd";

var optionsBuilder = new DbContextOptionsBuilder<RegistryDbContext>();
optionsBuilder.UseNpgsql(connectionString)
    .UseSnakeCaseNamingConvention();

await using var context = new RegistryDbContext(optionsBuilder.Options);
await context.Database.MigrateAsync();

Console.WriteLine("Migrations applied successfully.");
