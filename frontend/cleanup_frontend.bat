@echo off
cd /d "c:\tailoring\frontend"
echo Deleting root src files...
del /F /Q src\App.css src\pages\Index.jsx src\hooks\use-mobile.jsx
echo Deleting react proxy folder...
rd /S /Q src\components\react
echo Deleting unused UI components...
cd src\components\ui
del /F /Q alert-dialog.tsx alert.tsx aspect-ratio.tsx avatar.tsx calendar.tsx chart.tsx checkbox.tsx collapsible.tsx command.tsx context-menu.tsx dialog.tsx drawer.tsx dropdown-menu.tsx form.tsx hover-card.tsx input-otp.tsx menubar.tsx navigation-menu.tsx pagination.tsx popover.tsx progress.tsx radio-group.tsx resizable.tsx scroll-area.tsx separator.tsx sheet.tsx sidebar.tsx skeleton.tsx slider.tsx sonner.tsx switch.tsx table.tsx toggle-group.tsx toggle.tsx tooltip.tsx
echo Done.
