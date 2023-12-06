export function checkForBackupAndS3Nodes(diagram, setAlertMessage) {
    if (diagram.model.nodeDataArray.length > 0) {
      const hasS3Node = diagram.model.nodeDataArray.some(node => node.text === "Simple Storage Service (S3)");
      const hasBackUpNode = diagram.model.nodeDataArray.some(node => node.text === "Backup");
      const backUpGuide = "정보, 소프트웨어 및 시스템의 백업 사본은 합의된 백업 주제의 정책에 따라 유지되고 정기적으로 테스트되어야 함";
  
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
      const backUpGuide = "네트워크, 시스템 및 애플리케이션은 비정상적인 동작을 모니터링하고, 잠재적인 정보 보안 사건을 평가하기 위한 적절한 조치를 취해야 함";
  
      if (!hasCloudWatch && !hasCloudTrail) {
        setAlertMessage({
            key: Date.now(), // 현재 타임스탬프를 key로 사용
            message: backUpGuide,
            tag: "Warn",
          });
      }
    }
}