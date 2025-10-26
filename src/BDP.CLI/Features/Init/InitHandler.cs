using BDP.Application.Interfaces;
using BDP.Domain.Common;
using BDP.Domain.Models;
using Spectre.Console;

namespace BDP.CLI.Features.Init;

internal class InitHandler
{
    private readonly IConfigService _configService;

    internal InitHandler(IConfigService configService)
    {
        _configService = configService;
    }

    public async Task<Result> HandleAsync(InitCommand.Settings settings)
    {
        try
        {
            var currentDir = Directory.GetCurrentDirectory();

            if (await _configService.ExistsAsync(currentDir))
                return Result.Failure("BDP project already initialized in this directory");

            var projectName = settings.Name ?? Path.GetFileName(currentDir);

            var config = new ConfigFile
            {
                Name = projectName,
                Version = "1.0.0",
                Sources = new Dictionary<string, string>()
            };

            await _configService.SaveConfigAsync(config, currentDir);

            var bdpDir = Path.Combine(currentDir, Constants.BdpDirectory);
            Directory.CreateDirectory(bdpDir);
            Directory.CreateDirectory(Path.Combine(bdpDir, "cache"));

            await CreateOrUpdateGitignoreAsync(currentDir);

            DisplaySummary(projectName);

            return Result.Success();
        }
        catch (Exception ex)
        {
            return Result.Failure($"Failed to initialize: {ex.Message}");
        }
    }

    private static async Task CreateOrUpdateGitignoreAsync(string directory)
    {
        var gitignorePath = Path.Combine(directory, ".gitignore");
        var gitignoreContent = @"# BDP
.bdp/cache/
.bdp/config
bdp.lock
";

        if (File.Exists(gitignorePath))
        {
            var existing = await File.ReadAllTextAsync(gitignorePath);
            if (!existing.Contains(".bdp/", StringComparison.Ordinal))
            {
                await File.AppendAllTextAsync(gitignorePath, "\n" + gitignoreContent);
                AnsiConsole.MarkupLine("[yellow]![/] Updated existing .gitignore");
            }
        }
        else
        {
            await File.WriteAllTextAsync(gitignorePath, gitignoreContent);
            AnsiConsole.MarkupLine("[green]✓[/] Created .gitignore");
        }
    }

    private static void DisplaySummary(string projectName)
    {
        AnsiConsole.WriteLine();
        var table = new Table()
            .Border(TableBorder.Rounded)
            .AddColumn("Setting")
            .AddColumn("Value");

        table.AddRow("Project", projectName);
        table.AddRow("Config", Constants.ConfigFileName);
        table.AddRow("Cache", Path.Combine(Constants.BdpDirectory, "cache"));

        AnsiConsole.Write(table);
        AnsiConsole.WriteLine();
        AnsiConsole.MarkupLine("[grey]Next steps:[/]");
        AnsiConsole.MarkupLine("  • [cyan]bdp add source <source>@<version>[/] - Add a data source");
        AnsiConsole.MarkupLine("  • [cyan]bdp install[/] - Install all sources");
        AnsiConsole.MarkupLine("  • [cyan]bdp search <query>[/] - Search for available sources");
    }
}
