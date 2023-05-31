const rootElement = document.getElementById("root");

const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

function searchRows() {
    let input = document.getElementById("searchInput");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("myTable");
    let rows = table.getElementsByTagName("tr");
  
    for (let i = 1; i < rows.length; i++) {
      let display = false;
      let cells = rows[i].getElementsByTagName("td");
  
      for (let j = 0; j < cells.length; j++) {
        let cell = cells[j];
        let cellValue = cell.textContent || cell.innerText;
  
        if (cellValue.toLowerCase().indexOf(filter) > -1) {
          display = true;
          break;
        }
      }
  
      rows[i].style.display = display ? "" : "none";
    }
  }

function deleteRow (rec) {
    let table = document.getElementById("myTable");
    table.deleteRow(rec)
}

function editRow() {

}

function selectAllRows() {
    let table = document.getElementById("myTable");
    let rowCount = table.rows.length;
  
    let checkbox = table.rows[0].cells[0].getElementsByTagName("input")[0];
    
    let isSelected = checkbox.checked;
  
    for (let i = 1; i < rowCount; i++) {
      let row = table.rows[i];
      let rowCheckbox = row.cells[0].getElementsByTagName("input")[0];
      rowCheckbox.checked = isSelected;
    }
}

function deleteSelectedRows() {
    let table = document.getElementById("myTable");
    let rowCount = table.rows.length;

    for (let i = rowCount - 1; i > 0; i--) {
        let row = table.rows[i];
        let checkbox = row.cells[0].getElementsByTagName("input")[0];

        if (checkbox.checked) {
            table.deleteRow(i);
        }
    }
}

const getMembers = async () => {
    try {
        var response = await fetch(url);
        var members = await response.json();
        for(let member of members) {
            rootElement.innerHTML += `
            <tr id=${member.id}>
                <th scope="row"><input type="checkbox" ></th>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.role}</td>
                <td><button class="editButton" onclick=editRow()>Edit</button><button class="deleteButton" onclick=deleteRow(${member.id})>Delete</button></td>
            </tr>
            `
        }
    } catch (e) {
        return null
    }
}

getMembers()





