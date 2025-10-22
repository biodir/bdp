using System.ComponentModel;
using Spectre.Console;
using Spectre.Console.Cli;

namespace BDP.CLI.Features.Cache;

internal class CacheSetCommand : AsyncCommand<CacheSetCommand.Settings>
{
    internal class Settings : CommandSettings
    {
        [Description("Cache directory path")]
        [CommandArgument(0, "<path>")]
        public string Path { get; set; } = string.Empty;
    }

    public override async Task<int> ExecuteAsync(CommandContext context, Settings settings)
    {
        AnsiConsole.MarkupLine("[yellow]![/] Cache set command not yet implemented");
        AnsiConsole.MarkupLine($"[grey]  Will set cache to: {settings.Path}[/]");

        await Task.CompletedTask;
        return 0;
    }
}
