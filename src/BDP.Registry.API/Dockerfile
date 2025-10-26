FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/BDP.Registry.API/BDP.Registry.API.csproj", "src/BDP.Registry.API/"]
COPY ["src/BDP.Domain/BDP.Domain.csproj", "src/BDP.Domain/"]
COPY ["src/BDP.Application/BDP.Application.csproj", "src/BDP.Application/"]
COPY ["src/BDP.Infrastructure/BDP.Infrastructure.csproj", "src/BDP.Infrastructure/"]
RUN dotnet restore "src/BDP.Registry.API/BDP.Registry.API.csproj"
COPY . .
WORKDIR "/src/src/BDP.Registry.API"
RUN dotnet build "./BDP.Registry.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./BDP.Registry.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BDP.Registry.API.dll"]
