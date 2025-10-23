namespace BDP.Registry.API.Common.Extensions;

internal static class ServiceCollectionExtensions
{
    internal static IServiceCollection AddOpenAPI(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new()
            {
                Title = "BDP Registry API",
                Version = "v1",
                Description = "BDP Registry API"
            });
        });

        return services;
    }

    internal static IServiceCollection AddCORS(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        return services;
    }
}
