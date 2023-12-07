
import { alertCheck, NodeCheck, GroupCheck } from "../apis/fileAPI";


export async function handleSecurity(e, diagram, setAlertMessage) {
  if (e.isTransactionFinished) {
    const jsonString = e.model.toIncrementalJson(e);
    const data = JSON.parse(jsonString);
    checkForLog(diagram, setAlertMessage)

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
      for (let i = 0; i < data.modifiedNodeData.length; i++) {
        if (data.modifiedNodeData[i].text === "QuickSight" ||
            data.modifiedNodeData[i].text ===  "OpenSearch Service" ||
            data.modifiedNodeData[i].text === "Athena" ||
            data.modifiedNodeData[i].text === "S3"
        ) {
          await handleNode(data.modifiedNodeData[i], diagram, setAlertMessage);
        }
        }
      }
      //checkForLog(diagram, setInfoMessage)
    }
  }


async function handleNode(node, diagram, setAlertMessage) {

//  const PostData = {
//   checkOption: null,
//   newData: null,
//   diagramData: diagram.model.toJson(),
// };


  try {
    const message = {
      key: Date.now().toString(), // Unique key for each message
      message: node.text + " 가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.\
      " + node.text + "를 암호화해주시기를 바랍니다."
    };
    console.log("hello", message);
    setAlertMessage({
      key: Date.now(), // 현재 타임스탬프를 key로 사용
      message: message.message,
      tag: "Info",
    });
   
  } catch (error) {
    console.error("API Error:", error);
  }
  
}


export function checkForLog(diagram, setAlertMessage,handleMessageQueue) {
  if (diagram.model.nodeDataArray.length > 0) {
    const hasQuickSightNode = diagram.model.nodeDataArray.some(node => node.text === "QuickSight");
    const hasOpenSearch = diagram.model.nodeDataArray.some(node => node.text === "OpenSearch Service");
    const hasAthena = diagram.model.nodeDataArray.some(node => node.text === "Athena");
    const hasS3 =  diagram.model.nodeDataArray.some(node => node.text === "S3");

    const message = {
      key: Date.now().toString(), // Unique key for each message
      hasmessage: " 로그 저장 매체가 있을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다."
     
    
    };
    if (hasQuickSightNode || hasOpenSearch || hasAthena || hasS3) {
      setAlertMessage({
        key: Date.now(), // 현재 타임스탬프를 key로 사용
        message: message.hasmessage,
        tag: "Info",
      });
    }
  //   if (hasOpenSearch) {
  //     setAlertMessage({
  //       key: Date.now()+1, // 현재 타임스탬프를 key로 사용
  //       message: message.hasOpenSearch,
  //       tag: "Info",
  //     });
  //   }
  //   if (hasAthena) {
  //     setAlertMessage({
  //       key: Date.now()+2, // 현재 타임스탬프를 key로 사용
  //       message: message.hasAthena,
  //       tag: "Info",
  //     });
  //   }
  //   if (hasS3) {
  //     setAlertMessage({
  //       key: Date.now()+3, // 현재 타임스탬프를 key로 사용
  //       message: message.hasS3,
  //       tag: "Info",
  //     });
  //   }
    
  // }
  }
}