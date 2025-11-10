using Npgsql;
using Serilog;

namespace BDP.Registry.Jobs.Utils;

internal static class DbUtils
{
    internal static async Task EnsureDatabaseExistsAsync(string connectionString, bool isDevelopment)
    {
        try
        {
            var builder = new NpgsqlConnectionStringBuilder(connectionString);
            var databaseName = builder.Database;

            if (string.IsNullOrWhiteSpace(databaseName))
            {
                throw new ArgumentException("Database name cannot be null or empty", nameof(connectionString));
            }

            // Create connection to 'postgres' database to check if target database exists
            builder.Database = "postgres";
            var masterConnectionString = builder.ToString();

            await using var masterConnection = new NpgsqlConnection(masterConnectionString);
            await masterConnection.OpenAsync();

            // Check if database exists
            await using var checkCommand = new NpgsqlCommand(
                "SELECT 1 FROM pg_database WHERE datname = @databaseName",
                masterConnection);
            checkCommand.Parameters.AddWithValue("@databaseName", databaseName);

            var exists = await checkCommand.ExecuteScalarAsync();

            if (exists == null)
            {
                // Database doesn't exist, create it
                // Use quoted identifier to safely handle database names
#pragma warning disable CA2100
                await using var createCommand = new NpgsqlCommand(
                    "CREATE DATABASE " + QuoteIdentifier(databaseName) + " ENCODING 'UTF8'",
                    masterConnection);
#pragma warning restore CA2100

                await createCommand.ExecuteNonQueryAsync();

                if (isDevelopment)
                {
                    Log.Information("Created database '{DatabaseName}'", databaseName);
                }
            }
            else if (isDevelopment)
            {
                Log.Information("Database '{DatabaseName}' already exists", databaseName);
            }
        }
        catch (Exception ex)
        {
            var sanitizedConnectionString = SanitizeConnectionStringForLogging(connectionString);
            Log.Error(ex, "Failed to ensure database exists for connection string: {ConnectionString}",
                sanitizedConnectionString);
            throw;
        }
    }

    internal static string GetPasswordFromConnectionString(string connectionString)
    {
        try
        {
            var builder = new NpgsqlConnectionStringBuilder(connectionString);
            return builder.Password ?? string.Empty;
        }
        catch
        {
            return string.Empty;
        }
    }

    private static string SanitizeConnectionStringForLogging(string connectionString)
    {
        var password = GetPasswordFromConnectionString(connectionString);
        return string.IsNullOrEmpty(password)
            ? connectionString
            : connectionString.Replace(password, "***", StringComparison.Ordinal);
    }

    private static string QuoteIdentifier(string identifier)
    {
        // Escape any double quotes in the identifier and wrap in double quotes
        return "\"" + identifier.Replace("\"", "\"\"", StringComparison.Ordinal) + "\"";
    }
}
