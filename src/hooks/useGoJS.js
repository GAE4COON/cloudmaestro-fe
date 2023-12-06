import { useState, useEffect } from "react";
import * as go from "gojs";
import "../styles/App.css"; // contains .diagram-component CSS
import handleChangedSelection from "../pages/toggle/toggle";
import { alertCheck, NodeCheck, GroupCheck } from "../apis/fileAPI";
import { useData } from "../components/DataContext";
import { checkForBackupAndS3Nodes } from "../components/AlertBackUp";
import { checkForMonitoringNodes } from "../components/AlertMonitoring"

const useGoJS = (
  setShowToggle,
  onDiagramChange,
  // handleguide,
  setAlertMessage,
  setWarnMessage,
  setInfoMessage
) => {
  const [diagram, setDiagram] = useState(null);
  const [clickedNodeKey, setClickedNodeKey] = useState();
  const [showSelectToggle, setShowSelectToggle] = useState({ value: false });
  // const [DiagramCheck, setDiagramCheck] = useState([]);
  // const [NodeGuide, setNodeGuide] = useState(null);
  const { setData } = useData();

  // useEffect(() => {
  //   handleAlertGuide(DiagramCheck);
  //   console.log("DiagramCheck", DiagramCheck);
  // }, [DiagramCheck]);


  function highlightGroup(e, grp, show) {
    if (!grp) return;
    e.handled = true;
    if (show) {
      var tool = grp.diagram.toolManager.draggingTool;
      var map = tool.draggedParts || tool.copiedParts;
      if (grp.canAddMembers(map.toKeySet())) {
        grp.isHighlighted = true;
        return;
      }
    }
    grp.isHighlighted = false;
  }

  // add group via drag and drop
  function finishDrop(e, grp) {
    var ok =
      grp !== null
        ? grp.addMembers(grp.diagram.selection, true)
        : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true);
    if (!ok) e.diagram.currentTool.doCancel();
  }
  const initDiagram = () => {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      "resizingTool.isGridSnapEnabled": true,
      "commandHandler.archetypeGroupData": {
        key: "Group",
        text: "Group",
        type: "group",
        stroke: "rgba(128, 128, 128)",
        isGroup: true,
      },
      "contextMenuTool.isEnabled": true,
      grid: $(
        go.Panel,
        "Grid",
        { gridCellSize: new go.Size(20, 20) }, // 여기서 칸의 크기를 설정
        $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.7 }),
        $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.7 })
      ),
      "draggingTool.isGridSnapEnabled": true,
      "resizingTool.isGridSnapEnabled": true,
      ModelChanged: async (e) => {
        if (e.isTransactionFinished) {
          const jsonString = e.model.toIncrementalJson(e);
          const data = JSON.parse(jsonString);
          console.log("노드 추가영: ",data);
          if (data.insertedLinkKeys) {
            console.log("insertedLinkKeys", data.modifiedLinkData);
            try {
              const response = await alertCheck(data.modifiedLinkData[0]);
              if (response.data.result.status === "fail") {
                console.log(
                  "링크 취소해도 되는 부분.. 주석처리만 하니까 안 올라가서 우선 콘솔로그라도 띄움"
                );
                //diagram.undoManager.undo();
                setAlertMessage((prevDiagramCheck) => {
                  const isDuplicate = prevDiagramCheck.some(
                    (item) => item === response.data.result.message
                  );
                  if (!isDuplicate) {
                    const newMessage = {
                      key: Date.now(), // 현재 타임스탬프를 key로 사용
                      message: response.data.result.message,
                    };

                    return [...prevDiagramCheck, newMessage];
                  } else {
                    return prevDiagramCheck;
                  }
                });
              }
            } catch (error) {
              console.error("API Error:", error);
            }
          } else if (data.insertedNodeKeys || data.modifiedNodeData) {
            try {
              const PostData = {
                checkOption: null,
                newData: null,
                diagramData: diagram.model.toJson(),
              };
              if (data.insertedNodeKeys || data.modifiedNodeData) {
                for (let i = 0; i < data.modifiedNodeData.length; i++) {
                  if (
                    data.modifiedNodeData[i].text === "VPC" &&
                    data.modifiedNodeData[i].isGroup === true
                  ) {
                    PostData.checkOption = "VPC";
                    PostData.newData = data.modifiedNodeData[i];
                    //console.log("NodeCheck 호출");
                    const response = await GroupCheck(PostData);
                    //console.log("API Response:", response.data);
                    if (response.data.result.status === "fail") {
                      setAlertMessage((prevDiagramCheck) => {
                        const isDuplicate = prevDiagramCheck.some(
                          (item) => item === response.data.result.message
                        );
                        if (!isDuplicate) {
                          const newMessage = {
                            key: Date.now(), // 현재 타임스탬프를 key로 사용
                            message: response.data.result.message,
                          };

                          return [...prevDiagramCheck, newMessage];
                        } else {
                          return prevDiagramCheck;
                        }
                      });
                    }
                  } else if (
                    data.modifiedNodeData[i].text === "API Gateway"
                    //  ||data.modifiedNodeData[i].type === "Database"
                  ) {
                    // if (data.modifiedNodeData[i].text === "API Gateway")
                    //   PostData.checkOption = "API Gateway";
                    // else if (data.modifiedNodeData[i].type === "Database")
                    //   PostData.checkOption = "Database";
                    PostData.checkOption = "API Gateway";
                    PostData.newData = data.modifiedNodeData[i];
                    //console.log("NodeCheck 호출");
                    const response = await NodeCheck(PostData);
                    if (response.data.result.status === "fail") {
                      //console.log("API Response:", response.data);
                      setAlertMessage((prevDiagramCheck) => {
                        const isDuplicate = prevDiagramCheck.some(
                          (item) => item === response.data.result.message
                        );
                        if (!isDuplicate) {
                          const newMessage = {
                            key: Date.now(), // 현재 타임스탬프를 key로 사용
                            message: response.data.result.message,
                          };

                          return [...prevDiagramCheck, newMessage];
                        } else {
                          return prevDiagramCheck;
                        }
                      });
                    }
                  } else if (data.modifiedNodeData[i].type === "Database") {
                    PostData.checkOption = "Database";
                    PostData.newData = data.modifiedNodeData[i];
                    console.log("NodeCheck 호출");
                    const response = await NodeCheck(PostData);
                    if (response.data.result.status === "fail") {
                      console.log("API Response:", response.data);
                      setWarnMessage((prevDiagramCheck) => {
                        const isDuplicate = prevDiagramCheck.some(
                          (item) => item === response.data.result.message
                        );
                        if (!isDuplicate) {
                          const newMessage = {
                            key: Date.now(), // 현재 타임스탬프를 key로 사용
                            message: response.data.result.message,
                          };

                          return [...prevDiagramCheck, newMessage];
                        } else {
                          return prevDiagramCheck;
                        }
                      });
                    }
                  }
                }
              }
            } catch (error) {
              console.error("API Error:", error);
            }
          }
        }
      },
      model: new go.GraphLinksModel({
        linkKeyProperty: "key",
      }),
    });

    // delete
    diagram.addLayerBefore(
      $(go.Layer, { name: "BottomLayer" }),
      diagram.findLayer("Background")
    );

    // Define nodeTemplate (simplified, add other properties as needed)
    diagram.nodeTemplate = $(
      go.Node,
      "Spot", // Spot 패널 사용으로 변경
      // {
      //   click: (e, node) => {
      //     const text = node.data.text || node.data.key;
      //     setClickedNodeKey(text);
      //   },
      // },
      { resizable: false, resizeObjectName: "Picture" },
      // { background: "#A0BCC2" },
      new go.Binding("layerName", "key", function (key) {
        return key === -7 ? "BottomLayer" : "";
      }),

      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),

      //마진에 포트 추가해서 링크가 동작되게 만든다
      $(go.Shape, {
        width: 80,
        height: "auto",
        fill: "transparent",
        stroke: "transparent",
        portId: "",
        fromLinkable: true,
        toLinkable: true,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
      }),

      $(
        go.Panel,
        "Vertical",
        $(
          go.Picture,
          {
            name: "Picture",
            margin: 10,
            width: 50,
            height: 50,
            background: "transparent",
          },
          new go.Binding("source").makeTwoWay(),
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
            go.Size.stringify
          )
        ),
        $(
          go.TextBlock,
          {
            editable: true,
            font: "10pt Noto Sans KR",
            alignment: go.Spot.TopLeft,
            cursor: "pointer",
            width: 100, // 예를 들어, 최대 너비를 100픽셀로 설정
            overflow: go.TextBlock.WrapFit, // 너비를 초과하는 텍스트를 래핑
            textAlign: "center",
          },
          // EC2_2로 나오게하는 코드
          // new go.Binding("text", "", function(node){
          //   console.log("data", node);
          //   console.log("key", node.key);
          //   console.log("text", node.text);
          //   if(node.key===node.text){
          //     return node.key;
          //   }
          //   else{
          //     var diff = node.key.replace(node.text, "").trim();
          //     console.log("diff", diff);
          //     console.log(node.text+"_"+diff);
          //     return node.text+"_"+diff;
          //   }
          // }),
          new go.Binding("text", "key")
        )
      )
    );

    diagram.groupTemplate = $(
      go.Group,
      // {key: "Group"},
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        mouseDragEnter: (e, grp) => highlightGroup(e, grp, true),
        mouseDragLeave: (e, grp) => highlightGroup(e, grp, false),
        mouseDrop: finishDrop,
        ungroupable: true,
        resizable: true,
      },
      new go.Binding("background", "isHighlighted", (h) =>
        h ? "rgba(128,128,128,0.1)" : "transparent"
      ).ofObject(),
      $(
        go.Panel,
        {
          padding: new go.Margin(4, 4, 4, 4), // Panel에 마진 추가
        },
        new go.Binding("background", "stroke"),

        $(
          go.TextBlock,
          {
            font: "10pt Noto Sans KR",
            stroke: "white",
            alignment: go.Spot.TopLeft,
            cursor: "pointer",
            fromLinkable: true,
            fromSpot: go.Spot.NotBottomSide,
            toLinkable: true,
            toSpot: go.Spot.NotBottomSide,
            portId: "",
            editable: true,
          },
          new go.Binding("text", "text")
        )
      ),

      $(
        go.Panel,
        "Auto",

        {
          stretch: go.GraphObject.Fill,
          margin: new go.Margin(25, 0, 0, 0), // Panel에 마진 추가
        },
        $(
          go.Shape,
          "Rectangle",
          {
            fill: "transparent", // default fill
            stroke: "rgb(128,128,128)",
            strokeWidth: 3,
          },
          new go.Binding("fill", "", function (data) {
            if (
              data.key.toLowerCase().includes("public") ||
              data.key.toLowerCase().includes("private") ||
              data.key.toLowerCase().includes("service")
            ) {
              // Parse the RGB color to get individual components
              let rgb = data.stroke.match(/\d+/g);
              if (rgb && rgb.length >= 3) {
                // Construct an RGBA color with 0.4 opacity
                return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`;
              }
            }
            return "transparent";
          }),
          new go.Binding("stroke", "", function (data) {
            if (
              data.key.toLowerCase().includes("public") ||
              data.key.toLowerCase().includes("private") ||
              data.key.toLowerCase().includes("service")
            ) {
              return "transparent";
            }
            return data.stroke;
          })
        ),

        $(go.Placeholder, { padding: 30 })
      )
    );

    diagram.linkTemplate = $(
      go.Link,
      {
        toShortLength: 3,
        routing: go.Link.Normal,
        // routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpGap,
        corner: 5,
        contextMenu: $(
          go.Adornment,
          "Table",
          {
            defaultStretch: go.GraphObject.Horizontal,
          },

          $(
            "ContextMenuButton",
            $(go.Shape, "RoundedRectangle", {
              fill: "transparent",
              width: 40,
              height: 40,
            }),
            $(go.TextBlock, "━", { font: "10pt Noto Sans KR" }),
            {
              row: 0,
              column: 0,
              click: (e, obj) => {
                const link = obj.part.adornedPart;
                link.findObject("LinkShape").strokeDashArray = null;
                //console.log("실선 선택", link.data);
              },
            }
          ),
          $(
            "ContextMenuButton",

            $(go.Shape, "RoundedRectangle", {
              fill: "transparent",
              width: 40,
              height: 40,
            }),
            $(go.TextBlock, "┈", { font: "10pt Noto Sans KR" }),
            {
              row: 0,
              column: 1,
              click: (e, obj) => {
                const link = obj.part.adornedPart;
                link.findObject("LinkShape").strokeDashArray = [10, 10];
                //console.log("점선 선택", link.data);
              },
            }
          ),
          $(
            "ContextMenuButton",

            $(go.Shape, "RoundedRectangle", {
              fill: "transparent",
              width: 40,
              height: 40,
            }),
            $(go.TextBlock, "↔", { font: "10pt Noto Sans KR" }),
            {
              row: 1,
              column: 0,
              click: (e, obj) => {
                const link = obj.part.adornedPart;
                link.findObject("FromArrow").visible = true;
                link.findObject("FromArrow").fromArrow = "Backward";
                //console.log("backward로 했음다", link.data);
              },
            }
          ),
          $(
            "ContextMenuButton",

            $(go.Shape, "RoundedRectangle", {
              fill: "transparent",
              width: 40,
              height: 40,
            }),
            $(go.TextBlock, "→", { font: "10pt Noto Sans KR" }),
            {
              row: 1,
              column: 1,
              click: (e, obj) => {
                const link = obj.part.adornedPart;
                //link.findObject("FromArrow").fromArrow="Standard";
                link.findObject("FromArrow").visible = false;
                //console.log("원래대로 돌아갔음", link.data);
              },
            }
          )
        ),
      },
      // for link shape
      $(go.Shape, { strokeWidth: 2, stroke: "#000", name: "LinkShape" }),
      // for arrowhead 여기서 standaer
      $(go.Shape, {
        toArrow: "Standard",
        scale: 1.5,
        stroke: null,
        name: "ToArrow",
      }),
      $(go.Shape, {
        fromArrow: "DoubleForwardSlash",
        scale: 1.5,
        stroke: null,
        name: "FromArrow",
      })
    );

    // diagram.nodeTemplate.selectionAdornmentTemplate = $(
    //   go.Adornment,
    //   "Spot",
    //   $(
    //     go.Panel,
    //     "Auto",
    //     $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 2 }),
    //     $(go.Placeholder)
    //   ),
    //   $(
    //     go.Panel,
    //     "Horizontal",
    //     { alignment: new go.Spot(1, 1), alignmentFocus: new go.Spot(1, 0) },
    //     $(
    //       go.Panel,
    //       "Spot",
    //       {
    //         width: 20,
    //         height: 20,
    //         mouseEnter: function (e, panel) {
    //           const node = panel.part.adornedPart;
    //           if (node instanceof go.Node) {
    //             handleguide(node.data.text);
    //             // setNodeGuide(node.data.text);
    //           }
    //         },
    //         // mouseLeave: function (e, panel) {
    //         //   setNodeGuide(null);
    //         // },
    //       },
    //       $(go.Shape, "Circle", {
    //         fill: "rgba(82,96,208,0.7)",
    //         stroke: null,
    //         width: 20,
    //         height: 20,
    //       }),
    //       $(go.TextBlock, "?", {
    //         font: "10pt Noto Sans KR",
    //         stroke: "white",
    //         verticalAlignment: go.Spot.Center,
    //       })
    //     )
    //   )
    // );

    diagram.addDiagramListener("ObjectSingleClicked", function (e) {
      const part = e.subject.part;
      if (part instanceof go.Link) {
        //console.log("링크가 클릭되었네요");
      } else if (part instanceof go.Node) {
        //console.log("나는 node 입니다", part.data);
        const key = part.data.key;
        console.log("나는 node data 입니다", part.data);
        if (key) {
          if (handleChangedSelection(key)) {
            setShowSelectToggle({ value: true, key: key });
          }
        }
      }
    });

    diagram.addDiagramListener("ExternalObjectsDropped", (e) => {
      //console.log("from palette\n");
      setShowToggle(true);
    });

    diagram.addDiagramListener("SelectionMoved", (e) => {
      e.subject.each(function (part) {
        if (part instanceof go.Node) {
          //console.log("move to: " + part.location.toString());
        }
      });
    });

    diagram.addModelChangedListener(function (e) {
      if (e.isTransactionFinished) {
        onDiagramChange(diagram);
        //checkForBackupAndS3Nodes(diagram, setWarnMessage);
        checkForBackupAndS3Nodes(diagram, setWarnMessage);
        checkForMonitoringNodes(diagram, setWarnMessage);

      }
    });

    diagram.addDiagramListener("ChangedSelection", async (e) => {
      const selectedNode = e.diagram.selection.first();
      if (selectedNode instanceof go.Node) {
        const key = selectedNode.data.key;
      } else {
        setShowSelectToggle({ value: false }); // 추가된 로직
      }
      console.log("setdata", diagram.model.nodeDataArray)
      setData(diagram.model.nodeDataArray); // set the data in context
    });

    setDiagram(diagram);

    return diagram;
  };

  return {
    initDiagram,
    diagram,
    showSelectToggle,
    clickedNodeKey,
  };
};

export default useGoJS;
