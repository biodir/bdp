FROM mcr.microsoft.com/dotnet/runtime:9.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/BDP.Registry.Jobs/BDP.Registry.Jobs.csproj", "src/BDP.Registry.Jobs/"]
RUN dotnet restore "src/BDP.Registry.Jobs/BDP.Registry.Jobs.csproj"
COPY . .
WORKDIR "/src/src/BDP.Registry.Jobs"
RUN dotnet build "./BDP.Registry.Jobs.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./BDP.Registry.Jobs.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BDP.Registry.Jobs.dll"]
