let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
};

let Admin_data = JSON.parse(localStorage.getItem("admin_data"));

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//adding new project
let projectName = document.getElementById("projectName");
let perHourCharge = document.getElementById("perHourCharge");
let estimateCost = document.getElementById("estimateCost");
let estimateTime = document.getElementById("estimateTime");
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createProject();
});

async function createProject() {
  let data = {
    projectName: projectName.value,
    perHourCharge: perHourCharge.value,
    estimateCost: estimateCost.value,
    estimateTime: estimateTime.value,
  };
  console.log(data);

  await fetch("http://localhost:4500/projects/add", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert("New Project is created");
    })
    .catch((err) => console.log(err));
}

//getting new Product

let body = document.getElementById("tbody");
showProducts();
function showProducts() {
  fetch("http://localhost:4500/projects/", {
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
    let pname = document.createElement("td");
    let perhrcharge = document.createElement("td");
    let estimatecosting = document.createElement("td");
    let estimateTimetake = document.createElement("td");
    let noteIdprint = document.createElement("td");
    let editBtn = document.createElement("td");
    let deleteBtn = document.createElement("td");
    // deleteBtn.addEventListener("click", () => {
    //   data = data.filter((ele) => {
    //     console.log(element);
    //     return ele.id !== element.id;
    //   });
    //   // localStorage.setItem("data", JSON.stringify(CartArr));
    //   display(data);
    //   alert("The Project is deleted");
    // });
    pname.innerText = element.projectName;
    perhrcharge.innerText = element.perHourCharge;
    estimatecosting.innerText = element.estimateCost;
    estimateTimetake.innerText = element.estimateTime;
    noteIdprint.innerText = element._id;
    editBtn.innerText = "edit";
    deleteBtn.innerText = "delete";
    deleteBtn.setAttribute("id", "deleteBtn");
    tr.append(
      pname,
      perhrcharge,
      estimatecosting,
      estimateTimetake,
      noteIdprint,
      editBtn,
      deleteBtn
    );
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
