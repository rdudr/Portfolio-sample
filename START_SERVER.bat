@echo off
echo Starting Portfolio Website Server...
echo.
echo Server will start on: http://localhost:8000
echo Open this URL in your browser: http://localhost:8000/index-netflix.html
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
