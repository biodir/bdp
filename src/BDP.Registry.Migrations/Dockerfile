FROM mcr.microsoft.com/dotnet/runtime:9.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/BDP.Registry.Migrations/BDP.Registry.Migrations.csproj", "src/BDP.Registry.Migrations/"]
COPY ["src/BDP.Registry.Persistence/BDP.Registry.Persistence.csproj", "src/BDP.Registry.Persistence/"]
RUN dotnet restore "src/BDP.Registry.Migrations/BDP.Registry.Migrations.csproj"
COPY . .
WORKDIR "/src/src/BDP.Registry.Migrations"
RUN dotnet build "./BDP.Registry.Migrations.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./BDP.Registry.Migrations.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BDP.Registry.Migrations.dll"]
