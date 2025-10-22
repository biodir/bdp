using System.ComponentModel;
using Spectre.Console;
using Spectre.Console.Cli;

namespace BDP.CLI.Features.Cache;

internal class CacheCleanCommand : AsyncCommand<CacheCleanCommand.Settings>
{
    internal class Settings : CommandSettings
    {
        [Description("Show what would be deleted without actually deleting")]
        [CommandOption("--dry-run")]
        public bool DryRun { get; set; }
    }

    public override async Task<int> ExecuteAsync(CommandContext context, Settings settings)
    {
        AnsiConsole.MarkupLine("[yellow]![/] Cache clean command not yet implemented");

        if (settings.DryRun)
        {
            AnsiConsole.MarkupLine("[grey]  Running in dry-run mode[/]");
        }

        await Task.CompletedTask;
        return 0;
    }
}
