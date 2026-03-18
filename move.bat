@echo off
echo Starting move...
xcopy "c:\tailoring\frontend\src" "c:\tailoring\src" /E /I /H /Y
xcopy "c:\tailoring\frontend\public" "c:\tailoring\public" /E /I /H /Y
move "c:\tailoring\frontend\tailwind.config.ts" "c:\tailoring\tailwind.config.ts"
move "c:\tailoring\frontend\postcss.config.js" "c:\tailoring\postcss.config.js"
move "c:\tailoring\frontend\components.json" "c:\tailoring\components.json"
move "c:\tailoring\frontend\tsconfig.json" "c:\tailoring\tsconfig.json"
move "c:\tailoring\frontend\tsconfig.app.json" "c:\tailoring\tsconfig.app.json"
move "c:\tailoring\frontend\tsconfig.node.json" "c:\tailoring\tsconfig.node.json"
move "c:\tailoring\frontend\eslint.config.js" "c:\tailoring\eslint.config.js"
move "c:\tailoring\frontend\.env" "c:\tailoring\.env"
echo Done.
