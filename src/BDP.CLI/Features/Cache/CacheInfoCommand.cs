using System.Globalization;
using Spectre.Console;
using Spectre.Console.Cli;
using BDP.Domain.Common;

namespace BDP.CLI.Features.Cache;

internal class CacheInfoCommand : AsyncCommand
{
    public override async Task<int> ExecuteAsync(CommandContext context)
    {
        try
        {
            var currentDir = Directory.GetCurrentDirectory();
            var cacheDir = Path.Combine(currentDir, Constants.BdpDirectory, "cache");

            if (!Directory.Exists(cacheDir))
            {
                AnsiConsole.MarkupLine("[yellow]![/] Cache directory does not exist");
                AnsiConsole.MarkupLine($"[grey]  Expected at: {cacheDir}[/]");
                return 0;
            }

            var dirInfo = new DirectoryInfo(cacheDir);
            var files = dirInfo.GetFiles("*", SearchOption.AllDirectories);
            var totalSize = files.Sum(f => f.Length);

            var table = new Table()
                .Border(TableBorder.Rounded)
                .AddColumn("Property")
                .AddColumn("Value");

            table.AddRow("Cache Location", cacheDir);
            table.AddRow("Total Files", files.Length.ToString(CultureInfo.InvariantCulture));
            table.AddRow("Total Size", FormatBytes(totalSize));

            AnsiConsole.WriteLine();
            AnsiConsole.Write(table);
            AnsiConsole.WriteLine();

            await Task.CompletedTask;
            return 0;
        }
        catch (Exception ex)
        {
            AnsiConsole.MarkupLine($"[red]✗[/] {ex.Message}");
            return 1;
        }
    }

    private static string FormatBytes(long bytes)
    {
        string[] sizes = { "B", "KB", "MB", "GB", "TB" };
        double len = bytes;
        int order = 0;

        while (len >= 1024 && order < sizes.Length - 1)
        {
            order++;
            len /= 1024;
        }

        return $"{len:0.##} {sizes[order]}";
    }
}
