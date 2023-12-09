import {logGuideAlert, dbGuideAlert} from "../apis/GuideAlert";

export function checkForBackupAndS3Nodes(diagram, setAlertMessage) {
    if (diagram.model.nodeDataArray.length > 0) {
      const hasS3Node = diagram.model.nodeDataArray.some(node => node.text === "Simple Storage Service (S3)");
      const hasBackUpNode = diagram.model.nodeDataArray.some(node => node.text === "Backup");
      const backUpGuide = "정보, 소프트웨어 및 시스템의 백업 사본은 합의된 백업 주제의 정책에 따라 유지되고 정기적으로 테스트되어야 함. S3, Backup 사용 권장.";
  
      if (!hasS3Node && !hasBackUpNode) {
        setAlertMessage({
            key: Date.now(), // 현재 타임스탬프를 key로 사용
            message: backUpGuide,
            tag: "Warn",
          });
      }
    }
}

export function checkForMonitoringNodes(diagram, setAlertMessage) {
    if (diagram.model.nodeDataArray.length > 0) {
      const hasCloudWatch = diagram.model.nodeDataArray.some(node => node.text === "CloudWatch");
      const hasCloudTrail = diagram.model.nodeDataArray.some(node => node.text === "CloudTrail");
      const monitoringGuide = "네트워크, 시스템 및 애플리케이션은 비정상적인 동작을 모니터링하고, 잠재적인 정보 보안 사건을 평가하기 위한 적절한 조치를 취해야 함. CloudWatch, CloudTrail 사용 권장.";
  
      if (!hasCloudWatch && !hasCloudTrail) {
        setAlertMessage({
            key: Date.now(),
            message: monitoringGuide,
            tag: "Warn",
          });
        }
    }
}

export async function checkForLogAnalysisNodes(diagram, setAlertMessage) {
  const analysisGuide = "활동, 예외, 결함 및 기타 관련 이벤트를 기록하는 로그는 생성되고 저장되며 보호되고 분석되어야 함. 로그 분석 서비스와 로깅 서비스(S3)와 연결하세요.";
  const hasAthena = diagram.model.nodeDataArray.some(node => node.text === "Athena");
  const hasOpenSearchService = diagram.model.nodeDataArray.some(node => node.text === "OpenSearch Service");
  const hasQuickSight = diagram.model.nodeDataArray.some(node => node.text === "QuickSight");
  if(hasAthena || hasOpenSearchService || hasQuickSight){
    try {
      const response = await logGuideAlert(diagram.model.linkDataArray);
      console.log("리스폰스 왔음",response.data.result);
      if(response.data.result=="false"){
        setAlertMessage({
          key: Date.now(),
          message: analysisGuide,
          tag: "Warn",
        });
      }
    } catch (error) {
        console.error("checkForLogAnalysisNodes 오류:", error);
    }
  }
}

export function checkForKmsNodes(diagram, setAlertMessage) {
  if (diagram.model.nodeDataArray.length > 0) {
    const hasKms = diagram.model.nodeDataArray.some(node => node.text === "Key Management Service");
    const kmsGuide = "KMS 외에 별개의 키 관리 서비스를 사용하는 경우, CSP 제공의 키관리 서비스와 분리되어야 합니다.";

    if (hasKms) {
      setAlertMessage({
          key: Date.now(),
          message: kmsGuide,
          tag: "Warn",
        });
      }
  }
}

export async function checkForDbAccess(diagram, setAlertMessage) {
  if (diagram.model.nodeDataArray.length > 0) {
    const hasDb = diagram.model.nodeDataArray.some(node => node.type === "Database");
    const dbGuide = "웹 서버만 데이터베이스에 직접 액세스할 수 있어야 한다.";
    if (hasDb) { //db
      try {
        const response = await dbGuideAlert(diagram.model.toJSON());
        if(response.data.result=="true"){
          setAlertMessage({
            key: Date.now(),
            message: dbGuide,
            tag: "Warn",
          });
        }
      } catch (error) {
          console.error("checkForDbAccess 오류:", error);
      }
    }
  }
}