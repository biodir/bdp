param(
    [Parameter(Mandatory = $true)]
    [string]$Repo,
    [Parameter(Mandatory = $true)]
    [string]$Env
)

$ErrorActionPreference = "Continue"

Write-Host "Deleting $Env environment" -ForegroundColor Cyan
$Confirm = Read-Host "This will delete all Fly.io resources and GitHub environment (including all secrets/variables). Continue? (yes/no)"
if ($Confirm -ne "yes") { Write-Host "Aborted" -ForegroundColor Yellow; exit 0 }

Write-Host "Removing GitHub environment..." -ForegroundColor Yellow
try {
    $envExists = gh api repos/$Repo/environments/$Env 2>$null
    if ($envExists) {
        gh api repos/$Repo/environments/$Env --method DELETE 2>$null
        Write-Host "  [OK] GitHub environment '$Env' deleted (including all secrets and variables)" -ForegroundColor Green
    } else {
        Write-Host "  [SKIP] GitHub environment '$Env' not found" -ForegroundColor DarkGray
    }
} catch {
    Write-Host "  [SKIP] GitHub environment '$Env' not found or already deleted" -ForegroundColor DarkGray
}

Write-Host "Cleaning up any repository-level secrets/variables..." -ForegroundColor Yellow
$RepoSecrets = @(
    "FLY_API_APP_NAME",
    "FLY_JOBS_APP_NAME",
    "FLY_WEB_APP_NAME",
    "FLY_MIGRATIONS_APP_NAME", # ADDED
    "REGISTRY_DB_CONNECTION_STRING",
    "HANGFIRE_DB_CONNECTION_STRING"
)
foreach ($secret in $RepoSecrets) {
    gh secret remove $secret --repo $Repo 2>$null | Out-Null
}
$VarName = "API_URL"
gh variable delete $VarName --repo $Repo 2>$null | Out-Null
Write-Host "  [OK] Repository-level cleanup completed" -ForegroundColor Green

Write-Host "Removing Fly.io resources..." -ForegroundColor Yellow
$apps = @(
    "$Env-bdp-registry-api",
    "$Env-bdp-registry-jobs",
    "$Env-bdp-registry-web",
    "$Env-bdp-registry-migrations" # ADDED
)
$dbName = "$Env-bdp-registry-postgres"

foreach ($app in $apps) {
    $exists = flyctl apps list 2>$null | Select-String -Pattern ([regex]::Escape($app))
    if ($exists) {
        Write-Host "  Detaching $app from $dbName if attached..." -ForegroundColor DarkGray
        try {
            flyctl postgres detach $dbName -a $app 2>$null | Out-Null
        } catch {
        }
        Write-Host "  Destroying $app..." -ForegroundColor DarkGray
        flyctl apps destroy $app --yes 2>$null | Out-Null
        Write-Host "  [OK] $app destroyed" -ForegroundColor Green
    } else {
        Write-Host "  [SKIP] $app not found" -ForegroundColor DarkGray
    }
}

$pgExists = flyctl postgres list 2>$null | Select-String -Pattern ([regex]::Escape($dbName))
if ($pgExists) {
    Write-Host "  Destroying Postgres cluster app $dbName..." -ForegroundColor DarkGray
    flyctl apps destroy $dbName --yes 2>$null | Out-Null
    Write-Host "  [OK] Database destroyed" -ForegroundColor Green
} else {
    Write-Host "  [SKIP] Database not found" -ForegroundColor DarkGray
}

Write-Host "[OK] Fly.io resources removed" -ForegroundColor Green

Write-Host ""
Write-Host "Deletion Summary" -ForegroundColor Cyan
Write-Host "Environment: $Env" -ForegroundColor White
Write-Host "GitHub environment deleted (including all secrets/variables)" -ForegroundColor Green
Write-Host "Fly.io apps destroyed:" -ForegroundColor Green
Write-Host "   - $Env-bdp-registry-api" -ForegroundColor Gray
Write-Host "   - $Env-bdp-registry-jobs" -ForegroundColor Gray
Write-Host "   - $Env-bdp-registry-web" -ForegroundColor Gray
Write-Host "   - $Env-bdp-registry-migrations" -ForegroundColor Gray # ADDED
Write-Host "Database destroyed: $dbName" -ForegroundColor Green
Write-Host ""
Write-Host "[OK] Environment $Env deleted successfully" -ForegroundColor Green
