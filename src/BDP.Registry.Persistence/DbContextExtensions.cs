using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BDP.Registry.Persistence;

public static class DbContextExtensions
{
    public static IServiceCollection AddRegistryPersistence(
        this IServiceCollection services,
        string connectionString,
        bool isDevelopment)
    {
        services.AddDbContext<RegistryDbContext>(options =>
            options.UseNpgsql(connectionString, npgsqlOptions =>
            {
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 3,
                    maxRetryDelay: TimeSpan.FromSeconds(5),
                    errorCodesToAdd: null);

                npgsqlOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
            })
            .UseSnakeCaseNamingConvention()
            .EnableSensitiveDataLogging(isDevelopment)
            .EnableDetailedErrors(isDevelopment));

        return services;
    }
}
