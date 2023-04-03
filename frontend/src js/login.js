//logging in

let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser();
});

async function loginUser() {
  let data = {
    email: email.value,
    password: password.value,
  };
  console.log(data);

  await fetch("https://fancy-clam-cowboy-hat.cyclic.app/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      alert("login is successfull");
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("time", Date);
      window.location.href = "./dashboard_home.html";
    })
    .catch((err) => {
      console.log(err);
      alert("Invalid details");
    });
}
