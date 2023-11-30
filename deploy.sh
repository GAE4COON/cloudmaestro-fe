#!/usr/bin/env bash

echo "> 현재 실행 중인 Node.js 프로세스 확인"
PID=$(ps aux | grep 'npm start' | grep -v grep | awk '{print $2}')

if [ -z "$PID" ]; then
    echo "> 실행 중인 Node.js 프로세스가 없습니다."
else
    echo "> 기존 Node.js 프로세스 종료 (PID: $PID)"
    kill -9 $PID
fi

echo "> FE 배포 시작"

echo "> 기존 node_modules 및 package-lock.json 삭제"
rm -rf node_modules
rm package-lock.json

echo "> npm 패키지 재설치"
npm install

echo "> 애플리케이션 시작"
nohup npm start &

echo "> 배포 완료"
