#!/bin/bash

OUTPUT_FILE="tabs.html"  # 출력할 파일 이름
echo "" > $OUTPUT_FILE   # 파일 초기화

COUNTER=1  # rd 카운터 초기화

# ./public/img/AWS_icon/ 하위의 모든 디렉토리를 순회
for DIRECTORY in $(find ./public/img/AWS_icon/ -type d); do
    # 최상위 디렉토리는 제외
    if [ "$DIRECTORY" != "./public/img/AWS_icon/" ]; then
        DIRECTORY_NAME=$(basename "$DIRECTORY")

        # HTML 형식으로 출력
        echo "                <div className=\"tab\">" >> $OUTPUT_FILE
        echo "                  <input type=\"radio\" id=\"rd$COUNTER\" name=\"rd\" onClick={() => setSelectedTab(\"$DIRECTORY_NAME\")} />" >> $OUTPUT_FILE
        echo "                  <label className=\"tab-label\" htmlFor=\"rd$COUNTER\">$DIRECTORY_NAME</label>" >> $OUTPUT_FILE
        echo "                  <div className=\"tab-content\" ref={el => paletteDivs.current['$DIRECTORY_NAME'] = el} />" >> $OUTPUT_FILE
        echo "                </div>" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
        
        let "COUNTER++"  # 카운터 증가
    fi
done

echo "Tabs have been written to $OUTPUT_FILE"
