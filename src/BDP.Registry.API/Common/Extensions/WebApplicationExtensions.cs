using Microsoft.EntityFrameworkCore;
using Serilog;

namespace BDP.Registry.API.Common.Extensions;

internal static class WebApplicationExtensions
{
    internal static async Task<WebApplication> RunRegistryDatabaseMigrationsAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        try
        {
            await dbContext.Database.MigrateAsync();
            Log.Information("Database migrations applied successfully");
        }
        catch (Exception ex)
        {
            Log.Error(ex, "An error occurred while migrating the database");
        }

        return app;
    }
}
