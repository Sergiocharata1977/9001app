@echo off
echo.
echo 🔪 TERMINANDO TODOS LOS PROCESOS DE NODE.JS...
echo.

REM Mostrar procesos Node.js actuales
echo 📋 Procesos Node.js encontrados:
tasklist /FI "IMAGENAME eq node.exe" /FO TABLE

echo.
echo ⏹️  Terminando procesos Node.js...
taskkill /IM node.exe /F >nul 2>&1

echo.
echo ⏹️  Terminando procesos nodemon...
taskkill /IM nodemon.exe /F >nul 2>&1

echo.
echo 🔍 Verificando puertos ocupados...
netstat -ano | findstr :5000
netstat -ano | findstr :5001

echo.
echo ✅ PROCESOS TERMINADOS
echo 💡 Ahora puedes ejecutar: cd backend ^&^& npm run dev
echo 🚀 El servidor se iniciará en puerto 5001
echo.
pause