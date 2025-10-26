using System.ComponentModel;
using BDP.Application.Interfaces;
using Spectre.Console;
using Spectre.Console.Cli;

namespace BDP.CLI.Features.Init;

internal class InitCommand : AsyncCommand<InitCommand.Settings>
{
    private readonly InitHandler _handler;

    public InitCommand(IConfigService configService)
    {
        _handler = new InitHandler(configService);
    }

    internal class Settings : CommandSettings
    {
        [Description("Project name")]
        [CommandOption("-n|--name")]
        public string? Name { get; set; }
    }

    public override async Task<int> ExecuteAsync(CommandContext context, Settings settings)
    {
        var result = await _handler.HandleAsync(settings);

        if (result.IsSuccess)
        {
            AnsiConsole.MarkupLine("[green]✓[/] BDP project initialized successfully!");
            return 0;
        }

        AnsiConsole.MarkupLine($"[red]✗[/] {result.Error}");
        return 1;
    }
}
