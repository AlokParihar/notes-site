@echo off
rem Put this file in your inner notes-site folder (the one with package.json).
rem Double-click it to publish whatever you changed.

cd /d "%~dp0"

echo.
echo Changes to be published:
echo ------------------------
git status --short
echo.

set /p msg="Commit message (press Enter for 'update'): "
if "%msg%"=="" set msg=update

git add .
git commit -m "%msg%"
git push

echo.
echo Done. If there is no red error text above, the site updates in 30-60 seconds.
pause
