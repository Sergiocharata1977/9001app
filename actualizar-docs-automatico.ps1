# 🤖 Script de Actualización Automática de Documentación - SGC ISO 9001
# Actualiza automáticamente los mapas de archivos y base de datos cada 20 minutos

param(
    [switch]$Daemon,
    [switch]$Force,
    [switch]$Check,
    [switch]$Stop
)

$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$NodeScript = Join-Path $ScriptPath "backend\scripts\permanentes\actualizar-documentacion.js"
$LogFile = Join-Path $ScriptPath "docs-update.log"

function Write-Log {
    param($Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] $Message"
    Write-Host $LogMessage
    Add-Content -Path $LogFile -Value $LogMessage
}

function Test-NodeScript {
    if (-not (Test-Path $NodeScript)) {
        Write-Log "❌ ERROR: Script de Node.js no encontrado en $NodeScript"
        return $false
    }
    return $true
}

function Update-Documentation {
    param([switch]$Force)
    
    if (-not (Test-NodeScript)) {
        return $false
    }
    
    try {
        Write-Log "🔄 Iniciando actualización de documentación..."
        
        $Args = @($NodeScript)
        if ($Force) {
            $Args += "--force"
        }
        
        $Process = Start-Process -FilePath "node" -ArgumentList $Args -Wait -PassThru -NoNewWindow
        
        if ($Process.ExitCode -eq 0) {
            Write-Log "✅ Documentación actualizada exitosamente"
            return $true
        } else {
            Write-Log "❌ Error al actualizar documentación (Exit Code: $($Process.ExitCode))"
            return $false
        }
    } catch {
        Write-Log "❌ Excepción al actualizar documentación: $($_.Exception.Message)"
        return $false
    }
}

function Start-DaemonMode {
    Write-Log "🤖 Iniciando modo daemon - Actualización cada 20 minutos"
    Write-Log "📍 Directorio de trabajo: $ScriptPath"
    Write-Log "📄 Script Node.js: $NodeScript"
    Write-Log "📝 Log file: $LogFile"
    
    # Crear archivo de control para poder detener el daemon
    $ControlFile = Join-Path $ScriptPath "daemon-control.txt"
    "RUNNING" | Out-File -FilePath $ControlFile -Encoding UTF8
    
    Write-Log "🎯 Daemon iniciado. Para detener, elimine el archivo: $ControlFile"
    
    # Ejecutar actualización inicial
    Update-Documentation -Force
    
    # Loop principal del daemon
    while (Test-Path $ControlFile) {
        $ControlContent = Get-Content $ControlFile -ErrorAction SilentlyContinue
        if ($ControlContent -eq "STOP") {
            Write-Log "🛑 Señal de parada recibida. Deteniendo daemon..."
            break
        }
        
        Write-Log "⏰ Esperando 20 minutos para próxima actualización..."
        
        # Esperar 20 minutos (1200 segundos) con verificación cada minuto
        for ($i = 0; $i -lt 20; $i++) {
            Start-Sleep -Seconds 60
            
            # Verificar si se debe detener
            if (-not (Test-Path $ControlFile)) {
                Write-Log "🛑 Archivo de control eliminado. Deteniendo daemon..."
                return
            }
            
            $ControlContent = Get-Content $ControlFile -ErrorAction SilentlyContinue
            if ($ControlContent -eq "STOP") {
                Write-Log "🛑 Señal de parada recibida. Deteniendo daemon..."
                return
            }
        }
        
        # Ejecutar actualización
        if (Test-Path $ControlFile) {
            Update-Documentation
        }
    }
    
    Write-Log "🏁 Daemon detenido"
}

