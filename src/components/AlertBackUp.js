export function checkForBackupAndS3Nodes(diagram, setWarnMessage) {
    if (diagram.model.nodeDataArray.length > 0) {
      const hasS3Node = diagram.model.nodeDataArray.some(node => node.text === "Simple Storage Service (S3)");
      const hasBackUpNode = diagram.model.nodeDataArray.some(node => node.text === "Backup");
      const backUpGuide = "정보, 소프트웨어 및 시스템의 백업 사본은 합의된 백업 주제의 정책에 따라 유지되고 정기적으로 테스트되어야 함";
  
      if (!hasS3Node && !hasBackUpNode) {
        setWarnMessage(prevDiagramCheck => {
          const isDuplicate = prevDiagramCheck.some(item => item.message === backUpGuide);
          const newMessage = { key: Date.now(), message: backUpGuide };
  
          if (!isDuplicate) {
            return [...prevDiagramCheck, newMessage];
          } else {
            return prevDiagramCheck.map(item => item.message === backUpGuide ? { ...item, ...newMessage } : item);
          }
        });
      }
    }
  }
  