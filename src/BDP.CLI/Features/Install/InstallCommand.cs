using System.ComponentModel;
using Spectre.Console;
using Spectre.Console.Cli;
using BDP.Application.Interfaces;

namespace BDP.CLI.Features.Install;

internal class InstallCommand : AsyncCommand<InstallCommand.Settings>
{
#pragma warning disable S4487 // Remove this unread private field '_configService' or refactor the code to use its value.
    private readonly IConfigService _configService;
#pragma warning restore S4487

    internal InstallCommand(IConfigService configService)
    {
        _configService = configService;
    }

    internal class Settings : CommandSettings
    {
        [Description("Force reinstall even if already installed")]
        [CommandOption("-f|--force")]
        public bool Force { get; set; }
    }

    public override async Task<int> ExecuteAsync(CommandContext context, Settings settings)
    {
        AnsiConsole.MarkupLine("[yellow]![/] Install command not yet implemented");
        AnsiConsole.MarkupLine("[grey]  This will install all sources from bdp.yml[/]");

        // NOTE: Implement installation logic

        await Task.CompletedTask;

        return 0;
    }
}
