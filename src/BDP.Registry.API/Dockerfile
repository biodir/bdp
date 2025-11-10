FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY *.sln .
COPY src/BDP.Registry.Persistence/*.csproj src/BDP.Registry.Persistence/
COPY src/BDP.Registry.Persistence/ src/BDP.Registry.Persistence/

RUN dotnet restore src/BDP.Registry.Persistence/BDP.Registry.Persistence.csproj

RUN dotnet tool install --global dotnet-ef --version 9.* \
    && export PATH="$PATH:/root/.dotnet/tools" \
    && dotnet ef migrations bundle \
         --project src/BDP.Registry.Persistence/BDP.Registry.Persistence.csproj \
         --self-contained \
         --target-runtime linux-x64 \
         --output /app/efbundle \
         --force

FROM mcr.microsoft.com/dotnet/runtime-deps:9.0 AS final
WORKDIR /app

COPY --from=build /app/efbundle .

RUN chmod +x /app/efbundle

ENTRYPOINT ["/app/efbundle"]
