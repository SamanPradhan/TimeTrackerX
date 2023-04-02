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

//adding new work schedules
let description = document.getElementById("description");
let workingFrom = document.getElementById("workingFrom");
let startTime = document.getElementById("startTime");
let endTime = document.getElementById("endTime");
let duration = document.getElementById("duration");
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createProject();
});

async function createProject() {
  let data = {
    description: description.value,
    workingFrom: workingFrom.value,
    startTime: startTime.value,
    endTime: endTime.value,
    duration: duration.value,
  };
  console.log(data);

  await fetch("http://localhost:4500/works/add", {
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
      alert("New Work Schedule is created");
    })
    .catch((err) => console.log(err));
}
