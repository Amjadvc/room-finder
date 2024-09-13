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
  console.log("s");
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

    // Check for existing sessionStorage data and merge it
    const sessionData = sessionStorage.getItem("formDataStepOne");
    if (sessionData) {
      const parsedSessionData = JSON.parse(sessionData);
      Object.assign(formObject, parsedSessionData); // Merge session data into formObject
    }

    console.log(formObject);

    setTimeout(() => {
      window.location.href = "../home.html";
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
    //       window.location.href = "../home.html";
    //     }, 5000);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }
});
