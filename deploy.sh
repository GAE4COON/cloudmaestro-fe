#!/usr/bin/env bash
echo "> FE 배포"
rm -rf node_modules
rm package-lock.json
npm install
nohup npm start &
