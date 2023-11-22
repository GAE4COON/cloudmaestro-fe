#!/bin/bash

# JSON 파일의 경로를 설정합니다. 예: /path/to/your/file.json
json_file="D:\cloud_front\Node.json"

# 'jq'를 사용하여 'text' 필드를 추가합니다.
jq 'map(. + {"text": .key})' $json_file > temp.json && mv temp.json $json_file
