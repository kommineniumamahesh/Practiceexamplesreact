import React, { useState } from "react";
import { Graph } from "react-d3-graph";

const data = {
  nodes: [
    { id: "node1", label: "Node 1", hidden: false },
    { id: "node2", label: "Node 2", hidden: false },
    { id: "node3", label: "Node 3", hidden: false },
  ],
  links: [
    { source: "node1", target: "node2" },
    { source: "node2", target: "node3" },
    { source: "node3", target: "node1" },
  ],
};

const ExpandableGraph = () => {
  const [graphData, setGraphData] = useState(data);

  const toggleNode = (nodeId) => {
    const updatedData = {
      ...graphData,
      nodes: graphData.nodes.map((node) => {
        if (node.id === nodeId) {
          const neighbors = graphData.links
            .filter((link) => link.source === nodeId || link.target === nodeId)
            .map((link) => (link.source === nodeId ? link.target : link.source));
          const hidden = !node.hidden;
          neighbors.forEach((neighbor) => {
            const neighborNode = graphData.nodes.find((node) => node.id === neighbor);
            if (neighborNode.hidden !== hidden) {
              toggleNode(neighbor);
            }
          });
          return { ...node, hidden };
        }
        return node;
      }),
    };
    setGraphData(updatedData);
  };

  const getNodeColor = (node) => {
    return node.hidden ? "#d3d3d3" : "#00bfff";
  };

  const getNodeBorderColor = (node) => {
    return node.hidden ? "#d3d3d3" : "#000";
  };

  const getLinkColor = (link) => {
    const sourceNode = graphData.nodes.find((node) => node.id === link.source);
    const targetNode = graphData.nodes.find((node) => node.id === link.target);
    if (sourceNode.hidden || targetNode.hidden) {
      return "#d3d3d3";
    }
    return "#000";
  };

  const config = {
    node: {
      color: getNodeColor,
      borderColor: getNodeBorderColor,
      size: 200,
      fontSize: 16,
      highlightStrokeColor: "#000",
      highlightFontSize: 18,
    },
    link: {
      color: getLinkColor,
      highlightColor: "#000",
      strokeWidth: 2,
      highlightStrokeWidth: 3,
    },
    d3: {
      linkLength: 150,
      alphaTarget: 0.05,
      gravity: -250,
    },
    width: 800,
    height: 600,
  };

  return (
    <Graph
      id="my-graph"
      data={graphData}
      config={config}
      onClickNode={(nodeId) => toggleNode(nodeId)}
    />
  );
};

export default ExpandableGraph;
