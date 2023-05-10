const rootElement = document.getElementById("root");

const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

const getMembers = async () => {
    try {
        var response = await fetch(url);
        var members = await response.json();
        for(let member of members) {
            rootElement.innerHTML += `
            <tr id=${member.id}>
                <th scope="row">${member.id}</th>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.role}</td>
                <td><button class="button" onclick=deleteRow(${member.id})>Delete</button></td>
            </tr>
            `
        }
    } catch (e) {
        console.log(e)
    }
}

getMembers()

function deleteRow (rec) {
    const rowEl = document.getElementById(rec)
    rowEl.style.display = "none"
}



