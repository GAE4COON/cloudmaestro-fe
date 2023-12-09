import { alertCheck, NodeCheck, GroupCheck } from "../apis/fileAPI";

export async function handleSecurity(e, diagram, setAlertMessage) {
  if (e.isTransactionFinished) {
    const jsonString = e.model.toIncrementalJson(e);
    const data = JSON.parse(jsonString);
    checkForLog(diagram, setAlertMessage);

    // Handling node modifications separately
    if (data.modifiedNodeData) {
      for (let i = 0; i < data.modifiedNodeData.length; i++) {
        if (
          data.modifiedNodeData[i].text === "QuickSight" ||
          data.modifiedNodeData[i].text === "OpenSearch Service" ||
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
      message:
        node.text +
        " 가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
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

export function checkForLog(diagram, setAlertMessage) {
  if (diagram.model.nodeDataArray.length > 0) {
    const hasQuickSightNode = diagram.model.nodeDataArray.some(
      (node) => node.text === "QuickSight"
    );
    const hasOpenSearch = diagram.model.nodeDataArray.some(
      (node) => node.text === "OpenSearch Service"
    );
    const hasAthena = diagram.model.nodeDataArray.some(
      (node) => node.text === "Athena"
    );
    const hasS3 = diagram.model.nodeDataArray.some(
      (node) => node.text === "S3"
    );
    // console.log("hasQuickSIghtNode" , hasQuickSightNode);
    // console.log("hellohihi");
    const message = {
      key: Date.now().toString(), // Unique key for each message
      hasQuickmessage:
        " QuickSight가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
      hasOpenSearch:
        " OpenSearch 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
      hasAthena:
        " Athena가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
      hasS3:
        " S3가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
    };
    if (hasQuickSightNode) {
      setAlertMessage({
        key: Date.now(), // 현재 타임스탬프를 key로 사용
        message: message.hasQuickmessage,
        tag: "Info",
      });
    }
    if (hasOpenSearch) {
      setAlertMessage({
        key: Date.now() + 1, // 현재 타임스탬프를 key로 사용
        message: message.hasOpenSearch,
        tag: "Info",
      });
    }
    if (hasAthena) {
      setAlertMessage({
        key: Date.now() + 2, // 현재 타임스탬프를 key로 사용
        message: message.hasAthena,
        tag: "Info",
      });
    }
    if (hasS3) {
      setAlertMessage({
        key: Date.now() + 3, // 현재 타임스탬프를 key로 사용
        message: message.hasS3,
        tag: "Info",
      });
    }
  }
}
