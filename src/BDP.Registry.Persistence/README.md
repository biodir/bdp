# BDP.Registry.Persistence

Database persistence layer using EF Core with PostgreSQL and snake_case naming conventions.

## Essential Commands
```bash
# Create new migration
dotnet ef migrations add MigrationName --project src/BDP.Registry.Persistence

# Apply migrations locally
dotnet ef database update --project src/BDP.Registry.Persistence

# Generate migration bundle
dotnet ef migrations bundle --project src/BDP.Registry.Persistence --self-contained --runtime linux-x64 -o efbundle

# Run with Docker Compose
docker compose up --build

# Reset database
docker compose down -v && docker compose up postgres -d && dotnet ef database update --project src/BDP.Registry.Persistence
```

## Database Conventions

- **Tables**: `registry_items` (snake_case)
- **Columns**: `created_at`, `is_active` (snake_case)
- **C# Entities**: `RegistryItem`, `CreatedAt` (PascalCase)
