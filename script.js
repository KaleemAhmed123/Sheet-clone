// console.log("Checking .......");

let rows = 100,
  cols = 26;

// creating numbering column
const colNameContainer = document.querySelector(".col-name-cont");
for (let i = 0; i < rows; i++) {
  const colNumCell = document.createElement("div");
  colNumCell.classList.add("col-num-cell");
  colNumCell.innerText = i + 1;

  colNameContainer.appendChild(colNumCell);
}
// creating ABCD.. rowLabels
const rowNameContainer = document.querySelector(".row-name-cont");
for (let i = 0; i < cols; i++) {
  const rowNumCell = document.createElement("div");
  rowNumCell.classList.add("row-num-cell");
  rowNumCell.innerText = String.fromCharCode(65 + i);

  rowNameContainer.appendChild(rowNumCell);
}

// grid cells all [100][26]
const gridCellsContainer = document.querySelector(".cells-cont");
for (let i = 0; i < rows; i++) {
  const individRow = document.createElement("div");
  individRow.setAttribute("class", "ind-row");
  for (let j = 0; j < cols; j++) {
    const cells = document.createElement("div");
    cells.setAttribute("class", "cell");
    cells.setAttribute("contenteditable", "true");
    cells.setAttribute("spellcheck", "false");
    // for accessing specific grid cell
    cells.setAttribute("row_id", i);
    cells.setAttribute("col_id", j);
    individRow.appendChild(cells);

    // event for address bar c2, b4 etc
    attachListener(cells, i, j);
  }

  gridCellsContainer.appendChild(individRow);
}

// address bar which tell about rowAndCol num eg C2, F30 etc..
const addressBarContainer = document.querySelector(".address-bar");
function attachListener(cells, i, j) {
  cells.addEventListener("click", (e) => {
    // addressBarContainer.innerText = `${String.fromCharCode(j)}${i + 1}`;
    // input type hai
    addressBarContainer.value = `${String.fromCharCode(65 + j)}${i + 1}`;

    e.preventDefault();
  });
}
// default first select (else address bar will be empty)
const firstCell = document.querySelector(".cell");
firstCell.click();
