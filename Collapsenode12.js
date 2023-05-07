Here's a complete example of how you can collapse all direct nodes related to a clicked node in React-d3-graph:

```
import React, { useState } from "react";
import { Graph } from "react-d3-graph";

const MyGraph = () => {
  // Define initial data with no collapsed nodes
  const [data, setData] = useState({
    nodes: [
      { id: "node1", label: "Node 1" },
      { id: "node2", label: "Node 2" },
      { id: "node3", label: "Node 3" },
      { id: "node4", label: "Node 4" },
    ],
    links: [
      { source: "node1", target: "node2" },
      { source: "node2", target: "node3" },
      { source: "node2", target: "node4" },
    ]
  });

  // Add directParent property to each node
  data.nodes.forEach(node => {
    const parentLinks = data.links.filter(link => link.target === node.id);
    if (parentLinks.length > 0) {
      const directParent = parentLinks[0].source;
      node.directParent = directParent;
    }
  });

  // Define collapsedNodes state variable and toggle function
  const [collapsedNodes, setCollapsedNodes] = useState([]);
  
  const toggleCollapse = (nodeId) => {
    if (collapsedNodes.includes(nodeId)) {
      setCollapsedNodes(collapsedNodes.filter(id => id !== nodeId));
    } else {
      setCollapsedNodes([...collapsedNodes, nodeId]);
    }
  };
  
  // Define handleNodeClick function to collapse/expand nodes
  const handleNodeClick = (nodeName) => {
    const clickedNode = data.nodes.find(node => node.id === nodeName);
    
    // Collapse all direct children of clicked node
    data.nodes
      .filter(node => node.directParent === clickedNode.id)
      .forEach(node => toggleCollapse(node.id));
    
    // Toggle collapse of clicked node
    toggleCollapse(clickedNode.id);

    // Update data with collapsed nodes
    setData(data);
  };

  // Define graph config with collapsible and node visibility properties
  const myConfig = {
    node: {
      size: 300,
      fontSize: 16,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
    collapsible: true,
    nodeVisibility: (node) => !collapsedNodes.includes(node.id),
  };

  return (
    <Graph
      id="my-graph"
      data={data}
      config={myConfig}
      onClickNode={(nodeName) => handleNodeClick(nodeName)}
    />
  );
};

export default MyGraph;
```

This example uses React state to keep track of the collapsed nodes and update the data accordingly. The "toggleCollapse" function adds or removes node IDs from the "collapsedNodes" array, and the "handleNodeClick" function collapses all direct children of the clicked node and toggles the collapse of the clicked node itself. The "nodeVisibility" property of the graph config uses this array to hide or show the nodes based on whether they are collapsed or not.
