using BDP.Application.Interfaces;
using BDP.Application.Services;
using BDP.CLI.DependencyInjection;
using BDP.CLI.Features.Add;
using BDP.CLI.Features.Cache;
using BDP.CLI.Features.Init;
using BDP.CLI.Features.Install;
using BDP.CLI.Features.List;
using BDP.CLI.Features.Search;
using BDP.Infrastructure.Registry;
using Microsoft.Extensions.DependencyInjection;
using Spectre.Console;
using Spectre.Console.Cli;

var services = new ServiceCollection();

services.AddHttpClient<ISourceRegistry, HttpSourceRegistry>();

services.AddSingleton<IConfigService, ConfigService>();
services.AddSingleton<ISourceService, SourceService>();

var registrar = new TypeRegistrar(services);
var app = new CommandApp(registrar);

app.Configure(config =>
{
    config.SetApplicationName("bdp");
    config.SetApplicationVersion("0.1.0");

    config.AddCommand<InitCommand>("init")
        .WithDescription("Initialize a new BDP project")
        .WithExample("init")
        .WithExample("init", "-n", "MyProject");

    config.AddBranch("add", add =>
    {
        add.SetDescription("Add resources to the project");

        add.AddCommand<AddSourceCommand>("source")
            .WithDescription("Add a data source to bdp.yml")
            .WithExample("add", "source", "hg38@p14")
            .WithExample("add", "source", "gencode@v44")
            .WithExample("add", "source", "mm10@p6", "--no-install");
    });

    config.AddCommand<InstallCommand>("install")
        .WithDescription("Install all sources from bdp.yml")
        .WithExample("install")
        .WithExample("install", "--force");

    config.AddCommand<ListCommand>("list")
        .WithDescription("List installed sources")
        .WithExample("list")
        .WithExample("list", "--all");

    config.AddCommand<SearchCommand>("search")
        .WithDescription("Search for available sources in the registry")
        .WithExample("search", "human")
        .WithExample("search", "hg38");

    config.AddBranch("cache", cache =>
    {
        cache.SetDescription("Manage BDP cache");

        cache.AddCommand<CacheInfoCommand>("info")
            .WithDescription("Show cache information and statistics")
            .WithExample("cache", "info");

        cache.AddCommand<CacheSetCommand>("set")
            .WithDescription("Set cache location")
            .WithExample("cache", "set", "/mnt/shared-data/bdp-cache");

        cache.AddCommand<CacheCleanCommand>("clean")
            .WithDescription("Clean unused sources from cache")
            .WithExample("cache", "clean")
            .WithExample("cache", "clean", "--dry-run");

        cache.AddCommand<CacheVerifyCommand>("verify")
            .WithDescription("Verify cache integrity")
            .WithExample("cache", "verify");
    });

    config.ValidateExamples();
});

try
{
    return await app.RunAsync(args);
}
catch (Exception ex)
{
    AnsiConsole.MarkupLine($"[red]Error:[/] {ex.Message}");

    if (args.Contains("--verbose") || args.Contains("-v"))
    {
        AnsiConsole.WriteException(ex);
    }

    return 1;
}
