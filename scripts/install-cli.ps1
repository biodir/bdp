param(
    [string]$Version = "latest",
    [string]$Repository = $env:GITHUB_REPOSITORY
)

$ErrorActionPreference = "Stop"

if (-not $Repository) {
    $Repository = "owner/repo"
}

if ($Version -eq "latest") {
    Write-Host "📦 Fetching latest release..." -ForegroundColor Cyan
    $releaseUrl = "https://api.github.com/repos/$Repository/releases/latest"
} else {
    Write-Host "📦 Fetching release $Version..." -ForegroundColor Cyan
    $releaseUrl = "https://api.github.com/repos/$Repository/releases/tags/v$Version"
}

try {
    $release = Invoke-RestMethod -Uri $releaseUrl
    $tagName = $release.tag_name
    $versionNumber = $tagName.TrimStart('v')
} catch {
    Write-Host "❌ Error: Release not found" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing BDP CLI $versionNumber" -ForegroundColor Green

$runtime = "win-x64"
$downloadUrl = "https://github.com/$Repository/releases/download/$tagName/bdp-cli-$versionNumber-$runtime.zip"

Write-Host "⬇️  Downloading from $downloadUrl" -ForegroundColor Cyan

$tempDir = New-TemporaryFile | ForEach-Object { Remove-Item $_; New-Item -ItemType Directory -Path $_ }
$zipPath = Join-Path $tempDir "bdp-cli.zip"

try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force
} catch {
    Write-Host "❌ Error: Failed to download or extract" -ForegroundColor Red
    Remove-Item -Recurse -Force $tempDir
    exit 1
}

$exeName = if (Test-Path (Join-Path $tempDir "bdp.exe")) { "bdp.exe" } else { "BDP.CLI.exe" }
$exePath = Join-Path $tempDir $exeName

if (-not (Test-Path $exePath)) {
    Write-Host "❌ Error: CLI binary not found in archive" -ForegroundColor Red
    Remove-Item -Recurse -Force $tempDir
    exit 1
}

if ($exeName -ne "bdp.exe") {
    Rename-Item -Path $exePath -NewName "bdp.exe"
    $exePath = Join-Path $tempDir "bdp.exe"
}

$installDir = "$env:LOCALAPPDATA\Programs\BDP"
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

Write-Host "📂 Installing to $installDir" -ForegroundColor Cyan
Copy-Item -Path $exePath -Destination $installDir -Force

Remove-Item -Recurse -Force $tempDir

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$installDir*") {
    Write-Host "📂 Adding to PATH..." -ForegroundColor Cyan
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$installDir", "User")
    $env:Path = "$env:Path;$installDir"
}

Write-Host "✅ BDP CLI installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Run 'bdp --version' to verify installation" -ForegroundColor White
Write-Host "Run 'bdp --help' to see available commands" -ForegroundColor White
Write-Host ""
Write-Host "Note: You may need to restart your terminal for PATH changes to take effect" -ForegroundColor Yellow
