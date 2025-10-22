using Spectre.Console;
using Spectre.Console.Cli;

namespace BDP.CLI.Features.Cache;

internal class CacheVerifyCommand : AsyncCommand
{
    public override async Task<int> ExecuteAsync(CommandContext context)
    {
        AnsiConsole.MarkupLine("[yellow]![/] Cache verify command not yet implemented");
        AnsiConsole.MarkupLine("[grey]  This will verify checksums of cached sources[/]");

        await Task.CompletedTask;
        return 0;
    }
}
