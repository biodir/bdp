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
- Configures GitHub environment secrets and variables
- Automatically generates connection strings

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
- `{env}-bdp-registry-migrations`
- `{env}-bdp-registry-postgres`

**GitHub Repository Secrets:**
- `FLY_API_TOKEN`

**GitHub Environment Secrets:**
- `FLY_API_APP_NAME`
- `FLY_JOBS_APP_NAME`
- `FLY_WEB_APP_NAME`
- `FLY_MIGRATIONS_APP_NAME`
- `REGISTRY_DB_CONNECTION_STRING`
- `HANGFIRE_DB_CONNECTION_STRING`

**GitHub Variables:**
- `{ENV}_API_URL` (e.g., `DEV_API_URL`)

## Commands
```bash
flyctl deploy --config infrastructure/fly/api.toml --app dev-bdp-registry-api
flyctl logs -a dev-bdp-registry-api
flyctl status -a dev-bdp-registry-api
flyctl ssh console -a dev-bdp-registry-api
flyctl secrets set KEY=val -a dev-bdp-registry-api
flyctl postgres connect -a dev-bdp-registry-postgres
```
