@echo off
git add src/lib/api.js src/pages/AdminLogin.jsx src/pages/AdminDashboard.jsx src/pages/AdminCompleted.jsx
git commit -m "Fix Admin Login API URL for production"
git push
