# ===============================================
# SCRIPT POWERSHELL: SOLUCIONAR BACKEND
# Fecha: 20-01-2025
# Objetivo: Solucionar problema de puerto ocupado
# ===============================================

Write-Host ""
Write-Host "🔧 SOLUCIONANDO PROBLEMA DEL BACKEND..." -ForegroundColor Yellow
Write-Host ""

# 1. Mostrar procesos actuales en puertos 5000 y 5001
Write-Host "🔍 Verificando puertos ocupados..." -ForegroundColor Cyan
$port5000 = netstat -ano | Select-String ":5000"
$port5001 = netstat -ano | Select-String ":5001"

if ($port5000) {
    Write-Host "⚠️  Puerto 5000 ocupado:" -ForegroundColor Red
    $port5000
} else {
    Write-Host "✅ Puerto 5000 libre" -ForegroundColor Green
}

if ($port5001) {
    Write-Host "⚠️  Puerto 5001 ocupado:" -ForegroundColor Red
    $port5001
} else {
    Write-Host "✅ Puerto 5001 libre" -ForegroundColor Green
}

Write-Host ""

# 2. Terminar procesos Node.js
Write-Host "⏹️  Terminando procesos Node.js..." -ForegroundColor Yellow

try {
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        Write-Host "📋 Procesos Node.js encontrados: $($nodeProcesses.Count)"
        Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Procesos Node.js terminados" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  No hay procesos Node.js ejecutándose" -ForegroundColor Blue
    }
} catch {
    Write-Host "⚠️  Error terminando procesos Node.js: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Terminar procesos nodemon
try {
    $nodemonProcesses = Get-Process -Name "nodemon" -ErrorAction SilentlyContinue
    if ($nodemonProcesses) {
        Stop-Process -Name "nodemon" -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Procesos nodemon terminados" -ForegroundColor Green
    }
} catch {
    # Ignorar error si no existe nodemon
}

Write-Host ""

# 4. Verificar configuración
Write-Host "🔧 Verificando configuración del backend..." -ForegroundColor Cyan

$backendIndexPath = "backend/index.js"
if (Test-Path $backendIndexPath) {
    $indexContent = Get-Content $backendIndexPath -Raw
    if ($indexContent -match "5001") {
        Write-Host "✅ Backend configurado para puerto 5001" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Backend no configurado para puerto 5001" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Archivo backend/index.js no encontrado" -ForegroundColor Red
}

Write-Host ""

# 5. Mostrar instrucciones finales
Write-Host "🚀 INSTRUCCIONES FINALES:" -ForegroundColor Green
Write-Host ""
Write-Host "1️⃣  Abre una nueva terminal/PowerShell" -ForegroundColor White
Write-Host "2️⃣  Ejecuta: cd backend" -ForegroundColor White
Write-Host "3️⃣  Ejecuta: npm run dev" -ForegroundColor White
Write-Host "4️⃣  El servidor debería iniciarse en puerto 5001" -ForegroundColor White
Write-Host ""
Write-Host "📋 Si persiste el problema:" -ForegroundColor Yellow
Write-Host "   - Reinicia VS Code completamente" -ForegroundColor White
Write-Host "   - Reinicia tu computadora" -ForegroundColor White
Write-Host "   - Verifica que no tengas otros servicios en puerto 5001" -ForegroundColor White
Write-Host ""
Write-Host "✅ SCRIPT COMPLETADO" -ForegroundColor Green
Write-Host ""

# Pausa para que el usuario pueda leer
Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")