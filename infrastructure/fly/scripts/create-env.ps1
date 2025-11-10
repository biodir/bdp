param(
    [Parameter(Mandatory = $true)]
    [string]$Repo,
    [Parameter(Mandatory = $true)]
    [string]$Env,
    [Parameter(Mandatory = $true)]
    [string]$Org,
    [string]$Region = "ams"
)

$ErrorActionPreference = "Continue"

Write-Host "Creating $Env environment in org $Org" -ForegroundColor Cyan
Write-Host "Creating Fly.io resources..." -ForegroundColor Yellow

$appsList = flyctl apps list -o $Org 2>$null | Out-String

function Ensure-App {
    param([string]$AppName)
    if ($appsList -match [regex]::Escape($AppName)) {
        Write-Host "  [SKIP] $AppName already exists" -ForegroundColor DarkGray
    } else {
        flyctl apps create $AppName -o $Org 2>$null
        Write-Host "  [OK] $AppName created" -ForegroundColor Green
    }
}

Ensure-App "$Env-bdp-registry-api"
Ensure-App "$Env-bdp-registry-jobs"
Ensure-App "$Env-bdp-registry-web"
Ensure-App "$Env-bdp-registry-migrations"

$dbName = "$Env-bdp-registry-postgres"
$pgList = flyctl postgres list -o $Org 2>$null | Out-String
$PgConn = ""

if ($pgList -match [regex]::Escape($dbName)) {
    Write-Host "  [SKIP] Database already exists" -ForegroundColor DarkGray
    $PgConn = Read-Host "  Paste full DATABASE_URL for $dbName"
    if ([string]::IsNullOrEmpty($PgConn)) { exit 1 }
} else {
    $pgCreateOutput = flyctl postgres create `
        --name $dbName `
        --org $Org `
        --region $Region `
        --initial-cluster-size 1 `
        --vm-size shared-cpu-1x `
        --volume-size 1 2>&1 | Out-String

    Write-Host $pgCreateOutput
    $PgConn = Read-Host "  Paste the connection string here"
    if ([string]::IsNullOrEmpty($PgConn)) { exit 1 }
}

flyctl postgres attach $dbName --app "$Env-bdp-registry-api" 2>$null
flyctl postgres attach $dbName --app "$Env-bdp-registry-jobs" 2>$null
flyctl secrets unset DATABASE_URL --app "$Env-bdp-registry-api" 2>$null
flyctl secrets unset DATABASE_URL --app "$Env-bdp-registry-jobs" 2>$null

Write-Host "[OK] Fly.io resources ready" -ForegroundColor Green

try {
    gh api repos/$Repo/environments/$Env --method PUT 2>$null | Out-Null
} catch { }

# Convert PostgreSQL URI to Npgsql format
if ($PgConn -match "postgres://([^:]+):([^@]+)@([^/:]+):(\d+)/?([^?]*)?(\?.*)?") {
    $username = $matches[1]
    $password = $matches[2]
    $hostname = $matches[3]
    $port = $matches[4]
    $database = $matches[5]
    if ([string]::IsNullOrEmpty($database)) { $database = $username }
    $NpgsqlConn = "Host=${hostname};Port=${port};Database=${database};Username=${username};Password=${password};SSL Mode=Disable"
} else {
    $NpgsqlConn = $PgConn
}

gh secret set FLY_API_APP_NAME --repo $Repo --env $Env --body "$Env-bdp-registry-api" 2>$null
gh secret set FLY_JOBS_APP_NAME --repo $Repo --env $Env --body "$Env-bdp-registry-jobs" 2>$null
gh secret set FLY_WEB_APP_NAME --repo $Repo --env $Env --body "$Env-bdp-registry-web" 2>$null
gh secret set FLY_MIGRATIONS_APP_NAME --repo $Repo --env $Env --body "$Env-bdp-registry-migrations" 2>$null
gh secret set FLY_POSTGRES_APP_NAME --repo $Repo --env $Env --body "$dbName" 2>$null
gh secret set REGISTRY_DB_CONNECTION_STRING --repo $Repo --env $Env --body $NpgsqlConn 2>$null
gh secret set HANGFIRE_DB_CONNECTION_STRING --repo $Repo --env $Env --body $NpgsqlConn 2>$null

$apiUrl = "https://$Env-bdp-registry-api.fly.dev"
gh variable set API_URL --repo $Repo --env $Env --body $apiUrl 2>$null
gh variable set FLY_ORG --repo $Repo --env $Env --body $Org 2>$null

Write-Host "[OK] Environment '$Env' ready" -ForegroundColor Green
Write-Host "API URL: $apiUrl"
Write-Host "Connection String (Npgsql Format): $NpgsqlConn"
