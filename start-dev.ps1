# Script de inicio para desarrollo en Windows
$env:NODE_ENV = "development"
Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Green
Write-Host "NODE_ENV: $env:NODE_ENV" -ForegroundColor Yellow
npm.cmd run dev

