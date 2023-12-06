export function checkForMonitoringNodes(diagram, setWarnMessage) {
    if (diagram.model.nodeDataArray.length > 0) {
      const hasCloudWatch = diagram.model.nodeDataArray.some(node => node.text === "CloudWatch");
      const hasCloudTrail = diagram.model.nodeDataArray.some(node => node.text === "CloudTrail");
      const backUpGuide = "네트워크, 시스템 및 애플리케이션은 비정상적인 동작을 모니터링하고, 잠재적인 정보 보안 사건을 평가하기 위한 적절한 조치를 취해야 함";
  
      if (!hasCloudWatch && !hasCloudTrail) {
        setWarnMessage(prevDiagramCheck => {
          const isDuplicate = prevDiagramCheck.some(item => item.message === backUpGuide);
          const newMessage = { key: Date.now(), message: backUpGuide };
            console.log(prevDiagramCheck);
          if (!isDuplicate) {
            return [...prevDiagramCheck, newMessage];
          } else {
            return prevDiagramCheck.map(item => item.message === backUpGuide ? { ...item, ...newMessage } : item);
          }
        });
      }
    }
}