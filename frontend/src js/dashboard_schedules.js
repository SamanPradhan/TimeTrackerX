// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("another");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
btn2.onclick = function () {
  modal2.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
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

//getting the work schedules

let body = document.getElementById("tbody");
showProducts();
function showProducts() {
  fetch("http://localhost:4500/works/", {
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
    let description = document.createElement("td");
    let workingFrom = document.createElement("td");
    let startTime = document.createElement("td");
    let endTime = document.createElement("td");
    let duration = document.createElement("td");
    let workId = document.createElement("td");

    description.innerText = element.description;
    workingFrom.innerText = element.workingFrom;
    startTime.innerText = element.startTime;
    endTime.innerText = element.endTime;
    duration.innerText = element.duration;
    workId.innerText = element._id;
    tr.append(description, workingFrom, startTime, endTime, duration, workId);
    body.append(tr);
  });
}

// let deleteBtn = document.getElementById("deleteBtn");

// deleteBtn.addEventListener("click", () => {
//   deleteNotes();

//   function deleteNotes() {
//     // let noteId = noteid.value;
//     // console.log(noteId);
//     console.log();
//     fetch(`http://localhost:4500/works/delete/${workID}`, {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `${localStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         alert(JSON.stringify(res.msg));
//       })
//       .catch((err) => console.log(err));
//   }
// });

//adding new awaytimings
let reason = document.getElementById("reason");
let date = document.getElementById("date");
let startTime2 = document.getElementById("startTime2");
let endTime2 = document.getElementById("endTime2");
let form2 = document.getElementById("form2");

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  createProject1();
});

async function createProject1() {
  let data = {
    reason: reason.value,
    date: date.value,
    startTime2: startTime2.value,
    endTime2: endTime2.value,
  };
  console.log(data);

  await fetch("http://localhost:4500/away/add", {
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
      alert(JSON.stringify(res.msg));
    })
    .catch((err) => console.log(err));
}
