const users = [
  {
    id: 1,
    name: "Ali Saebe",
    advertisements: "Ali's Advertisements",
    email: "Ali .Saebe@gmail.com",
    image: "./assets/imgs/room-mate-1.png",
    location: "Egyptian",
    gender: "Male",
    birthdate: "June 3, 1993",
  },
  {
    id: 2,
    name: "Rama Kita",
    advertisements: "Rama's Advertisements",
    image: "./assets/imgs/room-e-mate-2.png",
    location: "Syria",
    email: "rama .kita@example.com",
    gender: "Female",
    birthdate: "April 12, 1995",
  },
  {
    id: 3,
    name: "Bana Dogo",
    advertisements: "Bana's Advertisements",
    image: "./assets/imgs/room-e-mate-3.png",
    location: "Lebanon",
    email: "bana .dogo@example.com",
    gender: "Female",
    birthdate: "August 7, 1997",
  },
  {
    id: 4,
    name: "Ahmed Kita",
    advertisements: "Ahmed's Advertisements",
    image: "./assets/imgs/room-e-mate-4.png",
    location: "Jordan",
    email: "ahmed .kita@example.com",
    gender: "Male",
    birthdate: "December 15, 1990",
  },
  {
    id: 5,
    name: "Dana ZAlfa",
    advertisements: "Dana's Advertisements",
    image: "./assets/imgs/room-e-mate-5.png",
    location: "Saudi Arabia",
    email: "dana .zalfa@example.com",
    gender: "Female",
    birthdate: "May 29, 1998",
  },
];

// Get the user ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = parseInt(urlParams.get("user"));

const selectedUser = users.find((user) => user.id === userId);
//
if (selectedUser) {
  const userImageElements = document.querySelectorAll(`[data-img]`);
  const userNameElements = document.querySelectorAll(`[data-name]`);

  userImageElements.forEach((imageElement) => {
    imageElement.src = selectedUser.image;
  });

  userNameElements.forEach((nameElement) => {
    nameElement.textContent = selectedUser.name;
  });

  document.getElementById("user-advertisements").textContent =
    selectedUser.advertisements;
  document.getElementById("user-location").textContent = selectedUser.location;
  document.getElementById("user-email").textContent = selectedUser.email;
  document.getElementById("user-gender").textContent = selectedUser.gender;
  document.getElementById("user-age").textContent = selectedUser.birthdate;
} else {
  console.error("User not found");
}
