//getting new Product

let body = document.getElementById("tbody");
showProducts();
function showProducts() {
  fetch("http://localhost:4500/users/", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      display(res);
    })
    .catch((err) => console.log(err));
}

function display(data) {
  body.innerHTML = "";

  data.forEach((element) => {
    let tr = document.createElement("tr");
    let email = document.createElement("td");
    let productiveTime = document.createElement("td");
    let arrivedAt = document.createElement("td");
    let leftAt = document.createElement("td");
    let work = document.createElement("td");
    let adtiveProject = document.createElement("td");

    email.innerText = element.email;
    productiveTime.innerText = 0;
    arrivedAt.innerText = "11:00";
    leftAt.innerText = "NA";
    work.innerText = true;
    adtiveProject.innerText = "NA";
    tr.append(email, productiveTime, arrivedAt, leftAt, work, adtiveProject);
    body.append(tr);
  });
}

let deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", () => {
  deleteNotes();

  function deleteNotes() {
    // let noteId = noteid.value;
    // console.log(noteId);
    console.log();
    fetch(`http://localhost:4500/projects/delete/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert(JSON.stringify(res.msg));
      })
      .catch((err) => console.log(err));
  }
});
