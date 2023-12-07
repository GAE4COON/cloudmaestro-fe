export function checkForBackupAndS3Nodes(diagram, setAlertMessage) {
    if (diagram.model.nodeDataArray.length > 0) {
      const hasS3Node = diagram.model.nodeDataArray.some(node => node.text === "Simple Storage Service (S3)");
      const hasBackUpNode = diagram.model.nodeDataArray.some(node => node.text === "Backup");
      const backUpGuide = "정보, 소프트웨어 및 시스템의 백업 사본은 합의된 백업 주제의 정책에 따라 유지되고 정기적으로 테스트되어야 함";
  
      setAlertMessage(prevAlert => {
        if (prevAlert.message === backUpGuide) {
          // 메시지가 이미 존재하면 key만 업데이트
          return { ...prevAlert, key: Date.now() };
        } else if (!hasS3Node && !hasBackUpNode) {
          // 새 메시지 설정
          return {
            key: Date.now(),
            message: backUpGuide,
            tag: "Warn"
          };
        } else {
          // 기존 상태 유지
          return prevAlert;
        }
      });
    }
}

export function checkForMonitoringNodes(diagram, setAlertMessage) {
    if (diagram.model.nodeDataArray.length > 0) {
      const hasCloudWatch = diagram.model.nodeDataArray.some(node => node.text === "CloudWatch");
      const hasCloudTrail = diagram.model.nodeDataArray.some(node => node.text === "CloudTrail");
      const monitoringGuide = "네트워크, 시스템 및 애플리케이션은 비정상적인 동작을 모니터링하고, 잠재적인 정보 보안 사건을 평가하기 위한 적절한 조치를 취해야 함";
  
      setAlertMessage(prevAlert => {
        if (prevAlert.message === monitoringGuide) {
          // 메시지가 이미 존재하면 key만 업데이트
          return { ...prevAlert, key: Date.now() };
        } else if (!hasCloudWatch && !hasCloudTrail) {
          // 새 메시지 설정
          return {
            key: Date.now(),
            message: monitoringGuide,
            tag: "Warn"
          };
        } else {
          // 기존 상태 유지
          return prevAlert;
        }
      });
    }
  }