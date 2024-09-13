//handle validatePopup
const step2 = document.querySelector("#step2");
const stepN1 = document.querySelector("#stepN1");
const stepN2 = document.querySelector("#stepN2");
const stepN3 = document.querySelector("#stepN3");
const showStepText = document.querySelector("#showStepText");

//error success helper functions
function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector("#error");
  errorDisplay.innerText = message;
  inputControl.classList.add("invalid");
}
function setSuccess(element) {
  const inputControl = element.parentElement;
  inputControl.classList.remove("invalid");
}
//error success helper functions for an
function setError2(element, message) {
  const inputControl = element.parentElement.parentElement;
  const errorDisplay = inputControl.querySelector("#error");
  errorDisplay.innerText = message;
  inputControl.classList.add("invalid");
}
function setSuccess2(element) {
  const inputControl = element.parentElement.parentElement;
  inputControl.classList.remove("invalid");
}

//handle validation step2
const step2NextBtn = step2.querySelector("[data-next]");
const checkInputs = Array.from(step2.querySelectorAll("input"));
const checkContainer = document.querySelector(".checkbox-container");

function validationStep2() {
  let isValid = true;

  let ischeckboxChecked = false;
  checkInputs.forEach((check) => {
    if (check.checked) {
      ischeckboxChecked = true;
    }
  });

  if (!ischeckboxChecked) {
    checkContainer.classList.add("invalid");
    isValid = false;
  } else {
    checkContainer.classList.remove("invalid");
  }

  return isValid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

step2NextBtn.addEventListener("click", function () {
  if (validationStep2()) {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);

    let accountType = formObject["account-type"];
    localStorage.setItem("accountType", accountType);
    console.log(accountType);

    if (accountType === "place_only") {
      window.location.href = "signup-place.html";
    } else if (accountType === "seeker_of_room") {
      window.location.href = "signup-room.html";
    } else if (accountType === "seeker_of_roommate") {
      window.location.href = "signup-roommate.html";
    }
  }

  checkInputs.forEach((check) => {
    check.addEventListener("change", validationStep2);
  });
});
