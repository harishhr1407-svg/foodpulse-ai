@echo off
title FoodPulse AI - Manufacturing Planning Platform
echo =========================================================================
echo  FoodPulse AI — Project Platform & Separate Presentation
echo  SRM EEC Zeroth Review | Harish Kanna M (310624104095) | Nagamani Segalla
echo =========================================================================
echo.
echo [1] Launching Project Platform: http://localhost:3000
start http://localhost:3000
echo.
echo [2] Launching Separate PPT Presentation: http://localhost:3000/ppt
start http://localhost:3000/ppt
echo.
echo [3] Generated PowerPoint File:
echo     FoodPulse_AI_Zeroth_Review_Presentation.pptx
echo.
node server.js
pause
