// function recaptchaScript() {
//     var recaptcha_token_input = document.getElementById("recaptcha_token");

//     if (recaptcha_token_input) {
//         var recaptcha_script = document.createElement('script');
//         recaptcha_script.onload = function () {
//             grecaptcha.ready(function () {
//                 function recaptcha_execute(callback) {
//                     grecaptcha.execute('6LfiRpkUAAAAAEIOzxFzW9Ftvd5xXeYQ05nTYNIS', { action: 'homepage' }).then(function (token) {
//                         recaptcha_token_input.value = token;
//                         callback();
//                     });
//                 }

//                 function recaptcha_timeout() {
//                     setTimeout(function () {
//                         recaptcha_execute(function () {
//                             recaptcha_timeout();
//                         });
//                     }, 1000 * 60 * 6);
//                 }

//                 recaptcha_execute(function () {
//                     recaptcha_timeout();
//                 });
//             });
//         };

//         recaptcha_script.src = "https://www.google.com/recaptcha/api.js?render=6LfiRpkUAAAAAEIOzxFzW9Ftvd5xXeYQ05nTYNIS";

//         document.head.appendChild(recaptcha_script);
//     }
// }

// recaptchaScript();
// $(document).on('shown.bs.modal', function () {
//     recaptchaScript();
// });

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

  await fetch("http://localhost:4500/users/login", {
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
      window.location.href = "./dashboard_home.html";
    })
    .catch((err) => console.log(err));
}
