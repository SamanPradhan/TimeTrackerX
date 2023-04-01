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
