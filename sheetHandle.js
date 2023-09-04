let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetFoldersCont = document.querySelector(".sheet-folders-cont");

addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");
  //   sheet.classList.add("sheet-folder");

  let allSheetsFolder = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetsFolder.length);

  sheet.innerHTML = `<div class="sheet-content">sheet ${
    allSheetsFolder.length + 1
  }</div>`;

  sheetFoldersCont.appendChild(sheet);

  // for each sheet newGridDB and grapgDB
  createSheetDB();
  createGraphCompMatrix();
});

function handleSheetDB(sheetNum) {
  sheetDB = collectedSheetDB[sheetNum];
  graphComponentsGrid = collectedGraphComponentGrid[sheetNum];
}

function handelSheetPropertiesValue() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`.cell[row_id="${i}"][col_id="${j}"]`);
      cell.click();
    }
  }
  // whenever new sheet click on first
  const firstCell = document.querySelector(".cell");
  firstCell.click();
}

function handleSheetUIActive(sheet) {
  let allSheetsFolder = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetsFolder.length; i++) {
    allSheetsFolder[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetNumber = sheet.getAttribute("id");
    handleSheetDB(sheetNumber);

    handelSheetPropertiesValue();
    handleSheetUIActive(sheet);
  });
}

function createSheetDB() {
  const gridDB = [];

  for (let i = 0; i < rows; i++) {
    const rowDB = [];
    for (let j = 0; j < cols; j++) {
      const ds = {
        fontFamily: "monospace",
        fontSize: 14,
        bold: false,
        underline: false,
        italic: false,
        align: "left",
        textColor: "#000000",
        BGcolor: "#69376d", // 'indicator (rare color)

        value: "",
        formula: "",
        children: [],
      };
      // push cell obj in row
      rowDB.push(ds);
    }
    gridDB.push(rowDB);
  }
}

function createGraphCompMatrix() {
  let graphComponentsGrid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      // is empty array me deps hongi
      row.push([]); // will push etc [[0,1], [2,3]]
    }
    graphComponentsGrid.push(row);
  }
}
