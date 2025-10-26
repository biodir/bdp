using System.ComponentModel;
using BDP.Application.Interfaces;
using Spectre.Console;
using Spectre.Console.Cli;

namespace BDP.CLI.Features.List;

internal class ListCommand : AsyncCommand<ListCommand.Settings>
{
    private readonly IConfigService _configService;

    internal ListCommand(IConfigService configService)
    {
        _configService = configService;
    }

    internal class Settings : CommandSettings
    {
        [Description("Show all available sources")]
        [CommandOption("-a|--all")]
        public bool ShowAll { get; set; }
    }

    public override async Task<int> ExecuteAsync(CommandContext context, Settings settings)
    {
        try
        {
            var currentDir = Directory.GetCurrentDirectory();
            var config = await _configService.LoadConfigAsync(currentDir);

            if (config == null)
            {
                AnsiConsole.MarkupLine("[red]✗[/] No bdp.yml found. Run 'bdp init' first.");
                return 1;
            }

            if (config.Sources.Count == 0)
            {
                AnsiConsole.MarkupLine("[yellow]![/] No sources added yet.");
                AnsiConsole.MarkupLine("[grey]  Run 'bdp add source <name>' to add sources[/]");
                return 0;
            }

            var table = new Table()
                .Border(TableBorder.Rounded)
                .AddColumn("Source")
                .AddColumn("Version")
                .AddColumn("Status");

            foreach (var (name, version) in config.Sources)
            {
                // NOTE: Check if actually installed

                var status = "[grey]Not installed[/]";
                table.AddRow(name, version, status);
            }

            AnsiConsole.WriteLine();
            AnsiConsole.Write(table);
            AnsiConsole.WriteLine();

            return 0;
        }
        catch (Exception ex)
        {
            AnsiConsole.MarkupLine($"[red]✗[/] {ex.Message}");
            return 1;
        }
    }
}
