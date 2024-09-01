console.log("login");

const signInBtn = document.querySelector("[data=sign-in]");
const phoneNumberInp = document.querySelector('input[name="whatsapp-number"]');
const passwordInp = document.querySelector('input[name="password"]');

signInBtn.addEventListener("click", function () {
  if (validation()) {
    window.location.href = "home.html";
  }

  phoneNumberInp.addEventListener("input", validation);
  passwordInp.addEventListener("input", validation);
});

function setError(element, message) {
  const inputControl = element.parentElement.parentElement;
  const errorDisplay = inputControl.querySelector("#error");
  errorDisplay.innerText = message;
  inputControl.classList.add("invalid");
}
function setSuccess(element) {
  const inputControl = element.parentElement.parentElement;
  inputControl.classList.remove("invalid");
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

function validation() {
  let isValid = true;
  const phoneNumberInpValue = phoneNumberInp.value.trim().replace(/\D/g, "");
  const passwordInpValue = passwordInp.value.trim();

  if (phoneNumberInpValue === "") {
    setError(phoneNumberInp, "Phone number is requird.");
    isValid = false;
  } else if (!isValidPhoneNumber(phoneNumberInpValue)) {
    setError(phoneNumberInp, "Please enter a valid phone number.");
    isValid = false;
  } else {
    setSuccess(phoneNumberInp);
  }
  if (passwordInpValue === "") {
    setError(passwordInp, "Password is requird.");
    isValid = false;
  } else if (!isValidPassword(passwordInpValue)) {
    setError(
      passwordInp,
      "6+ chars, number, uppercase, lowercase, special character."
    );
    isValid = false;
  } else {
    setSuccess(passwordInp);
  }

  return isValid;
}
