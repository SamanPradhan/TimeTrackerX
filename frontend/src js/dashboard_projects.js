let totalApicount = document.getElementById("totalApicount");
let NewlyAdd = document.getElementById("NewlyAdd");
let TotalEdited = document.getElementById("TotalEdited");
let TotalDelete = document.getElementById("TotalDelete");

let deleteItem = JSON.parse(localStorage.getItem("deleteItem")) || 0;
let edititem = JSON.parse(localStorage.getItem("edititem")) || 0;
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
var modal2 = document.getElementById("myModal2");

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
  location.reload();
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
  fetch("https://fancy-clam-cowboy-hat.cyclic.app/projects/", {
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
      localStorage.setItem("itemLength", JSON.stringify(res.length));
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

    pname.innerText = element.projectName;
    perhrcharge.innerText = element.perHourCharge;
    estimatecosting.innerText = element.estimateCost;
    estimateTimetake.innerText = element.estimateTime;
    noteIdprint.innerText = element._id;
    editBtn.innerText = "edit";
    deleteBtn.innerText = "delete";
    // deleteBtn.setAttribute("class", "dlt");
    // let delbtn = document.querySelector("dlt");

    deleteBtn.addEventListener("click", () => {
      console.log(JSON.stringify(element._id));
      deleteNotes(element._id);
      deleteItem++;
      localStorage.setItem("deleteItem", JSON.stringify(deleteItem));
      location.reload();
    });
    editBtn.onclick = function () {
      localStorage.setItem("projectID", JSON.stringify(element._id));
      modal2.style.display = "block";
    };

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

function deleteNotes(projectID) {
  fetch(
    `https://fancy-clam-cowboy-hat.cyclic.app/projects/delete/${projectID}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert(JSON.stringify(res.msg));
    })
    .catch((err) => console.log(err));
}
// });

//editng projects

let projectName2 = document.getElementById("projectName2");
let perHourCharge2 = document.getElementById("perHourCharge2");
let estimateCost2 = document.getElementById("estimateCost2");
let estimateTime2 = document.getElementById("estimateTime2");
let form2 = document.getElementById("form2");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  let projectID = JSON.parse(localStorage.getItem("projectID"));
  console.log(projectID);
  edtschedule(projectID);
  edititem++;
  localStorage.setItem("edititem", JSON.stringify(edititem));

  // location.reload();
});
function edtschedule(projectID) {
  let data = {
    projectName: projectName2.value,
    perHourCharge: perHourCharge2.value,
    estimateCost: estimateCost2.value,
    estimateTime: estimateTime2.value,
  };
  console.log(data);
  fetch(
    `https://fancy-clam-cowboy-hat.cyclic.app/projects/update/${projectID}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert(JSON.stringify(res.msg));
    })
    .catch((err) => console.log(err));
}
totalApicount.innerText = JSON.parse(localStorage.getItem("itemLength"));
TotalEdited.innerText = JSON.parse(localStorage.getItem("edititem"));
TotalDelete.innerText = JSON.parse(localStorage.getItem("deleteItem"));
// totalApicount.innerText = JSON.parse(localStorage.getItem("itemLength"));
