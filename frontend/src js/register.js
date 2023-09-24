let email = document.getElementById("email");
let password = document.getElementById("password");
let companyName = document.getElementById("companyName");
let phoneNo = document.getElementById("phoneNo");
let designation = document.getElementById("designation");
let companyIndustry = document.getElementById("companyIndustry");
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  registerUser();
});

async function registerUser() {
  let data = {
    email: email.value,
    password: password.value,
    companyName: companyName.value,
    phoneNo: phoneNo.value,
    designation: designation.value,
    companyIndustry: companyIndustry.value,
  };
  console.log(data);

  await fetch("https://timetrackerx.onrender.com/users/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert("registration is successfull");
    })
    .catch((err) => console.log(err));
}
