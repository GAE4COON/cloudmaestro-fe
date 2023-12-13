import {logGuideAlert, dbGuideAlert} from "../apis/GuideAlert";

export function checkForBackupAndS3Nodes(diagram, setAlertMessage) {
    if (diagram.model.nodeDataArray.length > 0) {
      const hasS3Node = diagram.model.nodeDataArray.some(node => node.text === "Simple Storage Service (S3)");
      const hasBackUpNode = diagram.model.nodeDataArray.some(node => node.text === "Backup");
      const backUpGuide = "정보, 소프트웨어 및 시스템의 백업 사본을 저장하고 테스트하기 위한 백업 서버가 존재해야 합니다. S3, Backup 사용을 권장합니다.";
  
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
      const monitoringGuide = "비정상적인 동작을 모니터랑하고, 보안 사고 식별, 위협 인텔리전스 형성을 위한 로깅 서비스가 필요합니다. CloudWatch, CloudTrail 사용을 권장합니다.";
  
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
  const analysisGuide = "로그는 분석 서비스를 통해 분석되고 위협 인텔리전스를 생성하는 데에 활용되어야 합니다. 로그 분석 서비스와 로깅 서비스(S3)와 연결하세요.";
  const hasAthena = diagram.model.nodeDataArray.some(node => node.text === "Athena");
  const hasOpenSearchService = diagram.model.nodeDataArray.some(node => node.text === "OpenSearch Service");
  const hasQuickSight = diagram.model.nodeDataArray.some(node => node.text === "QuickSight");
  if(hasAthena || hasOpenSearchService || hasQuickSight){
    try {
      const response = await logGuideAlert(diagram.model.linkDataArray);
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
    const dbGuide = "웹 서버만 데이터베이스에 직접 액세스할 수 있어야 합니다.";
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