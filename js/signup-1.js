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

//handle validation step1
const steps = document.querySelector("#steps");
const step1 = document.querySelector("#step1");
const firstNameInp = document.querySelector('input[name="firstName"]');
const lastNameInp = document.querySelector('input[name="LastName"]');
const phoneNumberInp = document.querySelector('input[name="whatsapp-number"]');
const passwordInp = document.querySelector('input[name="password"]');
const step1NextBtn = step1.querySelector("[data-next]");
const radioInputs = document.querySelectorAll('input[name="gender"]');
const radioContainer = document.querySelector(".radio-contaienr");
const popup = document.querySelector("#popup");

step1NextBtn.addEventListener("click", function () {
  if (validationStep1()) {
    console.log("valid");
    steps.classList.add("d-none");
    popup.classList.remove("d-none");
    startTimer();
  }

  firstNameInp.addEventListener("input", validationStep1);
  lastNameInp.addEventListener("input", validationStep1);
  phoneNumberInp.addEventListener("input", validationStep1);
  passwordInp.addEventListener("input", validationStep1);
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", validationStep1);
  });
});

function validationStep1() {
  let isValid = true;
  const firstNameInpValue = firstNameInp.value.trim();
  const lastNameInpValue = lastNameInp.value.trim();
  const phoneNumberInpValue = phoneNumberInp.value.trim().replace(/\D/g, "");
  const passwordInpValue = passwordInp.value.trim();

  if (firstNameInpValue === "") {
    setError(firstNameInp, "First name is requird.");
    isValid = false;
  } else {
    setSuccess(firstNameInp);
  }
  if (lastNameInpValue === "") {
    setError(lastNameInp, "Last name is requird.");
    isValid = false;
  } else {
    setSuccess(lastNameInp);
  }
  if (phoneNumberInpValue === "") {
    setError2(phoneNumberInp, "Phone number is requird.");
    isValid = false;
  } else if (!isValidPhoneNumber(phoneNumberInpValue)) {
    setError2(phoneNumberInp, "Please enter a valid phone number.");
    isValid = false;
  } else {
    setSuccess2(phoneNumberInp);
  }
  if (passwordInpValue === "") {
    setError2(passwordInp, "Password is requird.");
    isValid = false;
  } else if (!isValidPassword(passwordInpValue)) {
    setError2(
      passwordInp,
      "6+ chars, number, uppercase, lowercase, special character."
    );
    isValid = false;
  } else {
    setSuccess2(passwordInp);
  }

  // Radio button validation
  let isRadioChecked = false;
  radioInputs.forEach((radio) => {
    if (radio.checked) {
      isRadioChecked = true;
    }
  });

  if (!isRadioChecked) {
    radioContainer.classList.add("invalid");
    isValid = false;
  } else {
    radioContainer.classList.remove("invalid");
  }

  return isValid;
}

//phone validation
const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
  return phoneRegex.test(phoneNumber);
};

//password validation
const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
  return passwordRegex.test(password);
};

//formate a phone inp
phoneNumberInp.addEventListener("input", function () {
  let cleaned = phoneNumberInp.value.replace(/\D/g, "");
  phoneNumberInp.value = cleaned;
  let length = cleaned.length;

  if (length > 3 && length <= 6) {
    phoneNumberInp.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (length > 6) {
    phoneNumberInp.value = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
      3,
      6
    )}-${cleaned.slice(6, 10)}`;
  } else {
    phoneNumberInp.value = cleaned;
  }
});

//submit form
const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

//handle blur&focus
const vCode1 = document.querySelector('input[name="verification-code-one"]');
const vCode2 = document.querySelector('input[name="verification-code-two"]');
const vCode3 = document.querySelector('input[name="verification-code-three"]');
const vCode4 = document.querySelector('input[name="verification-code-four"]');
const vCodeBtnV = document.querySelector('[data-next="verify"');

vCode1.addEventListener("input", function () {
  if (vCode1.value.length == 1) {
    vCode1.blur();
    vCode2.focus();
  }
});

vCode2.addEventListener("input", function () {
  if (vCode2.value.length == 1) {
    vCode2.blur();
    vCode3.focus();
  }
});

vCode3.addEventListener("input", function () {
  if (vCode3.value.length == 1) {
    vCode3.blur();
    vCode4.focus();
  }
});

//handle validatePopup
vCodeBtnV.addEventListener("click", function () {
  if (validatePopup()) {
    // colect the data from step one and store it in sessionStorage to pass it
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    sessionStorage.setItem("formDataStepOne", JSON.stringify(formObject));
    window.location.href = "signup-2.html";
  }

  vCode1.addEventListener("input", validatePopup);
  vCode2.addEventListener("input", validatePopup);
  vCode3.addEventListener("input", validatePopup);
  vCode4.addEventListener("input", validatePopup);
});

const validatePopup = () => {
  let isValid = true;
  const vCode1V = vCode1.value.trim();
  const vCode2V = vCode2.value.trim();
  const vCode3V = vCode3.value.trim();
  const vCode4V = vCode4.value.trim();

  const numbersRegex = /^\d+$/;

  if (vCode1V === "" || !numbersRegex.test(vCode1V)) {
    vCode1.classList.add("invalid");
    isValid = false;
  } else {
    vCode1.classList.remove("invalid");
  }
  if (vCode2V === "" || !numbersRegex.test(vCode2V)) {
    vCode2.classList.add("invalid");
    isValid = false;
  } else {
    vCode2.classList.remove("invalid");
  }
  if (vCode3V === "" || !numbersRegex.test(vCode3V)) {
    vCode3.classList.add("invalid");
    isValid = false;
  } else {
    vCode3.classList.remove("invalid");
  }
  if (vCode4V === "" || !numbersRegex.test(vCode4V)) {
    vCode4.classList.add("invalid");
    isValid = false;
  } else {
    vCode4.classList.remove("invalid");
  }

  return isValid;
};

//handle timer
const timerCounter = document.querySelector("#timer");

function startTimer() {
  let timer = 60 * 5;
  let seconds, minutes;
  const interval = setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (timer <= 0) {
      clearInterval(interval);
      timerCounter.textContent = "00:00";
    } else {
      timer--;
    }

    timerCounter.textContent = `${minutes}:${seconds}`;
  }, 1000);
}
