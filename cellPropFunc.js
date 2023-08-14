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

let activeColor = "#c2c8cf";
let inactiveColor = "#dbe1e9";
// icon selectors

const boldIcon = document.querySelector(".bold");
const underlineIcon = document.querySelector(".underline");
const italicIcon = document.querySelector(".italic");
const alignmentIcons = document.querySelectorAll(".align");
const [leftAlignIcon, centerAlignIcon, rightAlignIcon] = alignmentIcons;

const fontSizeInput = document.querySelector(".font-size");
const fontFamilyInput = document.querySelector(".font-family");
const fontColorInput = document.querySelector(".text-color");
const BGColorInput = document.querySelector(".BG-color");

// adding property listener
// we need access of that active cell on which we click bold, align, ...
// addrees bar me row, col id hai like A1, F4 etc will decode it
// and then with that rowId and colId we'll access gridDB
boldIcon.addEventListener("click", (e) => {
  let addressBarValue = addressBarContainer.value;
  // it returns cellDom, cellObj (gridDB[i][j])
  let [cellObj, cellDom] = activateCell(addressBarValue);

  // access to cell ds in gridDB
  cellObj.bold = !cellObj.bold; // data change
  cellDom.style.fontWeight = cellObj.bold ? "bold" : "normal"; // cell prop change
  boldIcon.style.backgroundColor = cellObj.bold ? activeColor : inactiveColor; // icon UI change
});

underlineIcon.addEventListener("click", (e) => {
  let addressBarValue = addressBarContainer.value;
  // it returns cellDom, cellObj (gridDB[i][j])
  let [cellObj, cellDom] = activateCell(addressBarValue);

  // access to cell ds in gridDB
  cellObj.underline = !cellObj.underline; // data change
  cellDom.style.textDecoration = cellObj.underline ? "underline" : "none"; // cell prop change
  underlineIcon.style.backgroundColor = cellObj.underline
    ? activeColor
    : inactiveColor; // icon UI change
});

italicIcon.addEventListener("click", (e) => {
  let addressBarValue = addressBarContainer.value;
  // it returns cellDom, cellObj (gridDB[i][j])
  let [cellObj, cellDom] = activateCell(addressBarValue);

  // access to cell ds in gridDB
  cellObj.italic = !cellObj.italic; // data change
  cellDom.style.fontStyle = cellObj.italic ? "italic" : "normal"; // cell prop change
  italicIcon.style.backgroundColor = cellObj.italic
    ? activeColor
    : inactiveColor; // icon UI change
});

fontSizeInput.addEventListener("change", (e) => {
  let addressBarValue = addressBarContainer.value;
  // it returns cellDom, cellObj (gridDB[i][j])
  let [cellObj, cellDom] = activateCell(addressBarValue);

  // access to cell ds in gridDB
  cellObj.fontSize = fontSizeInput.value; // data change
  cellDom.style.fontSize = cellObj.fontSize + "px"; // cell prop change
  fontSizeInput.value = cellObj.fontSize;
});

fontFamilyInput.addEventListener("change", (e) => {
  let addressBarValue = addressBarContainer.value;
  // it returns cellDom, cellObj (gridDB[i][j])
  let [cellObj, cellDom] = activateCell(addressBarValue);

  // access to cell ds in gridDB
  cellObj.fontFamily = fontFamilyInput.value; // data change
  cellDom.style.fontFamily = cellObj.fontFamily; // UI change with data
  fontFamilyInput.value = cellObj.fontFamily;
});

fontColorInput.addEventListener("change", (e) => {
  let addressBarValue = addressBarContainer.value;
  // it returns cellDom, cellObj (gridDB[i][j])
  let [cellObj, cellDom] = activateCell(addressBarValue);

  // access to cell ds in gridDB
  cellObj.textColor = fontColorInput.value; // data change
  cellDom.style.color = cellObj.textColor; // UI change with data
  fontColorInput.value = cellObj.textColor;
});

BGColorInput.addEventListener("change", (e) => {
  let addressBarValue = addressBarContainer.value;
  // it returns cellDom, cellObj (gridDB[i][j])
  let [cellObj, cellDom] = activateCell(addressBarValue);

  // access to cell ds in gridDB
  cellObj.BGcolor = BGColorInput.value; // data change
  cellDom.style.backgroundColor = cellObj.BGcolor; // UI change with data
  BGColorInput.value = cellObj.BGcolor;
});

