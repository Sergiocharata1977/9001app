#!/bin/bash

# 🤖 Script de Actualización Automática de Documentación - SGC ISO 9001
# Actualiza automáticamente los mapas de archivos y base de datos cada 20 minutos

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODE_SCRIPT="$SCRIPT_DIR/backend/scripts/permanentes/actualizar-documentacion.js"
LOG_FILE="$SCRIPT_DIR/docs-update.log"
CONTROL_FILE="$SCRIPT_DIR/daemon-control.txt"

# Función para escribir logs
write_log() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local log_message="[$timestamp] $message"
    echo "$log_message"
    echo "$log_message" >> "$LOG_FILE"
}

# Función para verificar si el script Node.js existe
test_node_script() {
    if [ ! -f "$NODE_SCRIPT" ]; then
        write_log "❌ ERROR: Script de Node.js no encontrado en $NODE_SCRIPT"
        return 1
    fi
    return 0
}

# Función para actualizar documentación
update_documentation() {
    local force_flag="$1"
    
    if ! test_node_script; then
        return 1
    fi
    
    write_log "🔄 Iniciando actualización de documentación..."
    
    local args=("$NODE_SCRIPT")
    if [ "$force_flag" = "--force" ]; then
        args+=("--force")
    fi
    
    if node "${args[@]}"; then
        write_log "✅ Documentación actualizada exitosamente"
        return 0
    else
        write_log "❌ Error al actualizar documentación"
        return 1
    fi
}

# Función para iniciar modo daemon
start_daemon_mode() {
    write_log "🤖 Iniciando modo daemon - Actualización cada 20 minutos"
    write_log "📍 Directorio de trabajo: $SCRIPT_DIR"
    write_log "📄 Script Node.js: $NODE_SCRIPT"
    write_log "📝 Log file: $LOG_FILE"
    
    # Crear archivo de control
    echo "RUNNING" > "$CONTROL_FILE"
    write_log "🎯 Daemon iniciado. Para detener: rm $CONTROL_FILE"
    
    # Ejecutar actualización inicial
    update_documentation "--force"
    
    # Loop principal del daemon
    while [ -f "$CONTROL_FILE" ]; do
        if [ -f "$CONTROL_FILE" ]; then
            local control_content=$(cat "$CONTROL_FILE" 2>/dev/null)
            if [ "$control_content" = "STOP" ]; then
                write_log "🛑 Señal de parada recibida. Deteniendo daemon..."
                break
            fi
        fi
        
        write_log "⏰ Esperando 20 minutos para próxima actualización..."
        
        # Esperar 20 minutos con verificación cada minuto
        for i in {1..20}; do
            sleep 60
            
            # Verificar si se debe detener
            if [ ! -f "$CONTROL_FILE" ]; then
                write_log "🛑 Archivo de control eliminado. Deteniendo daemon..."
                return
            fi
            
            if [ -f "$CONTROL_FILE" ]; then
                local control_content=$(cat "$CONTROL_FILE" 2>/dev/null)
                if [ "$control_content" = "STOP" ]; then
                    write_log "🛑 Señal de parada recibida. Deteniendo daemon..."
                    return
                fi
            fi
        done
        
        # Ejecutar actualización
        if [ -f "$CONTROL_FILE" ]; then
            update_documentation
        fi
    done
    
    write_log "🏁 Daemon detenido"
}

# Función para detener daemon
stop_daemon() {
    if [ -f "$CONTROL_FILE" ]; then
        echo "STOP" > "$CONTROL_FILE"
        write_log "🛑 Señal de parada enviada al daemon"
        
        # Esperar a que el daemon se detenga
        local timeout=0
        while [ -f "$CONTROL_FILE" ] && [ $timeout -lt 30 ]; do
            sleep 1
            ((timeout++))
        done
        
        if [ -f "$CONTROL_FILE" ]; then
            rm -f "$CONTROL_FILE"
            write_log "🗑️ Archivo de control eliminado forzosamente"
        fi
        
        write_log "✅ Daemon detenido exitosamente"
    else
        write_log "ℹ️ No hay daemon ejecutándose"
    fi
}

# Función para verificar estado
check_status() {
    if [ -f "$CONTROL_FILE" ]; then
        local content=$(cat "$CONTROL_FILE")
        write_log "🤖 Daemon ejecutándose (Estado: $content)"
        
        # Verificar logs recientes
        if [ -f "$LOG_FILE" ]; then
            write_log "📝 Últimas 5 entradas del log:"
            tail -5 "$LOG_FILE" | while read line; do
                echo "  $line"
            done
        fi
    else
        write_log "💤 Daemon no está ejecutándose"
    fi
    
    # Verificar archivos de documentación
    local docs_path="$SCRIPT_DIR/docs-esenciales"
    local mapa_archivos="$docs_path/04-mapa-archivos.md"
    local mapa_database="$docs_path/05-mapa-database.md"
    
    if [ -f "$mapa_archivos" ]; then
        local last_modified=$(stat -c %y "$mapa_archivos" 2>/dev/null || stat -f %Sm "$mapa_archivos" 2>/dev/null)
        write_log "📁 Mapa de archivos: Última actualización $last_modified"
    else
        write_log "❌ Mapa de archivos no existe"
    fi
    
    if [ -f "$mapa_database" ]; then
        local last_modified=$(stat -c %y "$mapa_database" 2>/dev/null || stat -f %Sm "$mapa_database" 2>/dev/null)
        write_log "🗄️ Mapa de BD: Última actualización $last_modified"
    else
        write_log "❌ Mapa de base de datos no existe"
    fi
}

# Mostrar banner
echo ""
echo "🤖 SISTEMA DE ACTUALIZACIÓN AUTOMÁTICA DE DOCUMENTACIÓN"
echo "📚 Sistema SGC ISO 9001 - Documentación Esencial"
echo "⏰ Frecuencia: Cada 20 minutos"
echo ""

# Procesar argumentos
case "$1" in
    --daemon)
        start_daemon_mode
        ;;
    --force)
        write_log "🔄 Forzando actualización manual..."
        if update_documentation "--force"; then
            write_log "✅ Actualización manual completada"
        else
            write_log "❌ Error en actualización manual"
        fi
        ;;
    --check)
        check_status
        ;;
    --stop)
        stop_daemon
        ;;
    *)
        # Modo por defecto: verificar si necesita actualización
        write_log "🔍 Verificando necesidad de actualización..."
        if update_documentation; then
            write_log "✅ Actualización completada"
        else
            write_log "❌ Error en actualización"
        fi
        ;;
esac

echo ""
echo "📋 COMANDOS DISPONIBLES:"
echo "  ./actualizar-docs-automatico.sh --daemon   # Iniciar modo daemon (cada 20min)"
echo "  ./actualizar-docs-automatico.sh --force    # Forzar actualización manual"
echo "  ./actualizar-docs-automatico.sh --check    # Verificar estado del sistema"
echo "  ./actualizar-docs-automatico.sh --stop     # Detener daemon"
echo ""