@echo off
title Push FoodPulse AI to GitHub
echo =========================================================================
echo  FoodPulse AI - Push to GitHub
echo  Candidate: Harish Kanna M (310624104095) ^| SRM EEC Zeroth Review
echo =========================================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/your-username/foodpulse-ai.git): "
set /p GITHUB_TOKEN="Enter your GitHub Personal Access Token (PAT): "
echo.
echo Pushing project to %REPO_URL% ...
node push-to-github.js %REPO_URL% %GITHUB_TOKEN%
echo.
pause
