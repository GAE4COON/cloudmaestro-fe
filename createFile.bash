#!/bin/bash

OUTPUT_FILE="nodes.json"  # 출력할 파일 이름
echo "[" > $OUTPUT_FILE   # JSON 배열 시작

# 'Network_icon' 하위의 모든 디렉토리에서 svg 파일을 찾는다
find ./public/img/AWS_icon/ -type f -name "*.svg" | while read svg_PATH; do
    # svg 파일의 이름만 추출
    svg_NAME=$(basename "$svg_PATH" .svg)
    
    # svg_NAME에서 'Amazon', 'AWS', '48'을 제거하고 '-'를 ' '로 변환
    svg_NAME=$(echo "$svg_NAME" | sed 's/Amazon//g; s/AWS//g; s/Arch//g; s/48//g; s/_/ /g; s/-/ /g;')
    
    # svg_NAME의 앞뒤 공백 제거
    svg_NAME=$(echo "$svg_NAME" | sed 's/^ *//; s/ *$//')
    
    # 해당 svg 파일의 디렉토리 이름만 추출하여 type으로 사용
    DIRECTORY_NAME=$(basename $(dirname "$svg_PATH"))
    
    # JSON 형식으로 출력
    echo "    {" >> $OUTPUT_FILE
    echo "        key: \"$svg_NAME\"," >> $OUTPUT_FILE
    echo "        figure: \"Rectangle\"," >> $OUTPUT_FILE
    echo "        source: \"$svg_PATH\"," >> $OUTPUT_FILE
    echo "        type: \"$DIRECTORY_NAME\"" >> $OUTPUT_FILE
    echo "    }," >> $OUTPUT_FILE
done

echo "]" >> $OUTPUT_FILE  # JSON 배열 끝

echo "Nodes have been written to $OUTPUT_FILE"
