// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1G4AyPW1VW7BxLzzhWd1Q1ZOdxWO-2HddO6S98MAJ5v0";
// sheetName is the name of the TAB in your spreadsheet
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL)
  .then((response) => response.text())
  .then((csvText) => handleResponse(csvText));

function generateTable(sheet) {
  console.log('wwww');
  const table = document.createElement("table");

  console.log(sheet);
  
  for (let i = 0, max = sheet.length; i < max; i++) {
    
    let sheetObject = sheet[i];

    console.log(sheetObject);
    let name = sheetObject['Name'];
    let position = sheetObject['Position'];
    let mail = sheetObject['mail'];
    let phone = sheetObject['Phone'];

    const tr = document.createElement("tr");
    tr.classList.add("border_bottom");

    const tdName = document.createElement("td");
    tdName.textContent = name;
    tdName.classList.add("name_field");

    const tdPosition = document.createElement("td");
    tdPosition.textContent = position;

    const tdMail = document.createElement("td");
    tdMail.textContent = mail;

    const tdPhone = document.createElement("td");
    tdPhone.textContent = phone;
    
    tr.appendChild(tdName);
    tr.appendChild(tdPosition);
    tr.appendChild(tdMail);
    tr.appendChild(tdPhone);

    table.appendChild(tr);
  }

const containerSheets = document.getElementById("container_sheets");
console.log(containerSheets);
containerSheets.appendChild(table);
}

function handleResponse(csvText) {
  console.log(csvText);
  let sheetObjects = csvToObjects(csvText);
  // sheetObjects is now an Array of Objects
  console.log(sheetObjects);

  console.log('dfdfdf');

  generateTable(sheetObjects)
}

function csvToObjects(csv) {
  const csvRows = csv.split("\n");
  const propertyNames = csvSplit(csvRows[0]);
  let objects = [];
  for (let i = 1, max = csvRows.length; i < max; i++) {
    let thisObject = {};
    let row = csvSplit(csvRows[i]);
    for (let j = 0, max = row.length; j < max; j++) {
      thisObject[propertyNames[j]] = row[j];
      // BELOW 4 LINES WILL CONVERT DATES IN THE "ENROLLED" COLUMN TO JS DATE OBJECTS
      if (propertyNames[j] === "Enrolled") {
        thisObject[propertyNames[j]] = new Date(row[j]);
      } else {
        thisObject[propertyNames[j]] = row[j];
      }
    }
    objects.push(thisObject);
  }
  return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
}

function myFunction(tr) {
  let soMany = 10;
  let name = tr.getElementsByClassName('name')[0].textContent;
  alert(`Вы нажали на кнопку! ${name}`);
}
