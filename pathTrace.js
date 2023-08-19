// for delay and waiting
function colorPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 1000);
  });
}

async function traceCyclePath(graphComponentsGrid, cycleResponse) {
  let [srcRow, srcCol] = cycleResponse;

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

  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       if (visited[i][j] === false) {
  //         if (
  //           detectCycle(graphComponentsGrid, i, j, visited, pathVisited) === true
  //         )
  //           return true;
  //       }
  //     }
  //   }
  // call where we got cycle
  let response = await detectCycleTracePath(
    graphComponentsGrid,
    srcRow,
    srcCol,
    visited,
    pathVisited
  );
  if (response === true) {
    return Promise.resolve(true);
  }

  return Promise.resolve(false);
}

async function detectCycleTracePath(
  graphComponentsGrid,
  srcRow,
  srcCol,
  visited,
  pathVisited
) {
  visited[srcRow][srcCol] = true;
  pathVisited[srcRow][srcCol] = true;

  let cell = document.querySelector(
    `.cell[row_id="${srcRow}"][col_id="${srcCol}"]`
  );

  cell.style.backgroundColor = "lightblue";
  await colorPromise(); // will resolve after 1sec (our pause delay) and then next line

  // graphComponentsGrid[i][j] me dependency nodes [[1,0],[3,9],[0,4]] hogi

  for (
    let child = 0;
    child < graphComponentsGrid[srcRow][srcCol].length;
    child++
  ) {
    // [1,0],[3,9],[0,4]....
    let [nbrRid, nbrCid] = graphComponentsGrid[srcRow][srcCol][child];

    if (visited[nbrRid][nbrCid] === false) {
      let response = await detectCycleTracePath(
        graphComponentsGrid,
        nbrRid,
        nbrCid,
        visited,
        pathVisited
      );
      if (response === true) {
        // 1->2->3->4->5->1 we got cycle at 1 now al 5 4 3 2 will return true by going back
        // so here we remove our blue color from background
        cell.style.backgroundColor = "transparent";
        await colorPromise(); /// 1sec pause
        return Promise.resolve(true);
      }
    } else if (pathVisited[nbrRid][nbrCid] === true) {
      let cyclicCell = document.querySelector(
        `.cell[row_id="${nbrRid}"][col_id="${nbrCid}"]`
      );
      // orange indicator of going back
      cyclicCell.style.backgroundColor = "lightsalmon";
      await colorPromise(); /// 1sec pause
      cyclicCell.style.backgroundColor = "transparent";

      // cyclicCell.style.backgroundColor = "transparent";
      // prev jaha se call kiya tha us blue ko reset
      cell.style.backgroundColor = "transparent";

      await colorPromise();

      return Promise.resolve(true);
    }
  }

  pathVisited[srcRow][srcCol] = false;

  return Promise.resolve(false);
}
