// handel check Buttons
const petsBtn = document.querySelector("[data-pets]");
const petsBtnChildren = Array.from(petsBtn.children);

const smokeBtn = document.querySelector("[data-smoke]");
const smokeBtnChildren = Array.from(smokeBtn.children);

const state = {
  petsValue: "",
  smokeValue: "",
};

petsBtn.addEventListener("click", () =>
  handleButtonClick(petsBtnChildren, "petsValue")
);

smokeBtn.addEventListener("click", () =>
  handleButtonClick(smokeBtnChildren, "smokeValue")
);

function handleButtonClick(btnChildren, valueKey) {
  btnChildren.map((ele) => {
    if (ele.classList.contains("active-check")) {
      ele.classList.remove("active-check");
    } else {
      ele.classList.add("active-check");
      state[valueKey] = ele.innerHTML;
    }
  });
  console.log(`Updated ${valueKey}: ${state[valueKey]}`);
}

//handle inc&dec
const decBtn = document.querySelector("[data-dec]");
const incBtn = document.querySelector("[data-inc]");
const countDisplay = document.querySelector("[data-cont-show]");
let count = parseInt(countDisplay.textContent, 10);

function updateDisplay(value) {
  countDisplay.textContent = value;
}

function increment() {
  if (count < 10) {
    count += 1;
    updateDisplay(count);
  }
}

function decrement() {
  if (count > 0) {
    count -= 1;
    updateDisplay(count);
  }
}

decBtn.addEventListener("click", decrement);
incBtn.addEventListener("click", increment);

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
const step2 = document.querySelector("#step2");
const stepN1 = document.querySelector("#stepN1");
const stepN2 = document.querySelector("#stepN2");
const stepN3 = document.querySelector("#stepN3");
const showStepText = document.querySelector("#showStepText");

vCodeBtnV.addEventListener("click", function () {
  if (validatePopup()) {
    popup.classList.add("d-none");
    steps.classList.remove("d-none");
    step1.classList.add("d-none");
    step2.classList.remove("d-none");
    showStepText.innerHTML = "why are you using Roomyco?";
    stepN1.classList.remove("progress");
    stepN1.classList.add("done");
    stepN2.classList.add("progress");
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

//handle validation step2
const step2NextBtn = step2.querySelector("[data-next]");
const checkInputs = Array.from(step2.querySelectorAll("input"));
const checkContainer = document.querySelector(".checkbox-container");
const step3 = document.querySelector("#step3");

step2NextBtn.addEventListener("click", function () {
  if (validationStep2()) {
    step2.classList.add("d-none");
    step3.classList.remove("d-none");
    showStepText.innerHTML = "Tell us more about you";
    stepN2.classList.remove("progress");
    stepN2.classList.add("done");
    stepN3.classList.add("progress");
  }

  checkInputs.forEach((check) => {
    check.addEventListener("change", validationStep2);
  });
});

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

//handle step 3 options
const countryCityMap = {
  Emirates: ["Dubai", "Sharjah", "Ajman", "Fujairah"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Luxor"],
  Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
};

const locationMap = {
  Dubai: ["Downtown Dubai", "Jumeirah", "Deira", "Al Quoz", "Al Barsha"],
  Sharjah: ["Al Nahda", "Al Majaz", "Al Qasimia", "Al Khan", "Al Taawun"],
  Ajman: ["Al Nuaimia", "Al Rashidiya", "Al Jurf", "Mushairif", "Al Zahra"],
  Fujairah: ["Dibba", "Mirbah", "Sakamkam", "Al-Fujairah City", "Qidfa"],

  Cairo: ["Zamalek", "Maadi", "Heliopolis", "Downtown Cairo", "Nasr City"],
  Alexandria: ["Al Montazah", "Stanley", "Roushdy", "Smouha", "El Agamy"],
  Giza: ["6th of October", "Sheikh Zayed", "Dokki", "Mohandessin", "Haram"],
  Luxor: ["Karnak", "West Bank", "East Bank", "El Tod", "Armant"],

  Berlin: ["Mitte", "Kreuzberg", "Schöneberg"],
  Hamburg: ["Altona", "Eimsbüttel", "Wandsbek", "Bergedorf", "Hamburg-Mitte"],
  Munich: ["Altstadt-Lehel", "Schwabing", "Maxvorstadt", "Bogenhausen"],
  Cologne: ["Innenstadt", "Deutz", "Lindenthal", "Mülheim", "Nippes"],
  Frankfurt: ["Innenstadt", "Sachsenhausen", "Westend", "Bornheim", "Gallus"],
};

const countries = Object.keys(countryCityMap);

const countryDropdown = document.getElementById("countryDropdown");
const selectedCountrySpan = document.querySelector(".selected");

countries.forEach((country) => {
  const listItem = document.createElement("li");
  listItem.className = "dropdown-item";
  listItem.textContent = country;
  listItem.addEventListener("click", function () {
    selectedCountrySpan.textContent = country;
    populateCityDropdown(country);
  });
  countryDropdown.appendChild(listItem);
});

function populateCityDropdown(selectedCountry) {
  const cityDropdown = document.getElementById("cityDropdown");

  cityDropdown.innerHTML = "";

  const cities = countryCityMap[selectedCountry] || [];

  cities.forEach((city) => {
    const listItem = document.createElement("li");
    listItem.className = "dropdown-item";
    listItem.textContent = city;
    listItem.addEventListener("click", function () {
      document.querySelector(".city-selected").textContent = city;
      populateLocationDropdown(city);
    });
    cityDropdown.appendChild(listItem);
  });
}
function populateLocationDropdown(selectedCity) {
  const locationDropdown = document.getElementById("locationDropdown");

  locationDropdown.innerHTML = "";

  const locations = locationMap[selectedCity] || [];

  locations.forEach((location) => {
    const listItem = document.createElement("li");
    listItem.className = "dropdown-item";
    listItem.textContent = location;
    listItem.addEventListener("click", function () {
      document.querySelector(".location-selected").textContent = location;
    });
    locationDropdown.appendChild(listItem);
  });
}

//religion options
const religions = ["Christianity", "Islam", "Druze", "Buddhism", "Judaism"];
const religionDropdown = document.getElementById("religionDropdown");
const selectedreligionSpan = document.querySelector(".religion-selected");

religions.forEach((religion) => {
  const listItem = document.createElement("li");
  listItem.className = "dropdown-item";
  listItem.textContent = religion;
  listItem.addEventListener("click", function () {
    document.querySelector(".religion-selected").textContent = religion;
  });
  religionDropdown.appendChild(listItem);
});

//brith options
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 2010 - 1990 + 1 }, (_, i) => 2010 - i);

// Populate Dropdowns
function populateDropdown(dropdownId, items, selectedClass) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = ""; // Clear previous items

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "dropdown-item";
    listItem.textContent = item;
    listItem.addEventListener("click", function () {
      document.querySelector(`.${selectedClass}`).textContent = item;
    });
    dropdown.appendChild(listItem);
  });
}

