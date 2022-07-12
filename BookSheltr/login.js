"use strict";

const elForm = document.querySelector(".form");
const elUsernameInput = document.querySelector(".inp-email");
const elPasswordInput = document.querySelector(".inp-password");

elForm.addEventListener("submit", function (evn) {
  evn.preventDefault();
  const usernameInput = elUsernameInput.value;
  const passwordInput = elPasswordInput.value;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usernameInput,
      password: passwordInput,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        window.location.replace("index.html");
      } else {
        alert("Login yoki Parol notog'ri kiritilgan!");
      }
    });
});
