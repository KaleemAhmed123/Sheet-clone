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
});
