#!/bin/bash

# 입력 파일 경로 (예: input.json)
INPUT_FILE="./src/db/Node.js"
# 출력 파일 경로 (예: output.json)
OUTPUT_FILE="your_output_file_path_here.json"

# jq를 사용하여 text 필드에 key 값을 할당
jq '.[] |= . + {"text": .key}' $INPUT_FILE > $OUTPUT_FILE

echo "Processing complete. Check $OUTPUT_FILE."