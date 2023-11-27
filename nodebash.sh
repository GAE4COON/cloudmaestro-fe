#!/bin/bash

# JSON 파일 경로 설정
JSON_FILE="D:\cloud_front\Node.json"

# 결과를 저장할 파일 설정
OUTPUT_FILE="output.java"

# 기존의 출력 파일 내용 삭제
> $OUTPUT_FILE

# jq를 사용하여 JSON 파일 파싱
# 각 객체에 대해 필요한 Java 함수 생성
cat $JSON_FILE | jq -c '.[]' | while read -r line; do
    original_key=$(echo $line | jq -r '.key')
    key=$(echo $original_key | sed 's/ //g' | sed 's/(//g' | sed 's/)//g') # 공백을 '_'로 대체하여 함수 이름용 key 생성
    text=$(echo $line | jq -r '.text')
    source=$(echo $line | jq -r '.source')
    type=$(echo $line | jq -r '.type')

    # Java 함수를 파일에 출력
    echo "public NodeData add$key(){" >> $OUTPUT_FILE
    echo "    return NodeData.builder()" >> $OUTPUT_FILE
    echo "            .key(\"$original_key\")" >> $OUTPUT_FILE # 원래의 key 사용
    echo "            .text(\"$text\")" >> $OUTPUT_FILE
    echo "            .source(\"$source\")" >> $OUTPUT_FILE
    echo "            .type(\"$type\")" >> $OUTPUT_FILE
    echo "            .build();" >> $OUTPUT_FILE
    echo "}" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
done

echo "Java functions are saved in $OUTPUT_FILE"
