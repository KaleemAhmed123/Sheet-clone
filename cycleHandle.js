// hare we have 2D array of nodes not 1 to V
// so just like we created gridDB objs we'll have row, cell,child
// 2D grid and inside it 2d array  B1- [0,1], C1- [0,2] many depend

let graphComponentsGrid = [];

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < cols; j++) {
    // is empty array me deps hongi
    row.push([]); // will push etc [[0,1], [2,3]]
  }
  graphComponentsGrid.push(row);
}

function isCyclic(graphComponentsGrid) {
  // Initialize the visited and pathVisited arrays with false values
  // [ [], [],....  ]
  // [ [], [],....  ]
  // .......  => [false]
  let visited = [];
  let pathVisited = [];
  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let pathVisitedRow = [];
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false);
      pathVisitedRow.push(false);
    }
    visited.push(visitedRow);
    pathVisited.push(pathVisitedRow);
  }

  // now loop in grid for all components if any has cycle false
  // like we do for 1 to N
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === false) {
        if (
          detectCycle(graphComponentsGrid, i, j, visited, pathVisited) === true
        )
          return true;
      }
    }
  }

  // no component has cycle
  return false;
}

function detectCycle(
  graphComponentsGrid,
  srcRow,
  srcCol,
  visited,
  pathVisited
) {
  visited[srcRow][srcCol] = true;
  pathVisited[srcRow][srcCol] = true;

  // graphComponentsGrid[i][j] me dependency nodes [[1,0],[3,9],[0,4]] hogi

  for (
    let child = 0;
    child < graphComponentsGrid[srcRow][srcCol].length;
    child++
  ) {
    // [1,0],[3,9],[0,4]....
    let [nbrRid, nbrCid] = graphComponentsGrid[srcRow][srcCol][child];

    if (visited[nbrRid][nbrCid] === false) {
      if (
        detectCycle(
          graphComponentsGrid,
          nbrRid,
          nbrCid,
          visited,
          pathVisited
        ) === true
      )
        return true; // if any child gives cycle return immediately
    }
    // true in visited and pathVis ie cycle detected
    else if (pathVisited[nbrRid][nbrCid] === true) {
      return true;
    }
  }

  pathVisited[srcRow][srcCol] = false;
  return false;
}
