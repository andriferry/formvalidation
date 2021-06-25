let form = document.getElementsByClassName("form");
let name = document.getElementById("name");
let input = document.querySelectorAll("input");
let errorMessage = document.querySelectorAll("small");
let btnSubmit = document.querySelector("button");

//Check required
function checkRequired(value) {
  ErrorMessage([value], `${value.id} is required`);
}

//Check Length
function checkLength(inputElement, min, max) {
  if (inputElement.value.length === 0) {
    checkRequired(inputElement);
  } else if (inputElement.value.length < min) {
    ErrorMessage(
      [inputElement],
      `${inputElement.id} at least ${min} character`
    );
  } else if (inputElement.value.length > max) {
    ErrorMessage(
      [inputElement],
      `${inputElement.id} Must Be A Less Than ${max} character`
    );
  } else {
    successMessage([inputElement]);
  }
}

//Password Match
function passwordMatch() {
  if (input[2].value && input[3].value !== "") {
    if (input[2].value !== input[3].value) {
      ErrorMessage([input[2], input[3]], `${input[2].id} is Do not match`);
    } else {
      successMessage([input[2], input[3]]);
    }
  }
}

//Email Required
function emailInput(inputElement) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const email = emailRegex.test(
    String(inputElement.value).toLowerCase().trim()
  );

  if (inputElement.type === "email") {
    email
      ? successMessage([inputElement])
      : ErrorMessage([inputElement], `${inputElement.id} is not validate`);
  }
}

//Error Message
function ErrorMessage(element, message) {
  element.forEach((item) => {
    let error = item.nextElementSibling;

    error.classList.remove("hidden");
    error.textContent = message;

    if (item.classList.contains("border-green-500")) {
      item.classList.replace("border-green-500", "border-red-500");
    } else {
      item.classList.replace("border-gray-200", "border-red-500");
    }
  });
}

//Success Message
function successMessage(element) {
  element.forEach((item) => {
    let error = item.nextElementSibling;

    if (error.classList.contains("hidden")) {
      item.classList.replace("border-gray-200", "border-green-500");
    } else {
      error.classList.add("hidden");
      item.classList.replace("border-red-500", "border-green-500");
    }
  });
}

input.forEach((element) => {
  element.addEventListener("blur", function (e) {
    checkLength(element, 5, 10);
    emailInput(element);
    passwordMatch();
  });

  element.addEventListener("input", function () {
    emailInput(element);
    checkLength(element, 5, 10);
  });
});

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  input.forEach((element, index) => {
    checkLength(element, 5, 10);
    emailInput(element);
    passwordMatch();

    if (element.classList.contains("border-green-500")) {
      console.log(index);
      alert("Sudah Di Kirim");
    }
  });
});
