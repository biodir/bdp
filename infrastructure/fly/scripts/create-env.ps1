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

$dbName = "$Env-bdp-registry-postgres"
$pgList = flyctl postgres list -o $Org 2>$null | Out-String
$PgConn = ""

if ($pgList -match [regex]::Escape($dbName)) {
    Write-Host "  [SKIP] Database already exists" -ForegroundColor DarkGray
    Write-Host "  You must already have the connection string for this database." -ForegroundColor DarkGray
    $PgConn = Read-Host "  Paste full DATABASE_URL for $dbName (or press Enter to abort)"
    if ([string]::IsNullOrEmpty($PgConn)) {
        Write-Host "  [ERROR] No connection string provided. Cannot continue." -ForegroundColor Red
        exit 1
    }
    Write-Host "  [OK] Using user-provided connection string" -ForegroundColor Green
} else {
    Write-Host "  Creating Postgres cluster..." -ForegroundColor Yellow
    $pgCreateOutput = flyctl postgres create `
        --name $dbName `
        --org $Org `
        --region $Region `
        --initial-cluster-size 1 `
        --vm-size shared-cpu-1x `
        --volume-size 1 2>&1 | Out-String

    Write-Host $pgCreateOutput
    Write-Host ""
    Write-Host "  Please copy the 'Connection string:' line shown above." -ForegroundColor Yellow
    $PgConn = Read-Host "  Paste the connection string here"
    if ([string]::IsNullOrEmpty($PgConn)) {
        Write-Host "  [ERROR] Connection string not provided. Cannot continue." -ForegroundColor Red
        exit 1
    }
    Write-Host "  [OK] Connection string captured" -ForegroundColor Green
    Write-Host "  [OK] Database created" -ForegroundColor Green
}

Write-Host "Attaching Postgres..." -ForegroundColor Yellow
flyctl postgres attach $dbName --app "$Env-bdp-registry-api" 2>$null
flyctl postgres attach $dbName --app "$Env-bdp-registry-jobs" 2>$null

Write-Host "Removing auto-generated DATABASE_URL secrets..." -ForegroundColor Yellow
flyctl secrets unset DATABASE_URL --app "$Env-bdp-registry-api" 2>$null
flyctl secrets unset DATABASE_URL --app "$Env-bdp-registry-jobs" 2>$null

Write-Host "[OK] Fly.io resources ready" -ForegroundColor Green

Write-Host "Creating GitHub environment '$Env'..." -ForegroundColor Yellow
try {
    gh api repos/$Repo/environments/$Env --method PUT 2>$null | Out-Null
    Write-Host "  [OK] GitHub environment '$Env' created" -ForegroundColor Green
} catch {
    Write-Host "  [SKIP] GitHub environment '$Env' already exists or creation failed" -ForegroundColor DarkGray
}

Write-Host "Configuring GitHub environment secrets..." -ForegroundColor Yellow

gh secret set FLY_API_APP_NAME --repo $Repo --env $Env --body "$Env-bdp-registry-api" 2>$null
gh secret set FLY_JOBS_APP_NAME --repo $Repo --env $Env --body "$Env-bdp-registry-jobs" 2>$null
gh secret set FLY_WEB_APP_NAME --repo $Repo --env $Env --body "$Env-bdp-registry-web" 2>$null

gh secret set REGISTRY_DB_CONNECTION_STRING --repo $Repo --env $Env --body $PgConn 2>$null
gh secret set HANGFIRE_DB_CONNECTION_STRING --repo $Repo --env $Env --body $PgConn 2>$null

Write-Host "Configuring GitHub environment variables..." -ForegroundColor Yellow
$apiUrl = "https://$Env-bdp-registry-api.fly.dev"
gh variable set API_URL --repo $Repo --env $Env --body $apiUrl 2>$null

Write-Host "[OK] GitHub environment secrets and variables configured" -ForegroundColor Green
Write-Host "[OK] Environment '$Env' ready" -ForegroundColor Green

Write-Host ""
Write-Host "Setup Summary" -ForegroundColor Cyan
Write-Host "Environment: $Env" -ForegroundColor White
Write-Host "Fly.io Apps Created:" -ForegroundColor White
Write-Host "  - $Env-bdp-registry-api" -ForegroundColor Gray
Write-Host "  - $Env-bdp-registry-jobs" -ForegroundColor Gray
Write-Host "  - $Env-bdp-registry-web" -ForegroundColor Gray
Write-Host "Database: $dbName" -ForegroundColor White
Write-Host "API URL: $apiUrl" -ForegroundColor White
Write-Host ""
Write-Host "You can now deploy using:" -ForegroundColor Yellow
Write-Host "gh workflow run cd-deploy.yml --ref main -f environment=$Env" -ForegroundColor Green
