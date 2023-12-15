import { DevCheck } from "../apis/fileAPI";

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

  try {
    const message = {
      key: Date.now().toString(), // Unique key for each message
      message:
        node.text +
        "가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
    };

    setAlertMessage({
      key: Date.now(), // 현재 타임스탬프를 key로 사용
      message: message.message,
      tag: "Info",
    });
  } catch (error) {
    console.error("API Error:", error);
  }
}

async function checkForLog(diagram, setAlertMessage) {
  if (diagram.model.nodeDataArray.length > 0) {
    
    try {
      const jsonString = diagram.model.toJson();
      const response = await DevCheck(jsonString);

      const devMessage = {
        key: Date.now().toString(), // Unique key for each message
        hasmessage:
          "개발, 테스트 및 운영 환경은 분리되어야 하며 보호되어야 합니다.",
      };
  
      if (response.data.status) {
        setAlertMessage({
          key: Date.now(), // Use current timestamp as key
          message: devMessage.hasmessage,
          tag: "Info",
        });
      }

      const apiMessage = {
        key: Date.now().toString(), // Unique key for each message
        hasmessage:
          "Amazon API Gateway 뒤에 Lambda 함수와 같은 서버리스 워크로드를 배포한다.",
      };

      if (response.data.gatewayapi) {
        setAlertMessage({
          key: Date.now(), // Use current timestamp as key
          message: apiMessage.hasmessage,
          tag: "Info",
        });
      }

      
    } catch (error) {
      console.error("Error in DevCheck:", error);
      // Handle error appropriately (e.g., set an error message)
    }


  }
}




export async function checkForSecurityAccess(diagram, setAlertMessage) {
  const hasQuickSight = diagram.model.nodeDataArray.some(
    (node) => node.text === "QuickSight"
  );
  const hasQuickMessage = {
    key: Date.now().toString(), // Unique key for each message
    message:"QuickSight가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
  };
  
    try {
      if(hasQuickSight){
        setAlertMessage({
          key: Date.now(), // 현재 타임스탬프를 key로 사용
          message: hasQuickMessage.message,
          tag: "Info",
        });
      }
    } catch (error) {
      console.error("checkForLogAnalysisNodes 오류:", error);
    }
  
}


export async function checkForOpenSearchAccess(diagram, setAlertMessage) {
  const hasOpenSearch = diagram.model.nodeDataArray.some((node) => node.text=="OpenSearch Service" );
  const hasOpenSearchMessage = {
    key: Date.now().toString(), // Unique key for each message
    message:"OpenSearch Service가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
  };
  try {
    if(hasOpenSearch){
      setAlertMessage({
        key: Date.now(), // 현재 타임스탬프를 key로 사용
        message: hasOpenSearchMessage.message,
        tag: "Info",
      });
      }
    } catch (error) {
      console.error("checkForLogAnalysisNodes 오류:", error);
    }
}

export async function checkForS3Access(diagram, setAlertMessage) {
  const hasS3 = diagram.model.nodeDataArray.some(
    (node) => node.text === "S3"
  );
  const hasS3Message = {
    key: Date.now().toString(), // Unique key for each message
    message:"S3가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
  };
  try {
    if(hasS3){
      setAlertMessage({
        key: Date.now(), // 현재 타임스탬프를 key로 사용
        message: hasS3Message.message,
        tag: "Info",
      });
      }
    } catch (error) {
      console.error("checkForLogAnalysisNodes 오류:", error);
    }
}

export async function checkForAthenaAccess(diagram, setAlertMessage) {
  const hasAthena = diagram.model.nodeDataArray.some(
    (node) => node.text === "Athena"
  );
  const hasAthenaMessage = {
    key: Date.now().toString(), // Unique key for each message
    message:"Athena가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
  };
  try {
    if(hasAthena){
      setAlertMessage({
        key: Date.now(), // 현재 타임스탬프를 key로 사용
        message: hasAthenaMessage.message,
        tag: "Info",
      });
      }
    } catch (error) {
      console.error("checkForLogAnalysisNodes 오류:", error);
    }
}
