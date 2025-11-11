FROM mcr.microsoft.com/dotnet/runtime:9.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY src/BDP.Registry.Migrations/BDP.Registry.Migrations.csproj ./BDP.Registry.Migrations/
COPY src/BDP.Registry.Persistence/BDP.Registry.Persistence.csproj ./BDP.Registry.Persistence/

RUN dotnet restore ./BDP.Registry.Migrations/BDP.Registry.Migrations.csproj

COPY src/ ./

WORKDIR /src/BDP.Registry.Migrations
RUN dotnet build BDP.Registry.Migrations.csproj -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish BDP.Registry.Migrations.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/runtime:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BDP.Registry.Migrations.dll"]
