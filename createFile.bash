#!/bin/bash

OUTPUT_FILE="nodes.json"  # 출력할 파일 이름
echo "[" > $OUTPUT_FILE   # JSON 배열 시작

# 모든 svg 파일을 찾는다
find ./public/img/Network_icon/ -type f -name "*.svg" | while read SVG_PATH; do
    # SVG 파일의 이름만 추출
    SVG_NAME=$(basename "$SVG_PATH" .svg)
    
    # 해당 SVG 파일의 디렉토리 이름만 추출
    DIRECTORY_NAME=$(basename $(dirname "$SVG_PATH"))
    
    # JSON 형식으로 출력
    echo "    {" >> $OUTPUT_FILE
    echo "        key: \"$SVG_NAME\"," >> $OUTPUT_FILE
    echo "        text: \"1\"," >> $OUTPUT_FILE
    echo "        figure: \"Rectangle\"," >> $OUTPUT_FILE
    echo "        color: \"lightblue\"," >> $OUTPUT_FILE
    echo "        source: \"$SVG_PATH\"," >> $OUTPUT_FILE
    echo "        type: \"$DIRECTORY_NAME\"" >> $OUTPUT_FILE
    echo "    }," >> $OUTPUT_FILE
done

echo "]" >> $OUTPUT_FILE  # JSON 배열 끝

echo "Nodes have been written to $OUTPUT_FILE"
