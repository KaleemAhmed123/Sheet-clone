function traceCyclePath(graphComponentsGrid, cycleResponse) {
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

  let response = detectCycleTracePath(
    graphComponentsGrid,
    srcRow,
    srcCol,
    visited,
    pathVisited
  );
  if (response === true) {
    return true;
  }

  return false;
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

  let cell = document.querySelectorAll(
    `.cell[row_id="${srcRow}"][col_id="${srcCol}"]`
  );

  cell.style.background = "lightblue";
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
      if (
        detectCycle(
          graphComponentsGrid,
          nbrRid,
          nbrCid,
          visited,
          pathVisited
        ) === true
      ) {
        // 1->2->3->4->5->1 we got cycle at 1 now al 5 4 3 2 will return true by going back
        // so here we remove our blue color from background
        cell.style.background = "lightblue";
        await colorPromise(); /// 1sec pause
        return true;
      }
    } else if (pathVisited[nbrRid][nbrCid] === true) {
      let cyclicCell = document.querySelectorAll(
        `.cell[row_id="${nbrRid}"][col_id="${nbrCid}"]`
      );
      // orange indicator of going back
      cyclicCell.style.background = "lightsalmon";
      await colorPromise(); /// 1sec pause
      cyclicCell.style.background = "tranparent";
      await colorPromise();

      return true;
    }
  }

  pathVisited[srcRow][srcCol] = false;
  return false;
}

function colorPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 1000);
  });
}
