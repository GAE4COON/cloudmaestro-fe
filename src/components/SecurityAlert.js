<<<<<<< HEAD
import { alertCheck, NodeCheck, GroupCheck } from "../apis/fileAPI";
=======

import { DevCheck } from "../apis/fileAPI";
>>>>>>> 0d3140a4a4b9f9caaa70cb4851f90534465c28a3

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
<<<<<<< HEAD
=======
      
>>>>>>> 0d3140a4a4b9f9caaa70cb4851f90534465c28a3
    }
    //checkForLog(diagram, setInfoMessage)
  }
}

async function handleNode(node, diagram, setAlertMessage) {
<<<<<<< HEAD
  //  const PostData = {
  //   checkOption: null,
  //   newData: null,
  //   diagramData: diagram.model.toJson(),
  // };
=======
>>>>>>> 0d3140a4a4b9f9caaa70cb4851f90534465c28a3

  try {
    const message = {
      key: Date.now().toString(), // Unique key for each message
<<<<<<< HEAD
      message:
        node.text +
        " 가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
=======
      message: node.text + " (이)가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.\
      " + node.text + "(을)를 암호화해주시기를 바랍니다."
>>>>>>> 0d3140a4a4b9f9caaa70cb4851f90534465c28a3
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

<<<<<<< HEAD
export function checkForLog(diagram, setAlertMessage) {
=======

export async function checkForLog(diagram, setAlertMessage) {
>>>>>>> 0d3140a4a4b9f9caaa70cb4851f90534465c28a3
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
<<<<<<< HEAD
  }
}
=======

    /// dev 망이 있을 때 메세지 띄우기 

    const devMessage = {
      key: Date.now().toString(), // Unique key for each message
      hasmessage: "개발, 테스트 및 운영 환경은 분리되어야 하며 보호되어야 합니다."
    };

    try {
      const jsonString = diagram.model.toJson();
      const response = await DevCheck(jsonString);
      if ( response.data.status) {
        console.log("API Response:", response.data);
        setAlertMessage({
          key: Date.now(), // Use current timestamp as key
          message: devMessage.hasmessage,
          tag: "Info",
        });
      }
    } catch (error) {
      console.error("Error in DevCheck:", error);
      // Handle error appropriately (e.g., set an error message)
    }
  }
}

>>>>>>> 0d3140a4a4b9f9caaa70cb4851f90534465c28a3
