import { alertCheck, NodeCheck, GroupCheck } from "../apis/fileAPI";

export async function handleSecurity(e, diagram, setSecurityMessage) {
  if (e.isTransactionFinished) {
    const jsonString = e.model.toIncrementalJson(e);
    const data = JSON.parse(jsonString);
    console.log("soochandata", data);

    if (data.modifiedLinkData) {
      // TODO: Implement logic for modified links
    }

    if (data.insertedNodeKeys) {
      // TODO: Implement logic for inserted nodes
    }

    if (data.removedNodeKeys || data.removedLinkKeys) {
      // TODO: Implement logic for removed nodes or links
    }

    // Handling node modifications separately
    if (data.modifiedNodeData) {
      for (let i = 0; i < data.modifiedNodeData.length; i++) {
        if (data.modifiedNodeData[i].text === "QuickSight" ||
            data.modifiedNodeData[i].text === "OpenSearchService" ||
            data.modifiedNodeData[i].text === "Athena" ||
            data.modifiedNodeData[i].text === "S3"
        ) {
          await handleNode(data.modifiedNodeData[i], diagram, setSecurityMessage);
        }

          try {
            Node(data.modifiedNodeData[i], diagram.model.toJson())
          } catch (error) {
            console.error("API Error:", error);
            // TODO: Handle the error appropriately
          }
        }
      }
    }
  }


async function handleNode(node, diagram, setSecurityMessage) {
 console.log("node1111" , node.text);

  try {
      const message = node.text + "가 공개되어 있을 시, 무단 접근 및 변조 등을 통한 \
       보안 위험이 존재할 수 있습니다.";

      setSecurityMessage((prevDiagramCheck) => {
        const isDuplicate = prevDiagramCheck.some(
          (item) => item === message
        );
        // If the message is a duplicate, return the existing array without modification.
        return isDuplicate ? prevDiagramCheck : [...prevDiagramCheck, message];
      });
    
  } catch (error) {
    console.error("API Error:", error);
  }
}
