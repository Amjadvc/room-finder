function initializeCarousel() {
  var myCarousel = document.querySelector("#carouselExampleControls");
  var isLargeScreen = window.matchMedia("(min-width: 576px)").matches;

  // Remove event listeners to avoid duplication
  // $(".carousel-control-next, .carousel-control-prev").off("click");
  $(
    ".cities-sec .carousel-control-next, .cities-sec .carousel-control-prev"
  ).off("click");

  if (isLargeScreen) {
    // Disable Bootstrap's built-in sliding behavior
    $(myCarousel).removeClass("slide");
    // $(".carousel-control-prev").addClass("disactve");
    $(".cities-sec .carousel-control-prev").addClass("disactve");

    // Initialize custom carousel behavior
    var carouselWidth = $(".cities-sec .carousel-inner")[0].scrollWidth;
    var cardWidth = $(".cities-sec .carousel-item")[0].scrollWidth;
    var scrollPosition = 0;

    //==============next
    $(".cities-sec .carousel-control-next").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        scrollPosition += cardWidth;
        $(".cities-sec .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }

      // Check if at the end and disable the next button
      if (scrollPosition >= carouselWidth - cardWidth * 4) {
        $(".cities-sec .carousel-control-next").addClass("disactve");
      } else {
        $(".cities-sec .carousel-control-next").removeClass("disactve");
      }

      // Remove the disable class from prev button if we're not at the start
      if (scrollPosition > 0) {
        $(".cities-sec .carousel-control-prev").removeClass("disactve");
      }
    });

    //==============prev
    $(" .cities-sec .carousel-control-prev").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $(" .cities-sec .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }

      // Check if at the start and disable the prev button
      if (scrollPosition <= 0) {
        $(" .cities-sec .carousel-control-prev").addClass("disactve");
      } else {
        $(" .cities-sec .carousel-control-prev").removeClass("disactve");
      }

      // Enable the next button when moving away from the end
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        $(" .cities-sec .carousel-control-next").removeClass("disactve");
      }
    });
  } else {
    // Reset carousel to Bootstrap's default sliding behavior
    $(myCarousel).addClass("slide");
    $(" .cities-sec .carousel-control-prev").removeClass("disactve");
    $(" .cities-sec .carousel-control-next").removeClass("disactve");

    // Reset scroll position
    $(" .cities-sec .carousel-inner").scrollLeft(0);
  }
}

$(document).ready(function () {
  initializeCarousel();
  $(window).resize(function () {
    initializeCarousel();
  });
});

////////////////////////////////////////////////////////
function initializeCarouselRoom() {
  var myCarousel = document.querySelector("#carouselRoomsControls");
  var isLargeScreen = window.matchMedia("(min-width: 576px)").matches;

  // Remove event listeners to avoid duplication
  $(".rooms-sec .carousel-control-next, .rooms-sec .carousel-control-prev").off(
    "click"
  );

  if (isLargeScreen) {
    // Disable Bootstrap's built-in sliding behavior
    $(myCarousel).removeClass("slide");
    // $(".carousel-control-prev").addClass("disactve");
    $(".rooms-sec .carousel-control-prev").addClass("disactve");

    // Initialize custom carousel behavior
    var carouselWidth = $(".rooms-sec .carousel-inner")[0].scrollWidth;
    var cardWidth = $(".rooms-sec .carousel-item")[0].scrollWidth;
    var scrollPosition = 0;

    //==============next
    $(".rooms-sec .carousel-control-next").on("click", function () {
      if (scrollPosition < carouselWidth - cardWidth * 3) {
        scrollPosition += cardWidth;
        $(".rooms-sec .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }

      // Check if at the end and disable the next button
      if (scrollPosition >= carouselWidth - cardWidth * 3) {
        $(".rooms-sec .carousel-control-next").addClass("disactve");
      } else {
        $(".rooms-sec .carousel-control-next").removeClass("disactve");
      }

      // Remove the disable class from prev button if we're not at the start
      if (scrollPosition > 0) {
        $(".rooms-sec .carousel-control-prev").removeClass("disactve");
      }
    });

    //==============prev
    $(".rooms-sec .carousel-control-prev").on("click", function () {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $(".rooms-sec .carousel-inner").animate(
          { scrollLeft: scrollPosition },
          600
        );
      }

      // Check if at the start and disable the prev button
      if (scrollPosition <= 0) {
        $(".rooms-sec .carousel-control-prev").addClass("disactve");
      } else {
        $(".rooms-sec .carousel-control-prev").removeClass("disactve");
      }

      // Enable the next button when moving away from the end
      if (scrollPosition < carouselWidth - cardWidth * 3) {
        $(".rooms-sec .carousel-control-next").removeClass("disactve");
      }
    });
  } else {
    // Reset carousel to Bootstrap's default sliding behavior
    $(myCarousel).addClass("slide");
    $(".rooms-sec .carousel-control-prev").removeClass("disactve");
    $(".rooms-sec .carousel-control-next").removeClass("disactve");

    // Reset scroll position
    $(".rooms-sec .carousel-inner").scrollLeft(0);
  }
}

$(document).ready(function () {
  initializeCarouselRoom();
  $(window).resize(function () {
    initializeCarouselRoom();
  });
});
