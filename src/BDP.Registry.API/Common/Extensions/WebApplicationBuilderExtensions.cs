using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace BDP.Registry.API.Common.Extensions;

internal static class WebApplicationBuilderExtensions
{
    internal static WebApplicationBuilder AddHealthCheck(this WebApplicationBuilder builder, string connectionString)
    {
        builder.Services.AddHealthChecks()
            .AddNpgSql(
                connectionString,
                name: "postgres",
                failureStatus: HealthStatus.Unhealthy,
                tags: ["db", "postgresql", "ready"]);

        return builder;
    }

    internal static WebApplicationBuilder ConfigureSerilog(this WebApplicationBuilder builder)
    {
        builder.Host.UseSerilog((context, services, configuration) => configuration
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services));

        return builder;
    }

    internal static WebApplicationBuilder AddCORS(this WebApplicationBuilder builder)
    {
        var allowedOriginsString = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string>();

        if (string.IsNullOrWhiteSpace(allowedOriginsString))
        {
            throw new InvalidOperationException(
                "CORS configuration is missing. Add 'Cors:AllowedOrigins' to appsettings.json");
        }

        var allowedOrigins = allowedOriginsString
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("DefaultPolicy", policy =>
            {
                policy.WithOrigins(allowedOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        });

        return builder;
    }
}