function Stop-Daemon {
    $ControlFile = Join-Path $ScriptPath "daemon-control.txt"
    
    if (Test-Path $ControlFile) {
        "STOP" | Out-File -FilePath $ControlFile -Encoding UTF8
        Write-Log "🛑 Señal de parada enviada al daemon"
        
        # Esperar a que el daemon se detenga
        $timeout = 0
        while ((Test-Path $ControlFile) -and ($timeout -lt 30)) {
            Start-Sleep -Seconds 1
            $timeout++
        }
        
        if (Test-Path $ControlFile) {
            Remove-Item $ControlFile -Force
            Write-Log "🗑️ Archivo de control eliminado forzosamente"
        }
        
        Write-Log "✅ Daemon detenido exitosamente"
    } else {
        Write-Log "ℹ️ No hay daemon ejecutándose"
    }
}

function Check-Status {
    $ControlFile = Join-Path $ScriptPath "daemon-control.txt"
    
    if (Test-Path $ControlFile) {
        $Content = Get-Content $ControlFile
        Write-Log "🤖 Daemon ejecutándose (Estado: $Content)"
        
        # Verificar logs recientes
        if (Test-Path $LogFile) {
            $RecentLogs = Get-Content $LogFile | Select-Object -Last 5
            Write-Log "📝 Últimas 5 entradas del log:"
            $RecentLogs | ForEach-Object { Write-Host "  $_" }
        }
    } else {
        Write-Log "💤 Daemon no está ejecutándose"
    }
    
    # Verificar archivos de documentación
    $DocsPath = Join-Path $ScriptPath "docs-esenciales"
    $MapaArchivos = Join-Path $DocsPath "04-mapa-archivos.md"
    $MapaDatabase = Join-Path $DocsPath "05-mapa-database.md"
    
    if (Test-Path $MapaArchivos) {
        $LastModified = (Get-Item $MapaArchivos).LastWriteTime
        Write-Log "📁 Mapa de archivos: Última actualización $LastModified"
    } else {
        Write-Log "❌ Mapa de archivos no existe"
    }
    
    if (Test-Path $MapaDatabase) {
        $LastModified = (Get-Item $MapaDatabase).LastWriteTime
        Write-Log "🗄️ Mapa de BD: Última actualización $LastModified"
    } else {
        Write-Log "❌ Mapa de base de datos no existe"
    }
}

# Mostrar banner
Write-Host ""
Write-Host "🤖 SISTEMA DE ACTUALIZACIÓN AUTOMÁTICA DE DOCUMENTACIÓN" -ForegroundColor Cyan
Write-Host "📚 Sistema SGC ISO 9001 - Documentación Esencial" -ForegroundColor Cyan
Write-Host "⏰ Frecuencia: Cada 20 minutos" -ForegroundColor Cyan
Write-Host ""

# Procesar argumentos
if ($Stop) {
    Stop-Daemon
} elseif ($Daemon) {
    Start-DaemonMode
} elseif ($Force) {
    Write-Log "🔄 Forzando actualización manual..."
    $Result = Update-Documentation -Force
    if ($Result) {
        Write-Log "✅ Actualización manual completada"
    } else {
        Write-Log "❌ Error en actualización manual"
    }
} elseif ($Check) {
    Check-Status
} else {
    # Modo por defecto: verificar si necesita actualización
    Write-Log "🔍 Verificando necesidad de actualización..."
    $Result = Update-Documentation
    if ($Result) {
        Write-Log "✅ Actualización completada"
    } else {
        Write-Log "❌ Error en actualización"
    }
}

Write-Host ""
Write-Host "📋 COMANDOS DISPONIBLES:" -ForegroundColor Yellow
Write-Host "  .\actualizar-docs-automatico.ps1 -Daemon   # Iniciar modo daemon (cada 20min)" -ForegroundColor Green
Write-Host "  .\actualizar-docs-automatico.ps1 -Force    # Forzar actualización manual" -ForegroundColor Green
Write-Host "  .\actualizar-docs-automatico.ps1 -Check    # Verificar estado del sistema" -ForegroundColor Green
Write-Host "  .\actualizar-docs-automatico.ps1 -Stop     # Detener daemon" -ForegroundColor Red
Write-Host ""