using System.Globalization;
using BDP.Registry.API;
using BDP.Registry.API.Common.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Serilog;
using Serilog.Events;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console(formatProvider: CultureInfo.InvariantCulture)
    .CreateBootstrapLogger();

try
{
    Log.Information("Starting BDP Registry API");

    var builder = WebApplication.CreateBuilder(args);

    builder.ConfigureSerilog();
    builder.AddRegistryDatabase();
    builder.AddHealthCheck();

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddOpenAPI();
    builder.Services.AddProblemDetails();
    builder.Services.AddCORS();

    var app = builder.Build();

    await app.RunRegistryDatabaseMigrationsAsync();

    app.UseSerilogRequestLogging(options =>
    {
        options.MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000}ms";
        options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
        {
            diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
            diagnosticContext.Set("RequestScheme", httpContext.Request.Scheme);
            diagnosticContext.Set("UserAgent", httpContext.Request.Headers["User-Agent"].ToString());
        };
    });

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "BDP Registry API v1");
            options.RoutePrefix = string.Empty;
        });
    }

    app.UseExceptionHandler();

    // NOTE: HTTPS redirection - Comment out for Docker/HTTP-only deployment

    app.UseCors("AllowAll");
    app.MapHealthChecks("/health");

    var api = app.MapGroup("/api/v1");
    api.MapGet("/example", () =>
        {
            return Results.Ok(new { message = "Hello from BDP Registry API", timestamp = DateTime.UtcNow });
        })
        .WithName("GetExample")
        .WithOpenApi();

    Log.Information("BDP Registry API is starting on {Environment}", app.Environment.EnvironmentName);
    await app.RunAsync();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    await Log.CloseAndFlushAsync();
}
