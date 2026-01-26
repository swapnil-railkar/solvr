Set-Location $PSScriptRoot

Write-Host "=== Solvr Local SAM Runner ===" -ForegroundColor Cyan

$FunctionName = "SolutionFunction"
$EventFile    = "event.json"
$DebugPort    = 5005

# 1️⃣ Maven package build
Write-Host ">> Running Maven package..." -ForegroundColor Yellow
mvn clean package
if ($LASTEXITCODE -ne 0) {
    Write-Error "Maven build failed"
    exit 1
}

# 2️⃣ SAM build
Write-Host ">> Running SAM build..." -ForegroundColor Yellow
sam build
if ($LASTEXITCODE -ne 0) {
    Write-Error "SAM build failed"
    exit 1
}

# 3️⃣ Invoke Lambda locally with debugger
Write-Host ">> Starting SAM local invoke with debugger on port $DebugPort" -ForegroundColor Cyan
sam local invoke $FunctionName `
    --event $EventFile `
    --debug-port $DebugPort
