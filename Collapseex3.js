import React, { useState } from 'react';
import { Graph } from 'react-d3-graph';

const data = {
  nodes: [
    { id: 'Node 1' },
    { id: 'Node 2' },
    { id: 'Node 3' },
    { id: 'Node 4' },
    { id: 'Node 5' }
  ],
  links: [
    { source: 'Node 1', target: 'Node 2' },
    { source: 'Node 1', target: 'Node 3' },
    { source: 'Node 2', target: 'Node 4' },
    { source: 'Node 3', target: 'Node 4' },
    { source: 'Node 3', target: 'Node 5' }
  ]
};

const myConfig = {
  nodeHighlightBehavior: true,
  directed: true,
  node: {
    color: 'lightgreen',
    size: 120,
    highlightStrokeColor: 'blue',
    renderLabel: false,
    collapsible: true,
    symbolType: 'circle',
    labelProperty: 'id',
    fontSize: 14,
    fontColor: 'white',
    strokeWidth: 3,
    strokeColor: 'white'
  },
  link: {
    highlightColor: 'lightblue'
  }
};

const GraphComponent = () => {
  const [data, setData] = useState(data);

  const onClickNode = (nodeId) => {
    const updatedData = { ...data };
    const node = updatedData.nodes.find((n) => n.id === nodeId);
    node.collapsed = !node.collapsed;

    // Collapse all direct nodes related to the clicked node
    const linkedNodes = updatedData.links
      .filter((l) => l.source === nodeId)
      .map((l) => l.target);
    linkedNodes.forEach((linkedNodeId) => {
      const linkedNode = updatedData.nodes.find((n) => n.id === linkedNodeId);
      linkedNode.collapsed = node.collapsed;
    });

    setData(updatedData);
  };

  return (
    <Graph
      id="graph-id"
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
    />
  );
};

export default GraphComponent;
