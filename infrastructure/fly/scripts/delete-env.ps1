param(
    [Parameter(Mandatory = $true)]
    [string]$Repo,
    [Parameter(Mandatory = $true)]
    [string]$Env
)

$ErrorActionPreference = "Continue"

Write-Host "=== Deleting $Env environment ===" -ForegroundColor Cyan
$Confirm = Read-Host "This will delete all Fly.io resources and GitHub secrets. Continue? (yes/no)"
if ($Confirm -ne "yes") { Write-Host "Aborted" -ForegroundColor Yellow; exit 0 }

Write-Host "Removing GitHub secrets..." -ForegroundColor Yellow
$Secrets = @(
    "FLY_API_APP_NAME",
    "FLY_JOBS_APP_NAME",
    "FLY_WEB_APP_NAME",
    "FLY_MIGRATIONS_APP_NAME",
    "REGISTRY_DB_CONNECTION_STRING",
    "HANGFIRE_DB_CONNECTION_STRING"
)
foreach ($secret in $Secrets) { gh secret remove $secret --repo $Repo 2>$null }
$VarName = "$($Env.ToUpper())_API_URL"
gh variable delete $VarName --repo $Repo 2>$null
Write-Host "[OK] GitHub secrets removed" -ForegroundColor Green

Write-Host "Removing Fly.io resources..." -ForegroundColor Yellow
$apps = @(
    "$Env-bdp-registry-api",
    "$Env-bdp-registry-jobs",
    "$Env-bdp-registry-web",
    "$Env-bdp-registry-migrations"
)
$dbName = "$Env-bdp-registry-postgres"

foreach ($app in $apps) {
    $exists = flyctl apps list 2>$null | Select-String -Pattern ([regex]::Escape($app))
    if ($exists) {
        Write-Host "  Detaching $app from $dbName if attached..." -ForegroundColor DarkGray
        # detach syntax: flyctl postgres detach <POSTGRES APP> -a <APP>
        try {
            flyctl postgres detach $dbName -a $app 2>$null
        } catch { }
        Write-Host "  Destroying $app..." -ForegroundColor DarkGray
        flyctl apps destroy $app --yes 2>$null
        Write-Host "  [OK] $app destroyed" -ForegroundColor Green
    } else {
        Write-Host "  [SKIP] $app not found" -ForegroundColor DarkGray
    }
}

$pgExists = flyctl postgres list 2>$null | Select-String -Pattern ([regex]::Escape($dbName))
if ($pgExists) {
    Write-Host "  Destroying Postgres cluster app $dbName..." -ForegroundColor DarkGray
    # Destroy cluster via apps destroy per Fly docs
    flyctl apps destroy $dbName --yes 2>$null
    Write-Host "  [OK] Database destroyed" -ForegroundColor Green
} else {
    Write-Host "  [SKIP] Database not found" -ForegroundColor DarkGray
}

Write-Host "[OK] Fly.io resources removed" -ForegroundColor Green
Write-Host "[OK] Environment $Env deleted successfully" -ForegroundColor Green
