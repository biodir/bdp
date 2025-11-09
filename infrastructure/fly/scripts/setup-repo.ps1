param(
    [Parameter(Mandatory=$true)]
    [string]$Repo
)

$ErrorActionPreference = "Stop"

Write-Host "=== Repository Setup ===" -ForegroundColor Cyan

$FlyToken = (flyctl auth token) | Out-String
$FlyToken = $FlyToken.Trim()
Write-Host "[OK] Got Fly.io API token" -ForegroundColor Green

gh secret set FLY_API_TOKEN --repo $Repo --body $FlyToken

Write-Host "[OK] Repository configured" -ForegroundColor Green
