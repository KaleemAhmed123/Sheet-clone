// console.log("Checking .......");

let row = 100,
  col = 26;

// creating numbering column
const colNameContainer = document.querySelector(".col-name-cont");
for (let i = 0; i < row; i++) {
  const colNumCell = document.createElement("div");
  colNumCell.classList.add("col-num-cell");
  colNumCell.innerText = i + 1;

  colNameContainer.appendChild(colNumCell);
}
// creating ABCD.. rowLabels
const rowNameContainer = document.querySelector(".row-name-cont");
for (let i = 0; i < col; i++) {
  const rowNumCell = document.createElement("div");
  rowNumCell.classList.add("row-num-cell");
  rowNumCell.innerText = String.fromCharCode(65 + i);

  rowNameContainer.appendChild(rowNumCell);
}

// grid cells all
const gridCellsContainer = document.querySelector(".cells-cont");
for (let i = 0; i < row; i++) {
  const individRow = document.createElement("div");
  individRow.setAttribute("class", "ind-row");
  for (let j = 0; j < col; j++) {
    const cells = document.createElement("div");
    cells.setAttribute("class", "cell");
    cells.setAttribute("contenteditable", "true");
    individRow.appendChild(cells);
  }

  gridCellsContainer.appendChild(individRow);
}
