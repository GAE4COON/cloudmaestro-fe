
import { alertCheck, NodeCheck, GroupCheck } from "../apis/fileAPI";


export async function handleSecurity(e, diagram, setInfoMessage) {
  if (e.isTransactionFinished) {
    const jsonString = e.model.toIncrementalJson(e);
    const data = JSON.parse(jsonString);
  

    if (data.modifiedLinkData) {
      // TODO
    }

    if (data.insertedNodeKeys) {
      // TODO
    }

    if (data.removedNodeKeys || data.removedLinkKeys) {
      // TODO
    }

    // Handling node modifications separately
    if (data.modifiedNodeData) {
      console.log("제발 호출되라");
      for (let i = 0; i < data.modifiedNodeData.length; i++) {
        if (data.modifiedNodeData[i].text === "QuickSight" ||
            data.modifiedNodeData[i].text ===  "OpenSearch Service" ||
            data.modifiedNodeData[i].text === "Athena" ||
            data.modifiedNodeData[i].text === "S3"
        ) {
          await handleNode(data.modifiedNodeData[i], diagram, setInfoMessage);
        }
        }
      }
      //checkForLog(diagram, setInfoMessage)
    }
  }


async function handleNode(node, diagram, setInfoMessage) {

//  const PostData = {
//   checkOption: null,
//   newData: null,
//   diagramData: diagram.model.toJson(),
// };


  try {
    const message = {
      key: Date.now().toString(), // Unique key for each message
      message: node.text + " 가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다."
    };
    console.log("hello", message);
    setInfoMessage((prevDiagramCheck) => {
      const isDuplicate = prevDiagramCheck.some(
        (item) => item.message === message.message
      );
      return isDuplicate ? prevDiagramCheck : [...prevDiagramCheck, message];
    });

  } catch (error) {
    console.error("API Error:", error);
  }
  
}


export function checkForLog(diagram, setInfoMessage) {
  if (diagram.model.nodeDataArray.length > 0) {
    const hasQuickSightNode = diagram.model.nodeDataArray.some(node => node.text === "QuickSight");
    const hasOpenSearch = diagram.model.nodeDataArray.some(node => node.text === "OpenSearch Service");
    const hasAthena = diagram.model.nodeDataArray.some(node => node.text === "Athena");
    const hasS3 =  diagram.model.nodeDataArray.some(node => node.text === "S3");
    const backUpGuide = hasQuickSightNode + "정보, 소프트웨어 및 시스템의 백업 사본은 합의된 백업 주제의 정책에 따라 유지되고 정기적으로 테스트되어야 함";
    console.log("hasQuickSIghtNode" , hasQuickSightNode);
    console.log("hellohihi");
    if (!hasQuickSightNode && !hasOpenSearch && !hasAthena && !hasS3) {
      setInfoMessage(prevDiagramCheck => {
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