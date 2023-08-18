// when we move out (blur) of a cell we will store its value.
// and we'll use BLUR even becz that occurs before click and we'll lose prev cell if we use click
// so on blur (leaving) a cell we'll save its value in cellObj.

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[row_id="${i}"][col_id="${j}"]`);
    cell.addEventListener("blur", (e) => {
      // let cellObj = gridDB[i][j];
      // let enteredValue = e.target.value;
      let addressBarValue = addressBarContainer.value;
      let [cellObj, cellDom] = activateCell(addressBarValue);
      let enteredValue = cellDom.innerText;

      if (enteredValue === cellObj.value) return;

      cellObj.value = enteredValue;

      // if user changes value of a cell then if previous we had formula dependency
      // so remove formula and update currCell value and update its child accordingly
      removeParentChildRelation(cellObj.formula); // pahle ye
      cellObj.formula = "";
      // update children with nwe harcoded value since formula empty so value updated
      updateChildCells(addressBarValue);
    });
  }
}

formulaBarContainer.addEventListener("keydown", (e) => {
  let inputFormula = formulaBarContainer.value;
  if (e.key === "Enter" && inputFormula) {
    let addressBarValue = addressBarContainer.value;
    let [cellObj, cellDom] = activateCell(addressBarValue);

    // for checking dups formula and empty
    if (cellObj.formula !== inputFormula) {
      removeParentChildRelation(cellObj.formula);
    }
    // formula evaluation se pahle cycleAlgo
    addDependencyToGraph(inputFormula, addressBarValue);

    let cycleResponse = isCyclic(graphComponentsGrid); // null or [i,j]
    if (cycleResponse) {
      let response = confirm(
        "Your formula is cyclic. Do you want to trace the path"
      );

      while (response === true) {
        // keep showing color untill user stops
        detectCycleTracePath(graphComponentsGrid, cycleResponse); // [i, j]
        response = confirm(
          "Your formula is cyclic. Do you want to trace the path"
        );
      }

      removeGraphDependency(inputFormula, addressBarValue);
      // alert("Your formula has dependency and its cyclic !!!!!!");
      return;
    }

    // break prev relation and then add new Val and relation
    let evaluatedValue = evaluateFormula(inputFormula);

    // update UI and save value in cellObj.value
    setCellUIandObj(evaluatedValue, inputFormula, addressBarValue);
    // C1 = [B1 + A1] so C1's child are B1 and A1
    addParentChildRelation(inputFormula);
    // curr.obj,child,push(A1, B1)
    updateChildCells(addressBarValue);
  }
});

// for graph comps
function addDependencyToGraph(formula, address) {
  let [crid, ccid] = decodeAddress(address);
  let parentsArray = formula.split(" ");

  for (let i = 0; i < parentsArray.length; i++) {
    // Fix the loop condition here
    let ascii = parentsArray[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
      let [prow, pcol] = decodeAddress(parentsArray[i]);
      // pushing deps in that cell array which was empty
      graphComponentsGrid[prow][pcol].push([crid, ccid]);
    }
  }
}

// if formula is cyclic remove dependency from graphComponent grid
function removeGraphDependency(formula, address) {
  let parents = formula.split(" ");

  for (let i = 0; i < parents.length; i++) {
    let ascii = parents[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
      let [prid, pcid] = decodeAddress(parents[i]);
      graphComponentsGrid[prid][pcid].pop();
    }
  }
}

function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  //   [B1 = A1 + C2] so get values of A1 and C2 and evalute accordingly
  for (let i = 0; i < encodedFormula.length; i++) {
    let firstChar = encodedFormula[i].charCodeAt(0);
    // (cell formula like S2, A3 etc..)
    if (firstChar >= 65 && firstChar <= 90) {
      let [cellObj, cellDom] = activateCell(encodedFormula[i]);
      let valueOfCell = cellObj.value; // A1 value (A1+A4) - (10+20)
      encodedFormula[i] = valueOfCell;
    }
  }
  encodedFormula = encodedFormula.join(" ");

  return eval(encodedFormula);
}

function addParentChildRelation(formula) {
  // sabke aage addressBarValue as child add kara
  let childAddress = addressBarContainer.value;
  let encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    let firstChar = encodedFormula[i].charCodeAt(0);
    // (cell formula like S2, A3 etc..)
    if (firstChar >= 65 && firstChar <= 90) {
      // parentObj .push (childAddress) that is dependent ie child
      let [cellObj] = activateCell(encodedFormula[i]);

      cellObj.children.push(childAddress);
      console.log(cellObj.children);
      // console.log(gridDB);
    }
  }
}

// dependency update
function updateChildCells(parentAddress) {
  let [parentCObj, parentDom] = activateCell(parentAddress);
  let children = parentCObj.children;

  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childObj, childDom] = activateCell(childAddress);
    let childFormula = childObj.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setCellUIandObj(evaluatedValue, childFormula, childAddress);

    // lets say B1 child is updated now call for B1's child
    updateChildCells(childAddress);
  }
  return;
}

// when user enters new formula for used cell then ?
// break prev parentChild relation and build new

function removeParentChildRelation(oldFormula) {
  // oldFormula se relation break hoga
  let childAddress = addressBarContainer.value;
  let encodedFormula = oldFormula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    let firstChar = encodedFormula[i].charCodeAt(0);
    // (cell formula like S2, A3 etc..)
    if (firstChar >= 65 && firstChar <= 90) {
      // parentObj .push (childAddress) that is dependent ie child
      let [parentCellObj] = activateCell(encodedFormula[i]);

      //   cellObj.children.length = 0;     pura khali ho jaega (1hr bug)
      let idx = parentCellObj.children.indexOf(childAddress);
      parentCellObj.children.splice(idx, 1);
      //   console.log(cellObj.children);
    }
  }
}

// making generic by passing address
function setCellUIandObj(evaluatedValue, formula, addressBarValue) {
  // let addressBarValue = addressBarContainer.value;
  let [cellObj, cellDom] = activateCell(addressBarValue);

  // data update
  cellObj.value = evaluatedValue;
  cellObj.formula = formula;

  cellDom.innerText = evaluatedValue;
}
