using System.ComponentModel;
using Spectre.Console;
using Spectre.Console.Cli;
using BDP.Application.Interfaces;

namespace BDP.CLI.Features.Add;

internal class AddSourceCommand : AsyncCommand<AddSourceCommand.Settings>
{
    private readonly AddSourceHandler _handler;

    internal AddSourceCommand(IConfigService configService, ISourceService sourceService)
    {
        _handler = new AddSourceHandler(configService, sourceService);
    }

    internal class Settings : CommandSettings
    {
        [Description("Source name with version (e.g., hg38@p14 or gencode@v44)")]
        [CommandArgument(0, "<source>")]
        public string Source { get; set; } = string.Empty;

        [Description("Skip installation, only add to bdp.yml")]
        [CommandOption("--no-install")]
        public bool NoInstall { get; set; }
    }

    public override async Task<int> ExecuteAsync(CommandContext context, Settings settings)
    {
        var result = await _handler.HandleAsync(settings);

        if (result.IsSuccess)
        {
            AnsiConsole.MarkupLine("[green]✓[/] Source added successfully!");
            return 0;
        }

        AnsiConsole.MarkupLine($"[red]✗[/] {result.Error}");
        return 1;
    }
}
