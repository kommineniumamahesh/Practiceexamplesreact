import React, { useState } from 'react';
import { Graph } from 'react-d3-graph';

const MyGraph = () => {
  const [graphData, setGraphData] = useState({
    nodes: [
      {
        id: 'node1',
        label: 'Node 1',
        image: 'https://example.com/node1.png',
        x: 100,
        y: 100,
      },
      {
        id: 'node2',
        label: 'Node 2',
        image: 'https://example.com/node2.png',
        x: 200,
        y: 200,
      },
    ],
    links: [
      { source: 'node1', target: 'node2' },
    ],
  });

  const onDragEnd = (nodeId, x, y) => {
    const updatedNodes = graphData.nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          x,
          y,
        };
      }
      return node;
    });
    setGraphData({
      ...graphData,
      nodes: updatedNodes,
    });
  };

  const getNodeLabel = (node) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={node.image} alt={node.label} style={{ width: 50, height: 50 }} />
        <span>{node.label}</span>
      </div>
    );
  };

  const getNodeTooltip = (node) => {
    return (
      <div style={{ padding: 10, backgroundColor: '#fff', borderRadius: 5 }}>
        <div>{node.label}</div>
        <div><img src={node.image} alt={node.label} style={{ width: 50, height: 50 }} /></div>
      </div>
    );
  };

  return (
    <Graph
      id="graph-id"
      data={graphData}
      onNodeDragEnd={onDragEnd}
      nodeDragBehavior="move"
      nodeLabel={getNodeLabel}
      nodeTooltip={getNodeTooltip}
    />
  );
};

export default MyGraph;
