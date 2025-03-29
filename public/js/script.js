document.addEventListener("DOMContentLoaded", function () {
  //Ensures the JavaScript runs only after the HTML document is fully loaded.
  //Once the HTML document is fully loaded, these functions are called.

  // Initialize page animations
  initPageAnimations();

  // Initialize product slider
  initProductSlider();
});

/**
 * Initializes all page entrance animations
 */
function initPageAnimations() {
  // Fetch all elements that need transitions
  const femaleImg = document.querySelector(".female img");
  const maleImg = document.querySelector(".male img");
  const buttons = document.querySelectorAll(".text-overlay button");
  const indulgeText = document.querySelector(".text-overlay-indulge");
  const yourText = document.querySelector(".text-overlay-your");

  // Start image transitions
  setTimeout(() => {
    // setTimeout delays the execution of the code inside it by 100 milliseconds.
    if (femaleImg) femaleImg.classList.add("loaded"); // Adds the 'loaded' class (CSS transition class) to the female image.
    if (maleImg) maleImg.classList.add("loaded"); // Adds the 'loaded' class (CSS transition class) to the male image.
  }, 100);

  // Start text transitions after images finish loading
  setTimeout(() => {
    if (indulgeText) indulgeText.classList.add("show");
    if (yourText) yourText.classList.add("show");

    // Add slight delay for buttons to appear after the text
    setTimeout(() => {
      buttons.forEach((button) => {
        button.classList.add("show");
        button.style.pointerEvents = "auto"; // Make buttons clickable after they are visible.
      });
    }, 130);
  }, 200);
}

/**
 * Initializes the product slider with circular looping
 */ function initProductSlider() {
  const slider = document.querySelector(".product-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const productDetails = document.getElementById("product-details");
  let cards = Array.from(document.querySelectorAll(".product-card"));

  if (!slider || !prevBtn || !nextBtn || cards.length === 0 || !productDetails)
    return;

  const visibleCards = 3;
  const cardMargin = 160;
  const cardWidth = slider.offsetWidth / visibleCards - cardMargin * 2;
  const cardCount = cards.length;

  // Duplicate first and last few cards for seamless looping
  const firstClones = cards
    .slice(0, visibleCards)
    .map((card) => card.cloneNode(true));
  const lastClones = cards
    .slice(-visibleCards)
    .map((card) => card.cloneNode(true));

  // Append clones at the start and end
  firstClones.forEach((clone) => slider.appendChild(clone));
  lastClones.reverse().forEach((clone) => slider.prepend(clone));

  // Update card list after adding clones
  cards = Array.from(slider.children);

  let cardIndex = visibleCards;
  slider.scrollLeft = cardIndex * (cardWidth + cardMargin * 2);

  /**
   * Update product details based on the active card
   */
  function updateProductDetails() {
    const activeCard = cards[cardIndex + 1]; // Active card is always cardIndex + 1 due to clones
    if (!activeCard) return;

    const name = activeCard.dataset.name;
    const description = activeCard.dataset.description;
    const rating = activeCard.dataset.rating;
    const size = activeCard.dataset.size;
    const price = activeCard.dataset.price;

    productDetails.querySelector(".product-name").textContent = name;
    productDetails.querySelector(".product-description").textContent =
      description;
    productDetails.querySelector(".rating-score").textContent = rating;
    productDetails.querySelector(".product-size").textContent = size;
    productDetails.querySelector(".product-price").textContent = price;
  }

  /**
   * Moves the slider and handles looping
   */
  function updateSlider() {
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft = cardIndex * (cardWidth + cardMargin * 2);

    // Update active class
    cards.forEach((card, index) => {
      const isActive = index === cardIndex + 1;
      card.classList.toggle("active", isActive);
    });

    // Update product details
    updateProductDetails();
  }

  function resetPosition() {
    slider.style.scrollBehavior = "auto";
    if (cardIndex >= cardCount + visibleCards) {
      cardIndex = visibleCards;
      slider.scrollLeft = cardIndex * (cardWidth + cardMargin * 2);
    } else if (cardIndex < visibleCards) {
      cardIndex = cardCount + visibleCards - 1;
      slider.scrollLeft = cardIndex * (cardWidth + cardMargin * 2);
    }
  }

  // Navigation Buttons
  nextBtn.addEventListener("click", function () {
    if (!slider.classList.contains("moving")) {
      slider.classList.add("moving");
      cardIndex++;
      updateSlider();
      setTimeout(() => {
        resetPosition();
        slider.classList.remove("moving");
      }, 300);
    }
  });

  prevBtn.addEventListener("click", function () {
    if (!slider.classList.contains("moving")) {
      slider.classList.add("moving");
      cardIndex--;
      updateSlider();
      setTimeout(() => {
        resetPosition();
        slider.classList.remove("moving");
      }, 300);
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    updateSlider();
  });

  updateSlider(); // Initial update
}

// Initialize the slider
initProductSlider();

/**
 * Handles gender selection animation and transition
 * @param {string} gender - 'male' or 'female'
 */
function changeImages(gender) {
  // Get elements
  const femaleDiv = document.querySelector(".female");
  const maleDiv = document.querySelector(".male");
  const transitionContainer = document.querySelector(".transition-container");
  const transitionImg = document.getElementById("transition-img");

  // Hide text overlays
  const textOverlays = document.querySelectorAll(
    ".text-overlay-indulge, .text-overlay-your"
  );
  textOverlays.forEach((overlay) => overlay.classList.add("hidden"));

  // Set the transition image based on gender
  if (gender === "female") {
    transitionImg.src =
      "https://www.perfumestars.com/wp-content/uploads/2024/12/burberry-her-eau-de-parfum-intense-new-fragrance-2024.jpg";
  } else if (gender === "male") {
    transitionImg.src =
      "https://cdn.shopify.com/s/files/1/0524/6733/5333/files/Versace_Eros-5_480x480.jpg?v=1609687512";
  }

  // Hide gender containers
  femaleDiv.classList.add("hidden");
  maleDiv.classList.add("hidden");

  // Show transition container
  transitionContainer.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      // If at the very top of the page, reset to the initial state
      nav.classList.remove("nav-visible", "hidden");
    } else if (currentScrollY > lastScrollY) {
      // Hide navbar when scrolling down
      nav.classList.add("hidden");
      nav.classList.remove("nav-visible");
    } else {
      // Show navbar when scrolling up
      nav.classList.remove("hidden");
      nav.classList.add("nav-visible");
    }

    lastScrollY = currentScrollY;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const heading = document.querySelector(".grey-content h2");
  const glow = document.querySelector(".glow");

  // Trigger animations after a short delay (e.g., 500ms)
  setTimeout(() => {
    heading.classList.add("visible"); // Zoom in the heading
    glow.classList.add("visible"); // Add glow effect
  }, 100); // Adjust the delay as needed
});


