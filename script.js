const sheetId = "19VumD-Hj9-RW0uAWvSBzcZUXbr-ICAiE7lJult_Koug";
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}&range=A1:D`;

fetch(sheetURL)
  .then((response) => response.text())
  .then((csvText) => handleResponse(csvText));

function generateTable(sheet) {
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
    tr.setAttribute("onclick", "myFunction(this)");

    const tdName = document.createElement("td");
    tdName.appendChild(document.createTextNode(name));
    tdName.classList.add("name_field");

    const tdPosition = document.createElement("td");
    tdName.appendChild(document.createTextNode(position));

    const tdMail = document.createElement("td");
    tdName.appendChild(document.createTextNode(mail));

    const tdPhone = document.createElement("td");
    tdName.appendChild(document.createTextNode(phone));

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
  console.log(sheetObjects);
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
  let name = tr.getElementsByClassName('name')[0].text;
  let position = tr.getElementsByClassName('position')[0].text;
  let mail = tr.getElementsByClassName('mail')[0].text;
  let phone = tr.getElementsByClassName('phone')[0].text;
  alert(`Вы нажали на кнопку! ${name}  ${position}  ${mail}  ${phone}`);
}
