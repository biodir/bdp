# Fly.io Infrastructure

## Requirements

- [GH CLI](https://cli.github.com/)
- [Fly.io CLI](https://fly.io/docs/flyctl/)

## Scripts

Located in `infrastructure/fly/scripts/`

**setup-repo** - Run once per repository
- Sets `FLY_API_TOKEN` in GitHub repository secrets

**create-env** - Create complete environment (Fly.io + GitHub)
- Creates Fly.io apps and database
- Attaches Postgres to apps for networking and monitoring benefits
- Removes auto-generated DATABASE_URL secrets to avoid conflicts
- Configures GitHub environment secrets and variables
- Uses main Postgres connection string for both registry and hangfire databases

**delete-env** - Delete complete environment (Fly.io + GitHub)
- Removes all Fly.io resources
- Removes all GitHub environment secrets and variables
- Requires confirmation

## Setup

### Step 1: Repository Setup (once)

```powershell
cd infrastructure/fly/scripts
.\setup-repo.ps1 -Repo biodir/bdp
```

### Step 2: Create Environments

```powershell
.\create-env.ps1 -Repo biodir/bdp -Org biodir -Env dev
.\create-env.ps1 -Repo biodir/bdp -Org biodir -Env staging
.\create-env.ps1 -Repo biodir/bdp -Org biodir -Env prod
```

## Deletion

```powershell
.\delete-env.ps1 -Repo biodir/bdp -Env dev
```

## Resources Created

**Fly.io (per environment):**
- `{env}-bdp-registry-api`
- `{env}-bdp-registry-jobs`
- `{env}-bdp-registry-web`
- `{env}-bdp-registry-postgres`

**GitHub Repository Secrets:**
- `FLY_API_TOKEN`

**GitHub Environment Secrets:**
- `FLY_API_APP_NAME`
- `FLY_JOBS_APP_NAME`
- `FLY_WEB_APP_NAME`
- `REGISTRY_DB_CONNECTION_STRING`
- `HANGFIRE_DB_CONNECTION_STRING`

**GitHub Variables:**
- `API_URL`

## Deployment

Migrations are handled automatically by the CI/CD pipeline using EF Core migration bundles. No separate Fly.io app is needed for migrations.

The pipeline:
1. Builds EF migration bundle during deployment
2. Runs migrations directly against the database
3. Deploys applications with connection strings from GitHub environment secrets

## Commands
```bash
flyctl deploy --config infrastructure/fly/api.toml --app dev-bdp-registry-api
flyctl logs -a dev-bdp-registry-api
flyctl status -a dev-bdp-registry-api
flyctl ssh console -a dev-bdp-registry-api
flyctl secrets set KEY=val -a dev-bdp-registry-api
flyctl postgres connect -a dev-bdp-registry-postgres
```

## Notes

- Apps are attached to Postgres for networking benefits and monitoring integration
- Fly.io automatically creates `DATABASE_URL` secrets when attaching, but these are immediately removed to avoid conflicts
- The pipeline uses the custom connection strings from GitHub environment secrets instead
- GitHub environment protection rules may cause warnings during environment creation, but secrets and variables will still be configured correctly
- Both `REGISTRY_DB_CONNECTION_STRING` and `HANGFIRE_DB_CONNECTION_STRING` use the same Postgres connection string, with Hangfire using a separate schema
