const toggleNode = (nodeId) => {
  const queue = [nodeId];
  const visited = new Set();
  visited.add(nodeId);

  const updatedData = {
    ...graphData,
    nodes: graphData.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, hidden: !node.hidden };
      }
      return node;
    }),
  };

  while (queue.length > 0) {
    const currentId = queue.shift();
    const current = updatedData.nodes.find((node) => node.id === currentId);
    const neighbors = graphData.links
      .filter((link) => link.source === currentId || link.target === currentId)
      .map((link) => (link.source === currentId ? link.target : link.source));
    neighbors.forEach((neighborId) => {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push(neighborId);
        updatedData.nodes = updatedData.nodes.map((node) => {
          if (node.id === neighborId) {
            return { ...node, hidden: current.hidden };
          }
          return node;
        });
      }
    });
  }

  setGraphData(updatedData);
};
