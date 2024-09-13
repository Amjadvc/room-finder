function initializeCarouselRoom() {
  var myCarousel = document.querySelector("#carouselRoomsControls");
  var isLargeScreen = window.matchMedia("(min-width: 576px)").matches;

  // Remove event listeners to avoid duplication
  $(
    ".roommate-seekers-sec .carousel-control-next, .roommate-seekers-sec .carousel-control-prev"
  ).off("click");

  if (isLargeScreen) {
    // Disable Bootstrap's built-in sliding behavior
    $(myCarousel).removeClass("slide");
    // $(".carousel-control-prev").addClass("disactve");
    $(".roommate-seekers-sec .carousel-control-prev").addClass("disactve");

    // Initialize custom carousel behavior
    var carouselWidth = $(".roommate-seekers-sec .carousel-inner")[0]
      .scrollWidth;
    var cardWidth = $(".roommate-seekers-sec .carousel-item")[0].scrollWidth;
    var scrollPosition = 0;

    //==============next
    $(".roommate-seekers-sec .carousel-control-next").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 3) {
        scrollPosition += cardWidth;
        $(".roommate-seekers-sec .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }

      // Check if at the end and disable the next button
      if (scrollPosition >= carouselWidth - cardWidth * 3) {
        $(".roommate-seekers-sec .carousel-control-next").addClass("disactve");
      } else {
        $(".roommate-seekers-sec .carousel-control-next").removeClass(
          "disactve"
        );
      }

      // Remove the disable class from prev button if we're not at the start
      if (scrollPosition > 0) {
        $(".roommate-seekers-sec .carousel-control-prev").removeClass(
          "disactve"
        );
      }
    });

    //==============prev
    $(".roommate-seekers-sec .carousel-control-prev").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $(".roommate-seekers-sec .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }

      // Check if at the start and disable the prev button
      if (scrollPosition <= 0) {
        $(".roommate-seekers-sec .carousel-control-prev").addClass("disactve");
      } else {
        $(".roommate-seekers-sec .carousel-control-prev").removeClass(
          "disactve"
        );
      }

      // Enable the next button when moving away from the end
      if (scrollPosition < carouselWidth - cardWidth * 3) {
        $(".roommate-seekers-sec .carousel-control-next").removeClass(
          "disactve"
        );
      }
    });
  } else {
    // Reset carousel to Bootstrap's default sliding behavior
    $(myCarousel).addClass("slide");
    $(".roommate-seekers-sec .carousel-control-prev").removeClass("disactve");
    $(".roommate-seekers-sec .carousel-control-next").removeClass("disactve");

    // Reset scroll position
    $(".roommate-seekers-sec .carousel-inner").scrollLeft(0);
  }
}

$(document).ready(function () {
  initializeCarouselRoom();
  $(window).resize(function () {
    initializeCarouselRoom();
  });
});

///////////////////////////////////////////////////
const roomMateShow = document.querySelector("[ data-show='roommate']");
const roomShow = document.querySelector("[ data-show='room']");
const roomMateBtn = document.querySelector(".roommate-btn");
const roomBtn = document.querySelector(".room-btn");
const allbtns = Array.from(document.querySelectorAll("[data-btn]"));

roomMateBtn.addEventListener("click", function () {
  toggleVisibility(roomMateShow, roomShow);
  handleClasses(roomMateBtn);
});

roomBtn.addEventListener("click", function () {
  toggleVisibility(roomShow, roomMateShow);
  handleClasses(roomBtn);
});

function toggleVisibility(showElement, hideElement) {
  hideElement.classList.add("hidden");
  hideElement.classList.remove("fade-in");

  showElement.classList.remove("hidden");
  showElement.classList.add("fade-in");
}

function handleClasses(btnactive) {
  allbtns.forEach((btn) => {
    btn.classList.remove("active");
    btn.classList.remove("fade-in");
  });
  btnactive.classList.add("active");
  btnactive.classList.add("fade-in");
}

//handel add ad
const adBtn = document.querySelector(".add");
const adText = document.querySelector(".addText");

adBtn.addEventListener("click", function () {
  adBtn.classList.toggle("active");
  setTimeout(() => {
    adText.classList.toggle("active");
  }, 100);
});
