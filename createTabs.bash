#!/bin/bash

# 디렉토리 경로 설정
directory="./public/img/AWS_icon/"

# 디렉토리 아래의 모든 하위 디렉토리 검색 및 출력
find "$directory" -type d -exec echo "{}" \; | sed "s|$directory||"
