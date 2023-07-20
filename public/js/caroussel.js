document.addEventListener("DOMContentLoaded", function () {
  // For the mobile version
  const mobileDots = document.querySelectorAll(".carrousel__mobile__navigation-dot");
  const mobileCards = document.querySelectorAll(".carrousel__mobile-team");
  const mobileDotsContainer = document.querySelector(".carrousel__mobile__right");

  let activeMobileCard = 0;

  function showMobileCard(index) {
    mobileCards.forEach((card, i) => {
      if (i === index) {
        card.style.display = "flex";
        mobileDots[i].classList.add("active");
      } else {
        card.style.display = "none";
        mobileDots[i].classList.remove("active");
      }
    });
  }

  mobileDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      activeMobileCard = index;
      showMobileCard(activeMobileCard);
    });
  });

  // For the web version
  const webDots = document.querySelectorAll(".carrousel__navigation-dot");
  const webCards = document.querySelectorAll(".carrousel__content-box");
  const webDotsContainer = document.querySelector(".carrousel__navigation-dots");

  let activeWebCard = 0;

  function showWebCard(index) {
    webCards.forEach((card, i) => {
      if (i === index) {
        card.style.display = "flex";
        webDots[i].classList.add("active");
      } else {
        card.style.display = "none";
        webDots[i].classList.remove("active");
      }
    });
  }

  webDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      activeWebCard = index;
      showWebCard(activeWebCard);
    });
  });

  // Check screen width and show/hide relevant carousels
  function updateCarousels() {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 768; // Set your mobile breakpoint

    if (isMobile) {
      mobileDotsContainer.style.display = "flex";
      webDotsContainer.style.display = "none";
      showMobileCard(activeMobileCard);
    } else {
      mobileDotsContainer.style.display = "none";
      webDotsContainer.style.display = "flex";
      showWebCard(activeWebCard);
    }
  }

  // Initial update and add event listener for window resize
  updateCarousels();
  window.addEventListener("resize", updateCarousels);
});