// Populate the Day, Month, and Year dropdowns
populateDropdown("dayDropdown", days, "day-selected");
populateDropdown("monthDropdown", months, "month-selected");
populateDropdown("yearDropdown", years, "year-selected");

//handle validation step3

const step3NextBtn = step3.querySelector("[data-submit]");
const errorContainer = step3.querySelector("#error");

// Define default placeholder values for each field
const validationRules = {
  country: "Country",
  city: "City",
  location: "Select..",
  religion: "Select..",
  day: "Day",
  month: "Month",
  year: "Year",
};

// Function to validate and apply classes
function validateField(field, value) {
  let isValid = true;
  switch (field) {
    case "country":
      isValid = value !== validationRules.country;
      break;
    case "city":
      isValid = value !== validationRules.city;
      break;
    case "location":
      isValid = value !== validationRules.location;
      break;
    case "religion":
      isValid = value !== validationRules.religion;
      break;
    case "day":
      isValid = value !== validationRules.day;
      break;
    case "month":
      isValid = value !== validationRules.month;
      break;
    case "year":
      isValid = value !== validationRules.year;
      break;
    default:
      isValid = false;
  }
  return isValid;
}

// Function to validate step 3
function validationStep3() {
  const fields = {
    country: document.querySelector(".selected").textContent.trim(),
    city: document.querySelector(".city-selected").textContent.trim(),
    location: document.querySelector(".location-selected").textContent.trim(),
    religion: document.querySelector(".religion-selected").textContent.trim(),
    day: document.querySelector(".day-selected").textContent.trim(),
    month: document.querySelector(".month-selected").textContent.trim(),
    year: document.querySelector(".year-selected").textContent.trim(),
  };

  let allValid = true;

  // Validate each field and apply classes
  Object.keys(fields).forEach((field) => {
    const value = fields[field];
    const button = document.getElementById(`${field}Btn`);
    if (validateField(field, value)) {
      button.classList.remove("invalid");
      button.classList.add("valid");
    } else {
      button.classList.remove("valid");
      button.classList.add("invalid");
      allValid = false;
    }
  });

  // Toggle error message
  if (allValid) {
    errorContainer.classList.remove("invalid");
  } else {
    errorContainer.classList.add("invalid");
  }

  return allValid;
}

//submit form
const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validationStep3()) {
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const formObject = Object.fromEntries(formData.entries());

    // Collect custom dropdown values
    formObject.country = document.querySelector(".selected").textContent.trim();
    formObject.city = document
      .querySelector(".city-selected")
      .textContent.trim();
    formObject.location = document
      .querySelector(".location-selected")
      .textContent.trim();
    formObject.religion = document
      .querySelector(".religion-selected")
      .textContent.trim();
    formObject.day = document.querySelector(".day-selected").textContent.trim();
    formObject.month = document
      .querySelector(".month-selected")
      .textContent.trim();
    formObject.year = document
      .querySelector(".year-selected")
      .textContent.trim();

    formObject.pets = state.petsValue === "" ? "No" : state.petsValue;
    formObject.smoke = state.smokeValue === "" ? "No" : state.smokeValue;
    formObject.people_count = countDisplay.textContent;

    console.log(formObject);

    setTimeout(() => {
      window.location.href = "home.html";
    }, 10000);

    // fetch("/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //     setTimeout(() => {
    //       window.location.href = "home.html";
    //     }, 5000);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }
});
