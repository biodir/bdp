using System.ComponentModel;
using BDP.Application.Interfaces;
using Spectre.Console;
using Spectre.Console.Cli;

namespace BDP.CLI.Features.Search;

internal class SearchCommand : AsyncCommand<SearchCommand.Settings>
{
    private readonly ISourceRegistry _sourceRegistry;

    internal SearchCommand(ISourceRegistry sourceRegistry)
    {
        _sourceRegistry = sourceRegistry;
    }

    internal class Settings : CommandSettings
    {
        [Description("Search query")]
        [CommandArgument(0, "<query>")]
        public string Query { get; set; } = string.Empty;
    }

    public override async Task<int> ExecuteAsync(CommandContext context, Settings settings)
    {
        try
        {
            AnsiConsole.Status()
                .Start("Searching registry...", ctx =>
                {
                    ctx.Spinner(Spinner.Known.Dots);
                    ctx.SpinnerStyle(Style.Parse("yellow"));
                });

            var results = await _sourceRegistry.SearchSourcesAsync(settings.Query);

            if (results.Count == 0)
            {
                AnsiConsole.MarkupLine($"[yellow]![/] No sources found matching '{settings.Query}'");
                return 0;
            }

            AnsiConsole.MarkupLine($"\n[green]✓[/] Found {results.Count} source(s):\n");

            var table = new Table()
                .Border(TableBorder.Rounded)
                .AddColumn("Name")
                .AddColumn("Display Name")
                .AddColumn("Organism")
                .AddColumn("Type");

            foreach (var source in results)
            {
                table.AddRow(
                    $"[cyan]{source.Name}[/]",
                    source.DisplayName,
                    source.Organism ?? "-",
                    source.Type
                );
            }

            AnsiConsole.Write(table);
            AnsiConsole.WriteLine();
            AnsiConsole.MarkupLine("[grey]Run 'bdp add source <name>@<version>' to add a source[/]");

            return 0;
        }
        catch (Exception ex)
        {
            AnsiConsole.MarkupLine($"[red]✗[/] {ex.Message}");
            return 1;
        }
    }
}
