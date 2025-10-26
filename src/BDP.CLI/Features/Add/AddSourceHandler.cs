using BDP.Application.Interfaces;
using BDP.Domain.Common;
using Spectre.Console;

namespace BDP.CLI.Features.Add;

internal class AddSourceHandler
{
    private readonly IConfigService _configService;
    private readonly ISourceService _sourceService;

    internal AddSourceHandler(IConfigService configService, ISourceService sourceService)
    {
        _configService = configService;
        _sourceService = sourceService;
    }

    public async Task<Result> HandleAsync(AddSourceCommand.Settings settings)
    {
        try
        {
            var currentDir = Directory.GetCurrentDirectory();

            var config = await _configService.LoadConfigAsync(currentDir);
            if (config == null)
                return Result.Failure("No bdp.yml found. Run 'bdp init' first.");

            var (sourceName, version) = ParseSource(settings.Source);

            await AnsiConsole.Status()
                .StartAsync("Validating source...", async ctx =>
                {
                    ctx.Spinner(Spinner.Known.Dots);
                    ctx.SpinnerStyle(Style.Parse("yellow"));

                    var sourceVersion = await _sourceService.GetSourceVersionAsync(sourceName, version);
                    if (sourceVersion == null)
                    {
                        throw new InvalidOperationException(
                            $"Source '{sourceName}' version '{version}' not found in registry. " +
                            $"Run 'bdp search {sourceName}' to see available versions.");
                    }
                });

            if (config.Sources.TryGetValue(sourceName, out string? value))
            {
                var shouldUpdate = await AnsiConsole.ConfirmAsync(
                    $"Source '{sourceName}' already exists with version '{value}'. Update to '{version}'?",
                    true);

                if (!shouldUpdate)
                    return Result.Success();

                AnsiConsole.MarkupLine($"[yellow]![/] Updating {sourceName} from {value} to {version}");
            }

            config.Sources[sourceName] = version;
            await _configService.SaveConfigAsync(config, currentDir);

            AnsiConsole.MarkupLine($"[green]✓[/] Added [cyan]{sourceName}@{version}[/] to bdp.yml");

            if (!settings.NoInstall)
            {
                AnsiConsole.WriteLine();
                AnsiConsole.MarkupLine("[yellow]![/] Installation not yet implemented");
                AnsiConsole.MarkupLine("[grey]  The source has been added to bdp.yml[/]");
                AnsiConsole.MarkupLine("[grey]  Run 'bdp install' when ready[/]");
            }

            return Result.Success();
        }
        catch (InvalidOperationException ex)
        {
            return Result.Failure(ex.Message);
        }
        catch (Exception ex)
        {
            return Result.Failure($"Failed to add source: {ex.Message}");
        }
    }

    private static (string name, string version) ParseSource(string source)
    {
        var parts = source.Split('@', 2);
        var name = parts[0].Trim();

        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Source name cannot be empty");
        }

        if (parts.Length < 2 || string.IsNullOrWhiteSpace(parts[1]))
        {
            throw new ArgumentException(
                $"Version is required. Use format: {name}@<version> (e.g., {name}@v44 or {name}@p14)");
        }

        var version = parts[1].Trim();

        if (version.Equals("latest", StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException(
                "'latest' is not allowed. Please specify an explicit version for reproducibility.");
        }

        return (name, version);
    }
}
