#!/bin/bash

OUTPUT_FILE="tabs.html"  # 출력할 파일 이름
echo "" > $OUTPUT_FILE   # 파일 초기화

COUNTER=1  # rd 카운터 초기화

# ./public/img/Network_icon/ 하위의 모든 디렉토리를 순회
for DIRECTORY in $(find ./public/img/AWS_icon/ -type d); do
    # 최상위 디렉토리는 제외

        # HTML 형식으로 출력
        echo "                <div className=\"tab\">" >> $OUTPUT_FILE
        echo "                  <input type=\"radio\" id=\"rd$COUNTER\" name=\"rd\" onClick={() => setSelectedTab(\"$Network\")} />" >> $OUTPUT_FILE
        echo "                  <label className=\"tab-label\" htmlFor=\"rd$COUNTER\">$Network</label>" >> $OUTPUT_FILE
        echo "                  <div className=\"tab-content\" ref={el => paletteDivs.current['$Network'] = el} />" >> $OUTPUT_FILE
        echo "                </div>" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
        
        let "COUNTER++"  # 카운터 증가
    
done

echo "Tabs have been written to $OUTPUT_FILE"