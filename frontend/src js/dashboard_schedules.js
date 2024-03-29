// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");

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
  modal3.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
};

let form3 = document.getElementById("form3");
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
  location.reload();
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

  await fetch("https://timetrackerx.onrender.com/works/add", {
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
  fetch("https://timetrackerx.onrender.com/works/", {
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
      localStorage.setItem("workLength", JSON.stringify(res.length));
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

    let editBtn = document.createElement("td");
    let deleteBtn = document.createElement("td");

    deleteBtn.addEventListener("click", () => {
      console.log(element._id);
      deleteschedule(element._id);
      // location.reload();
      //
    });
    editBtn.onclick = function () {
      localStorage.setItem("workID", JSON.stringify(element._id));
      modal3.style.display = "block";
    };

    description.innerText = element.description;
    workingFrom.innerText = element.workingFrom;
    startTime.innerText = element.startTime;
    endTime.innerText = element.endTime;
    duration.innerText = element.duration;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    tr.append(
      description,
      workingFrom,
      startTime,
      endTime,
      duration,

      editBtn,
      deleteBtn
    );
    body.append(tr);
  });
}

//adding new awaytimings
let reason = document.getElementById("reason");
let date = document.getElementById("date");
let startTime2 = document.getElementById("startTime2");
let endTime2 = document.getElementById("endTime2");
let form2 = document.getElementById("form2");

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  createProject1();
  // location.reload();
});

async function createProject1() {
  let data = {
    reason: reason.value,
    date: date.value,
    startTime2: startTime2.value,
    endTime2: endTime2.value,
  };
  console.log(data);

  await fetch("https://timetrackerx.onrender.com/away/add", {
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

//deleteing work schedule

function deleteschedule(workID) {
  // let noteId = noteid.value;
  // console.log(noteId);
  console.log();
  fetch(`https://timetrackerx.onrender.com/works/delete/${workID}`, {
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

//editing work schedule
let description3 = document.getElementById("description3");
let workingFrom3 = document.getElementById("workingFrom3");
let startTime3 = document.getElementById("startTime3");
let endTime3 = document.getElementById("endTime3");
let duration3 = document.getElementById("duration3");
form3.addEventListener("submit", (e) => {
  e.preventDefault();
  let workID = JSON.parse(localStorage.getItem("workID"));
  console.log(workID);
  edtschedule(workID);
  // location.reload();
});
function edtschedule(workID) {
  let data = {
    description: description3.value,
    workingFrom: workingFrom3.value,
    startTime: startTime3.value,
    endTime: endTime3.value,
    duration: duration3.value,
  };
  console.log(data);
  fetch(`https://timetrackerx.onrender.com/works/update/${workID}`, {
    method: "PATCH",
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
let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.setItem("token", "");
});
