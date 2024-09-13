//handle step 3 options
const countryCityMap = {
  Emirates: ["Dubai", "Sharjah", "Ajman", "Fujairah"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Luxor"],
  Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
};
const roomCategories = ["Apartment", "Room", "Studio"];

const countries = Object.keys(countryCityMap);

const countryDropdown = document.getElementById("countryDropdown");
const selectedCountrySpan = document.querySelector(".selected");
const roomDropdown = document.getElementById("roomDropdown");
const selectedRoomSpan = document.querySelector(".room-selected");

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
    });
    cityDropdown.appendChild(listItem);
  });
}

roomCategories.forEach((room) => {
  const listItem = document.createElement("li");
  listItem.className = "dropdown-item";
  listItem.textContent = room;
  listItem.addEventListener("click", function () {
    selectedRoomSpan.textContent = room;
  });
  roomDropdown.appendChild(listItem);
});

//handle validation step3
const step3NextBtn = step3.querySelector("[data-submit]");
const errorContainer = step3.querySelector("#error");

// Define default placeholder values for each field
const validationRules = {
  country: "Country",
  city: "City",
  room: "Room",
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
    case "room":
      isValid = value !== validationRules.room;
      break;
    case "officeName":
      isValid = value !== "";
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
    room: document.querySelector(".room-selected").textContent.trim(),
    officeName: document.querySelector("#officeNameBtn").value.trim(),
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

//start handel range
window.onload = function () {
  handleResize();
  createBars(totalBars);

  slideMin();
  slideMax();
};

window.addEventListener("resize", handleResize);

function handleResize() {
  const svg = document.getElementById("price-chart");
  const screenWidth = window.innerWidth;

  // Adjust SVG width based on screen size
  let svgWidth = screenWidth < 576 ? 327 : 350; // Adjust width as needed
  svg.setAttribute("width", svgWidth);

  // // Recreate bars with new width
  createBars(totalBars);
  updatePriceRange(); // Ensure bars have the right color after resizing
}

const minVal = document.querySelector("#min-val");
const maxVal = document.querySelector("#max-val");
const priceInputMin = document.querySelector(".min-input");
const priceInputMax = document.querySelector(".max-input");
const minGap = 10;
const range = document.querySelector(".slider-track");
const sliderMinValue = parseInt(minVal.min);
const sliderMaxValue = parseInt(maxVal.max);
const totalBars = 50; // Total number of bars to display

function slideMin() {
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if (gap <= minGap) {
    minVal.value = parseInt(maxVal.value) - parseInt(minVal.value);
  }
  priceInputMin.value = minVal.value;
  setArea();
  updatePriceRange();
}

function slideMax() {
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if (gap <= minGap) {
    maxVal.value = parseInt(minVal.value) + minGap;
  }
  priceInputMax.value = maxVal.value;

  setArea();
  updatePriceRange();
}

function setArea() {
  range.style.left = (minVal.value / sliderMaxValue) * 100 - 4 + "%";
  range.style.right = 104 - (maxVal.value / sliderMaxValue) * 100 + "%";
}

function setMinInput() {
  let minPrice = parseInt(priceInputMin.value);
  if (minPrice < sliderMinValue) {
    priceInputMin.value = sliderMinValue;
    maxVal.value = parseInt(minVal.value) + minGap;
  }
  minVal.value = priceInputMin.value;
  slideMin();
}

function setMaxInput() {
  let maxPrice = parseInt(priceInputMax.value);
  if (maxPrice > sliderMaxValue) {
    maxVal.value = parseInt(minVal.value) + minGap;
  }
  maxVal.value = priceInputMax.value;
  slideMax();
}
//end handel range

//handel svg
// Function to dynamically create bars
function createBars(numBars) {
  const svg = document.getElementById("price-chart");
  svg.innerHTML = ""; // Clear any existing bars
  let svgWidth = +svg.getAttribute("width");
  console.log(svgWidth);

  for (let i = 0; i < numBars; i++) {
    let height = Math.random() * 70 + 10;
    let xPos = i * (svgWidth / numBars);

    let bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    bar.setAttribute("x", xPos);
    bar.setAttribute("y", 100 - height);
    bar.setAttribute("width", svgWidth / numBars - 2);
    bar.setAttribute("height", height);
    bar.setAttribute("fill", "gray");
    bar.setAttribute("class", "bar");

    svg.appendChild(bar);
  }
}

// Function to update bar colors based on price range
function updatePriceRange() {
  const minPrice = parseInt(minVal.value);
  const maxPrice = parseInt(maxVal.value);
  const bars = document.querySelectorAll(".bar");

  const priceRange = sliderMaxValue - sliderMinValue;
  const pricePerBar = priceRange / totalBars;

  bars.forEach((bar, index) => {
    const barPrice = sliderMinValue + index * pricePerBar;

    if (barPrice >= minPrice && barPrice <= maxPrice) {
      // bar.setAttribute("fill", "#ff9400");
      bar.setAttribute("fill", "#f3704a");
    } else {
      bar.setAttribute("fill", "#292C2D");
    }
  });
}

// submit form
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
    formObject.place_category = document
      .querySelector(".room-selected")
      .textContent.trim();

    // Check for existing sessionStorage data and merge it
    const sessionData = sessionStorage.getItem("formDataStepOne");
    if (sessionData) {
      const parsedSessionData = JSON.parse(sessionData);
      Object.assign(formObject, parsedSessionData);
    }
    console.log(formObject);

    setTimeout(() => {
      window.location.href = "../home.html";
    }, 10000);
  }
});