alignmentIcons.forEach((alignElm) => {
  alignElm.addEventListener("click", (e) => {
    let addressBarValue = addressBarContainer.value;
    // it returns cellDom, cellObj (gridDB[i][j])
    let [cellObj, cellDom] = activateCell(addressBarValue);

    let alignVal = e.target.classList[2];
    cellObj.align = alignVal; // data change
    cellDom.style.textAlign = cellObj.align;

    switch (alignVal) {
      case "left":
        leftAlignIcon.style.backgroundColor = activeColor;
        centerAlignIcon.style.backgroundColor = inactiveColor;
        rightAlignIcon.style.backgroundColor = inactiveColor;
        break;
      case "center":
        leftAlignIcon.style.backgroundColor = inactiveColor;
        centerAlignIcon.style.backgroundColor = activeColor;
        rightAlignIcon.style.backgroundColor = inactiveColor;
        break;
      case "right":
        leftAlignIcon.style.backgroundColor = inactiveColor;
        centerAlignIcon.style.backgroundColor = inactiveColor;
        rightAlignIcon.style.backgroundColor = activeColor;
        break;
    }
  });
});

// if we are at cell A2 and got to A3 all the properties of A1 (icon UI) will be visible
// becz there is not listener for cell prop to get prop of that cell to be reflected

let allCells = document.querySelectorAll(".cell");

// "touchstart"
for (let i = 0; i < allCells.length; i++) {
  updateCellAndUiwithObj(allCells[i]);
}

function updateCellAndUiwithObj(cell) {
  cell.addEventListener("click", (e) => {
    // cellObj ka access nahi hai only cellDOm ka access hai so
    let addressBarValue = addressBarContainer.value;
    let [rid, cid] = decodeAddress(addressBarValue);

    cellObj = gridDB[rid][cid]; // access to obj

    // updating cell properties
    cell.style.fontWeight = cellObj.bold ? "bold" : "normal"; // cell prop change
    cell.style.textDecoration = cellObj.underline ? "underline" : "none"; // cell prop change
    cell.style.fontStyle = cellObj.italic ? "italic" : "normal"; // cell prop change
    cell.style.fontSize = cellObj.fontSize + "px"; // cell prop change
    cell.style.fontFamily = cellObj.fontFamily; // UI change with data
    cell.style.color = cellObj.textColor; // UI change with data
    cell.style.backgroundColor =
      cellObj.BGcolor === "#69376d" ? "transparent" : cellObj.BGcolor; // UI change with data

    cell.style.textAlign = cellObj.align; // UI change with data

    // now getting icon UI according to cellObj (what matters)
    boldIcon.style.backgroundColor = cellObj.bold ? activeColor : inactiveColor; // icon UI change
    underlineIcon.style.backgroundColor = cellObj.underline
      ? activeColor
      : inactiveColor; // icon UI change
    italicIcon.style.backgroundColor = cellObj.italic
      ? activeColor
      : inactiveColor; // icon UI change
    fontSizeInput.value = cellObj.fontSize;
    fontFamilyInput.value = cellObj.fontFamily;
    fontColorInput.value = cellObj.textColor;
    BGColorInput.value = cellObj.BGcolor;
    switch (cellObj.align) {
      case "left":
        leftAlignIcon.style.backgroundColor = activeColor;
        centerAlignIcon.style.backgroundColor = inactiveColor;
        rightAlignIcon.style.backgroundColor = inactiveColor;
        break;
      case "center":
        leftAlignIcon.style.backgroundColor = inactiveColor;
        centerAlignIcon.style.backgroundColor = activeColor;
        rightAlignIcon.style.backgroundColor = inactiveColor;
        break;
      case "right":
        leftAlignIcon.style.backgroundColor = inactiveColor;
        centerAlignIcon.style.backgroundColor = inactiveColor;
        rightAlignIcon.style.backgroundColor = activeColor;
        break;
    }
  });
}

// generic
function activateCell(addressBarValue) {
  let [rowId, colId] = decodeAddress(addressBarValue);
  // access cell and storage object
  let cellObj = gridDB[rowId][colId];
  let cellDom = document.querySelector(
    `.cell[row_id="${rowId}"][col_id="${colId}"]`
  );

  return [cellObj, cellDom];
}

function decodeAddress(addressBarValue) {
  let rowId = Number(addressBarValue.slice(1) - 1); // Extract numeric part of the address and subtract 1 to get column index
  let colId = Number(addressBarValue.charCodeAt(0)) - 65; // Convert character to ASCII code and subtract 65 to get row index

  return [rowId, colId];
}
