document.addEventListener("DOMContentLoaded", () => {
  const favoriteBtn = document.getElementById("favorite-btn");
  const overlookedBtn = document.getElementById("overlooked-btn");
  const favoriteSection = document.getElementById("favorite-section");
  const overlookedSection = document.getElementById("overlooked-section");

  const showFavoriteSection = () => {
    favoriteSection.style.display = "flex";
    overlookedSection.style.display = "none";
    favoriteBtn.classList.add("active");
    overlookedBtn.classList.remove("active");
  };

  const showOverlookedSection = () => {
    favoriteSection.style.display = "none";
    overlookedSection.style.display = "flex";
    favoriteBtn.classList.remove("active");
    overlookedBtn.classList.add("active");
  };

  favoriteBtn.addEventListener("click", showFavoriteSection);
  overlookedBtn.addEventListener("click", showOverlookedSection);

  showFavoriteSection();
});
