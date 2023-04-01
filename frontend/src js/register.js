// $(document).ready(function () {
//   var capteraSplideSlider = document.getElementById("capteraSplideSlider");
//   var capteraSlider = new Splide("#capteraSlider", {
//     type: "loop",
//     perMove: 1,
//     perPage: 1,
//     dots: false,
//     focus: "center",
//     autoplay: false,
//     pagination: false,
//     classes: {
//       prev: "splide__arrow--prev dt-icon-arrow-back-1 dt-icon__size--32 text-white",
//       next: "splide__arrow--next dt-icon-arrow-forward-1 dt-icon__size--32 text-white",
//     },
//   });

//   capteraSlider.on("mounted", function () {
//     capteraSplideSlider.classList.remove("d-none");
//   });

//   capteraSlider.mount();

//   $("form").on("submit", function () {
//     $(this)
//       .find("button[type=submit]")
//       .prop("disabled", true)
//       .addClass("disabled");
//   });

//   removeErrorOnType(document.querySelector(".auth-form"));
// });

//registering

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

  await fetch("http://localhost:4500/users/register", {
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
