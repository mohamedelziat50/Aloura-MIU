document.addEventListener("DOMContentLoaded", function () {
  //Ensures the JavaScript runs only after the HTML document is fully loaded.
  //Once the HTML document is fully loaded, these functions are called.

  // Initialize page animations
  initPageAnimations();

  initGenderHoverEffects();

  // Initialize product slider
  initProductSlider();

  // Initialize popup with 5 second delay
  initPopup();

  // Initialize smooth section scrolling
  // COMMENTED OUT BECAUSE ITS NOT CONSISTENT, UNCOMMENT FOR SMOOTH SCROLLING
  // initSmoothSectionScrolling();

  // Initialize the review cards
  initReviewCards();

  // --- GENDER TRANSITION LOGIC ---
  const forHerButton = document.querySelector(".for-her");
  const forHimButton = document.querySelector(".for-him");
  const genderContainer = document.querySelector(".gender");
  const transitionContainer = document.querySelector(".transition-container");
  const transitionImage = document.querySelector("#transition-img");

  const herFragrances = [
    {
      image:
        "https://cdn.prod.website-files.com/64fff659cb19102a6a74dc5e/66b080f27a31f17abfadfaf5_GUCCI_FLORA_MAIN.webp",
      name: "Flora Gorgeous",
      parfum: "GUCCI",
      description:
        "A luminous and modern floral fragrance that captures the essence of optimism and beauty.",
      notes: {
        top: "Pear, Mandarin",
        middle: "Gardenia, Jasmine",
        base: "Patchouli, Musks",
      },
    },
    {
      image:
        "https://www.perfumestars.com/wp-content/uploads/2024/07/burberry-goddess-intense-elevating-the-vanilla-experience-to-new-heights-2024-1024x559.jpg",
      name: "Goddess Intense",
      parfum: "BURBERRY",
      description:
        "An intoxicating vanilla-based fragrance that embodies modern femininity and power.",
      notes: {
        top: "Lavender",
        middle: "Vanilla Absolute",
        base: "Amber, Sandalwood",
      },
    },
    {
      image:
        "https://ifragranceofficial.com/wp-content/uploads/2023/11/eilish-no-3.png",
      name: "Eilish No.3",
      parfum: "EILISH",
      description:
        "A sultry and sophisticated scent that combines warmth with ethereal freshness.",
      notes: {
        top: "Black Pepper",
        middle: "Rose, Saffron",
        base: "Vanilla, Musk",
      },
    },
    {
      image: "https://i.ytimg.com/vi/vdQsvlcy7hE/maxresdefault.jpg",
      name: "Vanilla Sex",
      parfum: "Tom Ford",
      description:
        "A delicate and feminine fragrance that embodies youthful elegance.",
      notes: {
        top: "Bitter Almond",
        middle: "Vanilla, Floral Notes",
        base: "Tonka Bean, Vanilla Absolute , Sandalwood",
      },
    },
  ];
  const himFragrances = [
    {
      image:
        "https://m.media-amazon.com/images/I/71jzd3LtzPL._AC_UF1000,1000_QL80_.jpg",
      name: "Aventus",
      parfum: "Creed",
      description:
        "A luxurious leather fragrance that captures raw sensuality and sophistication.",
      notes: {
        top: "Cardamom",
        middle: "Leather, Jasmine",
        base: "Moss, Amber",
      },
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/0524/6733/5333/files/Versace_Eros-5_480x480.jpg?v=1609687512",
      name: "Eros",
      parfum: "VERSACE",
      description:
        "A bold and passionate fragrance inspired by Greek mythology.",
      notes: {
        top: "Mint, Green Apple",
        middle: "Tonka Bean",
        base: "Vanilla, Vetiver",
      },
    },
    {
      image:
        "https://www.perfumestars.com/wp-content/uploads/2025/03/fragrance-for-men-lattafa-perfumes-khamrah-dukhan-768x419.jpg",
      name: "Khamrah",
      parfum: "LATTAFA",
      description:
        "An intense and mysterious oriental fragrance with remarkable longevity.",
      notes: {
        top: "Saffron, Oud",
        middle: "Rose, Amber",
        base: "Musk, Vanilla",
      },
    },
    {
      image:
        "https://www.yslbeauty.com/dw/image/v2/BDCR_PRD/on/demandware.static/-/Sites-NGYSL-ILM-Library/default/dw5b0e71d0/pdp/images/WW-51020YSL/ysl_dmi_fraw_libre_le-parfum-22_digital-life-still_packshot-on-black&white-marble_landscape.jpg?sw=1920&sh=1080&sm=cut&q=85",
      name: "Y Le Parfum",
      parfum: "YVES SAINT LAURENT",
      description: "A sophisticated and intense fragrance for the modern man.",
      notes: {
        top: "Ginger",
        middle: "Geranium, Lavender",
        base: "Vanilla, Tonka Bean",
      },
    },
  ];
  let currentImageIndex = 0;
  let currentGender = null;

  function updateFragranceDisplay(gender, index, direction = "down") {
    const fragrance =
      gender === "her" ? herFragrances[index] : himFragrances[index];
    const container = transitionImage.parentElement;
    // Remove any old transition images
    Array.from(
      container.querySelectorAll(
        ".transition-img-slide-out-up, .transition-img-slide-out-down"
      )
    ).forEach((img) => img.remove());
    // Clone current image for slide out
    const oldImg = transitionImage.cloneNode(true);
    oldImg.removeAttribute("id");
    container.appendChild(oldImg);
    // Animate old image out
    if (direction === "up") {
      oldImg.classList.add("transition-img-slide-out-up");
    } else {
      oldImg.classList.add("transition-img-slide-out-down");
    }
    // Prepare new image for slide in
    const newImg = transitionImage.cloneNode(true);
    newImg.removeAttribute("id");
    newImg.src = fragrance.image;
    if (direction === "up") {
      newImg.classList.add("transition-img-slide-in-up");
    } else {
      newImg.classList.add("transition-img-slide-in-down");
    }
    container.appendChild(newImg);
    // After animation, set main image src and clean up
    setTimeout(() => {
      transitionImage.src = fragrance.image;
      oldImg.remove();
      newImg.remove();
    }, 500);
    // Update the visible overlay elements
    const overlay = transitionContainer.querySelector(".fragrance-overlay");
    if (overlay) {
      const nameEl = overlay.querySelector(".fragrance-name");
      if (nameEl) nameEl.textContent = fragrance.name;
      // Parfum/Type (try both class names for robustness)
      const parfumEl =
        overlay.querySelector(".fragrance-parfum") ||
        overlay.querySelector(".fragrance-type");
      if (parfumEl) parfumEl.textContent = fragrance.parfum;
      // Description
      const descEl = overlay.querySelector(".fragrance-description p");
      if (descEl) descEl.textContent = fragrance.description;
      // Notes
      const noteTexts = overlay.querySelectorAll(".note-group .note-text");
      if (noteTexts.length === 3) {
        noteTexts[0].textContent = fragrance.notes.top;
        noteTexts[1].textContent = fragrance.notes.middle;
        noteTexts[2].textContent = fragrance.notes.base;
      }
      // Update switch gender button icon
      const switchBtn = overlay.querySelector(".switch-gender-btn");
      if (switchBtn) {
        switchBtn.innerHTML =
          gender === "her"
            ? '<i class="fas fa-mars"></i>'
            : '<i class="fas fa-venus"></i>';
        switchBtn.title = gender === "her" ? "Switch to Him" : "Switch to Her";
        switchBtn.classList.add("circular-gender-btn");
      }
    }
  }

  function handleGenderSelection(gender) {
    if (!genderContainer || !transitionContainer || !transitionImage) return;
    currentGender = gender;
    currentImageIndex = 0;
    updateFragranceDisplay(gender, currentImageIndex);
    genderContainer.classList.add("transitioning");
    setTimeout(() => {
      transitionContainer.classList.add("active");
    }, 100);
    transitionContainer.classList.add("active");
    const upButton = transitionContainer.querySelector(".scroll-btn.up");
    const downButton = transitionContainer.querySelector(".scroll-btn.down");
    const upButtonClone = upButton.cloneNode(true);
    const downButtonClone = downButton.cloneNode(true);
    upButton.parentNode.replaceChild(upButtonClone, upButton);
    downButton.parentNode.replaceChild(downButtonClone, downButton);
    upButtonClone.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentGender === "her") {
        currentImageIndex =
          (currentImageIndex - 1 + herFragrances.length) % herFragrances.length;
        updateFragranceDisplay("her", currentImageIndex, "up");
      } else {
        currentImageIndex =
          (currentImageIndex - 1 + himFragrances.length) % himFragrances.length;
        updateFragranceDisplay("him", currentImageIndex, "up");
      }
    });
    downButtonClone.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentGender === "her") {
        currentImageIndex = (currentImageIndex + 1) % herFragrances.length;
        updateFragranceDisplay("her", currentImageIndex, "down");
      } else {
        currentImageIndex = (currentImageIndex + 1) % himFragrances.length;
        updateFragranceDisplay("him", currentImageIndex, "down");
      }
    });
    // Switch gender button
    const overlay = transitionContainer.querySelector(".fragrance-overlay");
    if (overlay) {
      const switchBtn = overlay.querySelector(".switch-gender-btn");
      if (switchBtn) {
        // Remove previous event listener by replacing node
        const switchBtnClone = switchBtn.cloneNode(true);
        switchBtn.parentNode.replaceChild(switchBtnClone, switchBtn);
        switchBtnClone.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          // Switch gender and reset to first fragrance
          if (currentGender === "her") {
            currentGender = "him";
            currentImageIndex = 0;
            updateFragranceDisplay("him", currentImageIndex);
          } else {
            currentGender = "her";
            currentImageIndex = 0;
            updateFragranceDisplay("her", currentImageIndex);
          }
        });
      }
    }
    // Rewind button (back to gender selection)
    const rewindBtn = overlay.querySelector(".rewind-btn");
    if (rewindBtn) {
      // Remove previous event listener by replacing node
      const rewindBtnClone = rewindBtn.cloneNode(true);
      rewindBtn.parentNode.replaceChild(rewindBtnClone, rewindBtn);
      rewindBtnClone.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Animate image out (slide down)
        const container = transitionImage.parentElement;
        Array.from(
          container.querySelectorAll(
            ".transition-img-slide-out-up, .transition-img-slide-out-down"
          )
        ).forEach((img) => img.remove());
        const oldImg = transitionImage.cloneNode(true);
        oldImg.removeAttribute("id");
        container.appendChild(oldImg);
        oldImg.classList.add("transition-img-slide-out-down");
        // Fade out overlay content
        overlay.classList.add("fragrance-overlay-fade-out");
        setTimeout(() => {
          // Hide transition container, show gender container
          transitionContainer.classList.remove("active");
          genderContainer.classList.remove("transitioning");
          genderContainer.classList.remove("transition-active");
          currentGender = null;
          currentImageIndex = 0;
          oldImg.remove();
          // Reset overlay fade for next time
          overlay.classList.remove("fragrance-overlay-fade-out");
        }, 500);
      });
    }
  }

  if (forHerButton) {
    forHerButton.addEventListener("click", () => handleGenderSelection("her"));
  }
  if (forHimButton) {
    forHimButton.addEventListener("click", () => handleGenderSelection("him"));
  }

  // Responsive: clicking female/male image triggers gender selection on <=1024px
  if (window.innerWidth <= 1024) {
    const femaleImg = document.querySelector('.female img');
    const maleImg = document.querySelector('.male img');
    const forHerButton = document.querySelector('.for-her');
    const forHimButton = document.querySelector('.for-him');
    if (femaleImg && forHerButton) {
      femaleImg.addEventListener('click', function (e) {
        e.preventDefault();
        forHerButton.click();
      });
    }
    if (maleImg && forHimButton) {
      maleImg.addEventListener('click', function (e) {
        e.preventDefault();
        forHimButton.click();
      });
    }
  }
});

// Mobile detection utility
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

const isMobile = isMobileDevice();
document.body && document.body.setAttribute("data-mobile", isMobile);

// Lazy-load fluid effect scripts only when needed
function loadFluidEffectsIfNeeded() {
  if (isMobile) return; // Don't load on mobile
  if (window.fluidEffectsLoaded) return;
  window.fluidEffectsLoaded = true;
  // Dynamically load scripts
  const jqueryScript = document.createElement("script");
  jqueryScript.src = "/js/fluidEffect/jquery.min.js";
  document.body.appendChild(jqueryScript);
  jqueryScript.onload = () => {
    const fluidScript = document.createElement("script");
    fluidScript.src = "/js/fluidEffect/fluid.min.js";
    document.body.appendChild(fluidScript);
    fluidScript.onload = () => {
      // Now load the app scripts
      const femaleApp = document.createElement("script");
      femaleApp.src = "./js/fluidEffect/female-app.js";
      document.body.appendChild(femaleApp);
      const maleApp = document.createElement("script");
      maleApp.src = "./js/fluidEffect/male-app.js";
      document.body.appendChild(maleApp);
    };
  };
}

// Only load fluid effects when gender container is hovered or interacted
const genderContainer = document.querySelector(".gender");
if (genderContainer && !isMobile) {
  genderContainer.addEventListener("mouseenter", loadFluidEffectsIfNeeded, {
    once: true,
  });
  genderContainer.addEventListener("touchstart", loadFluidEffectsIfNeeded, {
    once: true,
  });
}

// Hide or disable fluid canvases on mobile
if (isMobile) {
  const femaleCanvas = document.getElementById("female-fluid-canvas");
  const maleCanvas = document.getElementById("male-fluid-canvas");
  if (femaleCanvas) femaleCanvas.style.display = "none";
  if (maleCanvas) maleCanvas.style.display = "none";
}

// Reduce canvas resolution on mobile (in fluid effect scripts, but as a fallback here):
function setFluidCanvasResolution() {
  if (!isMobile) return;
  const femaleCanvas = document.getElementById("female-fluid-canvas");
  const maleCanvas = document.getElementById("male-fluid-canvas");
  if (femaleCanvas) {
    femaleCanvas.width = 320;
    femaleCanvas.height = 320;
  }
  if (maleCanvas) {
    maleCanvas.width = 320;
    maleCanvas.height = 320;
  }
}
setFluidCanvasResolution();





// Stagger entrance animations to avoid animating everything at once
function initPageAnimations() {
  // Fetch all elements that need transitions
  const femaleImg = document.querySelector(".female img");
  const maleImg = document.querySelector(".male img");
  const forHerBtn = document.querySelector(".for-her");
  const forHimBtn = document.querySelector(".for-him");
  const indulgeText = document.querySelector(".text-overlay-indulge");
  const yourText = document.querySelector(".text-overlay-your");
  const journeyText = document.querySelector(".fragrance-quiz");

  // Start image transitions staggered
  setTimeout(() => {
    if (femaleImg) femaleImg.classList.add("loaded");
  }, 100);
  setTimeout(() => {
    if (maleImg) maleImg.classList.add("loaded");
  }, 300);

  // Start text transitions after images finish loading
  setTimeout(() => {
    if (indulgeText) indulgeText.classList.add("show");
  }, 500);
  setTimeout(() => {
    if (yourText) yourText.classList.add("show");
  }, 700);

  // Add slight delay for buttons to appear after the text
  setTimeout(() => {
    if (forHimBtn) forHimBtn.classList.add("show");
  }, 900);
  setTimeout(() => {
    if (forHerBtn) forHerBtn.classList.add("show");
  }, 1100);

  // Show journey text at the same time as buttons
  setTimeout(() => {
    if (journeyText) journeyText.classList.add("show");
  }, 1200);
}

function initGenderHoverEffects() {
  const leftContainer = document.querySelector(".left-container");
  const rightContainer = document.querySelector(".right-container");
  const forHerBtn = document.querySelector(".for-her");
  const forHimBtn = document.querySelector(".for-him");
  const femaleDiv = document.querySelector(".female"); // Select the PARENT div for flex
  const maleDiv = document.querySelector(".male"); // Select the PARENT div for flex
  const your = document.querySelector(".text-overlay-your");
  const indulge = document.querySelector(".text-overlay-indulge");
  const leftParagraphs = leftContainer.querySelectorAll("p");
  const rightParagraphs = rightContainer.querySelectorAll("p");
  const leftBtn = leftContainer.querySelector(".explore-fragrances");
  const rightBtn = rightContainer.querySelector(".explore-fragrances");
  const genderContainer = document.querySelector(".gender");
  const transitionContainer = document.querySelector(".transition-container");
  const transitionImage = document.querySelector("#transition-img");

  // Fluid canvases
  const femaleCanvas = document.getElementById("female-fluid-canvas");
  const maleCanvas = document.getElementById("male-fluid-canvas");

  // Add hide-during-transition class to elements that should be hidden
  const elementsToHide = [
    your,
    indulge,
    leftBtn,
    rightBtn,
    forHerBtn,
    forHimBtn,
    ...leftParagraphs,
    ...rightParagraphs,
    femaleCanvas,
    maleCanvas,
  ];

  elementsToHide.forEach((el) => {
    if (el) el.classList.add("hide-during-transition");
  });

  // Click handlers for the buttons
  forHerBtn.addEventListener("click", () => {
    genderContainer.classList.add("transition-active");
    if (transitionContainer) {
      transitionContainer.classList.add("active");
    }
  });

  forHimBtn.addEventListener("click", () => {
    genderContainer.classList.add("transition-active");
    if (transitionContainer) {
      transitionContainer.classList.add("active");
    }
  });

  // State management
  let isLeftHovered = false;
  let isRightHovered = false;
  let femaleFluidTimer = null;
  let maleFluidTimer = null;

  // Left container hover effect (hovering over female side)
  leftContainer.addEventListener("mouseenter", () => {
    isLeftHovered = true;

    // UI changes
    forHimBtn.classList.add("hide");
    your.classList.add("hide");
    indulge.classList.add("hide");
    leftBtn.classList.add("show");
    leftParagraphs.forEach((p) => p.classList.add("show"));
    femaleDiv.style.flexGrow = "1.5";
    maleDiv.style.flexGrow = "0.5";
    maleDiv.style.filter = "brightness(0.5)";

    // Hide female fluid canvas immediately
    femaleCanvas.style.opacity = "0";
    femaleCanvas.style.pointerEvents = "none"; // Disable pointer events to prevent interaction

    // Hide male fluid canvas immediately
    maleCanvas.style.opacity = "0";
    maleCanvas.style.pointerEvents = "none"; // Disable pointer events to prevent interaction

    // Clear any pending timers - This prevents race conditions by canceling any pending timers
    if (femaleFluidTimer) clearTimeout(femaleFluidTimer);
    if (maleFluidTimer) clearTimeout(maleFluidTimer);
  });

  leftContainer.addEventListener("mouseleave", () => {
    isLeftHovered = false;

    // UI changes
    forHimBtn.classList.remove("hide");
    your.classList.remove("hide");
    indulge.classList.remove("hide");
    leftBtn.classList.remove("show");
    leftParagraphs.forEach((p) => p.classList.remove("show"));
    femaleDiv.style.flexGrow = "";
    maleDiv.style.flexGrow = "";
    maleDiv.style.filter = "";

    // Only show the fluid canvases if we're not hovering over either container
    if (!isRightHovered) {
      // Clear any pending timers
      if (femaleFluidTimer) clearTimeout(femaleFluidTimer);
      if (maleFluidTimer) clearTimeout(maleFluidTimer);

      // Fade in female fluid canvas after delay
      femaleFluidTimer = setTimeout(() => {
        femaleCanvas.style.opacity = "1"; // Match CSS opacity
        femaleCanvas.style.pointerEvents = "auto"; // Add this line to restore pointer events
      }, 2000);

      // Ensure male fluid is visible too (in case it was hidden before)
      maleFluidTimer = setTimeout(() => {
        maleCanvas.style.opacity = "1"; // Match CSS opacity
        maleCanvas.style.pointerEvents = "auto";
      }, 2000);
    }
  });

  // Right container hover effect (hovering over male side)
  rightContainer.addEventListener("mouseenter", () => {
    isRightHovered = true;

    // UI changes
    forHerBtn.classList.add("hide");
    your.classList.add("hide");
    indulge.classList.add("hide");
    rightBtn.classList.add("show");
    rightParagraphs.forEach((p) => p.classList.add("show"));
    maleDiv.style.flexGrow = "1.5"; // Increase the size of the male DIV
    femaleDiv.style.flexGrow = "0.5"; // Decrease the size of the female DIV
    femaleDiv.style.filter = "brightness(0.5)"; // Decrease brightness of female IMG

    // Hide male fluid canvas immediately
    maleCanvas.style.opacity = "0";
    maleCanvas.style.pointerEvents = "none"; // Disable pointer events to prevent interaction

    // Hide female fluid canvas immediately
    femaleCanvas.style.opacity = "0";
    femaleCanvas.style.pointerEvents = "none"; // Disable pointer events to prevent interaction

    // Clear any pending timers
    if (femaleFluidTimer) clearTimeout(femaleFluidTimer);
    if (maleFluidTimer) clearTimeout(maleFluidTimer);
  });

  rightContainer.addEventListener("mouseleave", () => {
    isRightHovered = false;

    // UI changes
    forHerBtn.classList.remove("hide");
    your.classList.remove("hide");
    indulge.classList.remove("hide");
    rightBtn.classList.remove("show");
    rightParagraphs.forEach((p) => p.classList.remove("show"));
    maleDiv.style.flexGrow = "";
    femaleDiv.style.flexGrow = "";
    femaleDiv.style.filter = "";

    // Only show the fluid canvases if we're not hovering over either container
    if (!isLeftHovered) {
      // Clear any pending timers
      if (femaleFluidTimer) clearTimeout(femaleFluidTimer);
      if (maleFluidTimer) clearTimeout(maleFluidTimer);

      // Fade in male fluid canvas after delay
      maleFluidTimer = setTimeout(() => {
        maleCanvas.style.opacity = "1"; // Match CSS opacity
        maleCanvas.style.pointerEvents = "auto"; // Add this line to restore pointer events
      }, 2000);

      // Ensure female fluid is visible too (in case it was hidden before)
      femaleFluidTimer = setTimeout(() => {
        femaleCanvas.style.opacity = "1"; // Match CSS opacity
        femaleCanvas.style.pointerEvents = "auto";
      }, 2000);
    }
  });
}

/**
 * Initializes the product slider with circular looping
 */

function initProductSlider() {
  const slider = document.querySelector(".product-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const productDetails = document.getElementById("product-details");
  let cards = Array.from(document.querySelectorAll(".product-card"));

  if (!slider || !prevBtn || !nextBtn || cards.length === 0 || !productDetails)
    return;

  const visibleCards = 3;
  const cardMargin = 160;
  const cardCount = cards.length;
  const cardWidth = slider.offsetWidth / visibleCards - cardMargin * 2;

  // Duplicate first and last few cards for seamless looping
  const firstClones = cards
    .slice(0, visibleCards)
    .map((card) => card.cloneNode(true));
  const lastClones = cards
    .slice(-visibleCards)
    .map((card) => card.cloneNode(true));

  // Append clones
  firstClones.forEach((clone) => slider.appendChild(clone));
  lastClones.reverse().forEach((clone) => slider.prepend(clone));

  // Refresh cards array after cloning
  cards = Array.from(slider.children);

  let cardIndex = visibleCards;
  slider.scrollLeft = cardIndex * (cardWidth + cardMargin * 2);

  function updateProductDetails() {
    const activeCard = cards[cardIndex + 1]; // +1 to account for prepended clones
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

  function updateActiveCard() {
    cards.forEach((card, index) => {
      const isActive = index === cardIndex + 1;
      card.classList.toggle("active", isActive);
    });
    // --- Add click listeners to adjacent cards ---
    // Remove previous listeners by cloning
    cards.forEach((card, idx) => {
      if (card._adjacentClickHandler) {
        card.removeEventListener('click', card._adjacentClickHandler);
        card._adjacentClickHandler = null;
      }
    });
    // Left adjacent
    const leftIdx = cardIndex;
    if (cards[leftIdx]) {
      const leftHandler = function(e) {
        e.preventDefault();
        prevBtn.click();
      };
      cards[leftIdx].addEventListener('click', leftHandler);
      cards[leftIdx]._adjacentClickHandler = leftHandler;
      cards[leftIdx].style.cursor = 'pointer';
    }
    // Right adjacent
    const rightIdx = cardIndex + 2;
    if (cards[rightIdx]) {
      const rightHandler = function(e) {
        e.preventDefault();
        nextBtn.click();
      };
      cards[rightIdx].addEventListener('click', rightHandler);
      cards[rightIdx]._adjacentClickHandler = rightHandler;
      cards[rightIdx].style.cursor = 'pointer';
    }
    // Remove pointer from non-adjacent
    cards.forEach((card, idx) => {
      if (idx !== leftIdx && idx !== rightIdx && card.style) {
        card.style.cursor = '';
      }
    });
  }

  function updateSlider() {
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft = cardIndex * (cardWidth + cardMargin * 2);
    updateProductDetails();
    updateActiveCard();
  }

  function resetPosition() {
    slider.style.scrollBehavior = "auto";

    let jumped = false;
    let newIndex = cardIndex;

    if (cardIndex >= cardCount + visibleCards) {
      newIndex = visibleCards;
      jumped = true;
    } else if (cardIndex < visibleCards) {
      newIndex = cardCount + visibleCards - 1;
      jumped = true;
    }

    if (jumped) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cardIndex = newIndex;
          slider.scrollLeft = cardIndex * (cardWidth + cardMargin * 2);
          updateActiveCard();

          const realActive = cards[cardIndex + 1];
          realActive.style.transition = "none";
          realActive.offsetHeight;
          realActive.style.transition = "";
        });
      });
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
      }, 350);
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
      }, 350);
    }
  });

  window.addEventListener("resize", updateSlider);
  updateSlider(); // Initial render
}

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

  // Also hide journey text
  const journeyText = document.querySelector(".journey-text");
  if (journeyText) {
    journeyText.classList.add("hidden");
  }

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

/**
 * Initialize popup functionality
 */
function initPopup() {
  const popupOverlay = document.querySelector(".popup-overlay");
  const popupClose = document.querySelector(".popup-close");
  const popupBtn = document.querySelector(".popup-btn");

  if (!popupOverlay || !popupClose || !popupBtn) return;

  // Show popup after 5 seconds (5000ms)
  setTimeout(() => {
    // Store current scroll position
    const scrollY = window.scrollY;

    // Add active class to show the popup
    popupOverlay.classList.add("active");
    document.body.classList.add("popup-active");

    // Disable scrolling while keeping the same visual position
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  }, 5000);

  // Function to close popup and restore page functionality
  function closePopup() {
    // Remove active classes
    popupOverlay.classList.remove("active");
    document.body.classList.remove("popup-active");

    // Re-enable scrolling and restore position
    const scrollY = parseInt(document.body.style.top || "0") * -1;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    // Don't manually scroll, browser will maintain position naturally
  }

  // Close popup when X is clicked
  popupClose.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default behavior that might cause page to scroll
    closePopup();
  });

  // Close popup when button is clicked and open login modal
  popupBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default behavior that might cause page to scroll
    closePopup();

    // Open the login modal using Bootstrap's modal API
    const loginModal = new bootstrap.Modal(
      document.getElementById("loginModal")
    );
    loginModal.show();
  });

  // Close popup when clicking outside the popup container
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });
}

/**
 * Initialize smooth section scrolling between main page sections
 */
function initSmoothSectionScrolling() {
  // Identify all main sections to include in scroll snapping in correct order
  const sections = [
    document.querySelector(".gender"),
    document.querySelector(".quality-model-section"),
    document.querySelector(".product-slider-section"),
    document.querySelector("footer"),
  ];

  // Filter out any null sections (in case they don't exist)
  const validSections = sections.filter((section) => section !== null);

  if (validSections.length < 2) return; // Need at least 2 sections for this to work

  // Current section index
  let currentSectionIndex = 0;
  let isScrolling = false;
  let scrollTimeout;
  let smoothScrollingEnabled = true;
  let isOverModelViewer = false;
  let lastScrollTime = 0;
  let scrollThrottleTime = 800; // Reduced from 1200ms for more responsive feeling
  let scrollAnimationDuration = 600; // Duration of the smooth scroll animation

  // Get the 3D model viewer container
  const modelViewer = document.getElementById("model-viewer");

  // Set initial section heights to viewport height for proper scrolling
  validSections.forEach((section) => {
    section.style.minHeight = "100vh";
    section.style.scrollMarginTop = "0";
  });

  // Add event listeners for mouse over/out of model viewer
  if (modelViewer) {
    // Disable smooth scrolling when mouse is over the model viewer
    modelViewer.addEventListener("mouseenter", () => {
      isOverModelViewer = true;
    });

    // Re-enable smooth scrolling when mouse leaves the model viewer
    modelViewer.addEventListener("mouseleave", () => {
      isOverModelViewer = false;
    });

    // Also track touch events for mobile
    modelViewer.addEventListener("touchstart", () => {
      isOverModelViewer = true;
    });

    modelViewer.addEventListener("touchend", () => {
      // Add a slight delay before disabling to allow for interaction
      setTimeout(() => {
        isOverModelViewer = false;
      }, 500);
    });
  }

  // Find the current section based on scroll position
  function getCurrentSection() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Check if we're near the top of the page
    if (scrollPosition < windowHeight / 2) {
      return 0; // First section
    }

    // Check if we're near the bottom of the page
    if (scrollPosition + windowHeight >= document.body.scrollHeight - 100) {
      return validSections.length - 1; // Last section
    }

    // Find which section's center point we're closest to
    let closestSection = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < validSections.length; i++) {
      const section = validSections[i];
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionCenter = sectionTop + sectionHeight / 2;
      const distanceToCenter = Math.abs(
        scrollPosition + windowHeight / 2 - sectionCenter
      );

      if (distanceToCenter < closestDistance) {
        closestDistance = distanceToCenter;
        closestSection = i;
      }
    }

    return closestSection;
  }

  // Scroll to a specific section
  function scrollToSection(index) {
    if (index < 0) index = 0;
    if (index >= validSections.length) index = validSections.length - 1;

    // Don't scroll if we're already at this section
    if (index === currentSectionIndex && !isScrolling) return;

    // Set scrolling state immediately for better responsiveness
    isScrolling = true;

    // Update currentSectionIndex immediately
    currentSectionIndex = index;

    // Immediately apply a visual cue to indicate scroll is happening (optional)
    // This could be a small indicator dot that appears instantly while scrolling starts

    // Scroll to the target section - this is the actual scroll action
    validSections[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Reset isScrolling after animation completes
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, scrollAnimationDuration); // Use animation duration instead of throttle time
  }

  // Handle wheel events for smooth scrolling with minimal delay
  window.addEventListener(
    "wheel",
    function (e) {
      // Skip if scrolling animation is in progress, smooth scrolling is disabled,
      // popup is active, or mouse is over the 3D model viewer
      if (
        isScrolling ||
        !smoothScrollingEnabled ||
        document.body.classList.contains("popup-active") ||
        isOverModelViewer
      ) {
        e.preventDefault(); // Still prevent default to avoid jumpy behavior
        return;
      }

      // Apply throttling, but with reduced time for better responsiveness
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottleTime) {
        e.preventDefault();
        return;
      }

      // Update last scroll time immediately
      lastScrollTime = now;

      // Prevent default to take control of scrolling
      e.preventDefault();

      // Get direction and respond immediately
      const direction = e.deltaY > 0 ? 1 : -1;
      currentSectionIndex = getCurrentSection();

      // Start scrolling to next section immediately
      requestAnimationFrame(() => {
        scrollToSection(currentSectionIndex + direction);
      });
    },
    { passive: false }
  );

  // Completely prevent normal scrolling to avoid interference
  window.addEventListener("scroll", function (e) {
    if (isScrolling) return; // Allow programmatic scrolling

    // If not currently in a programmatic scroll, snap to nearest section
    if (
      smoothScrollingEnabled &&
      !document.body.classList.contains("popup-active") &&
      !isOverModelViewer
    ) {
      const currentSection = getCurrentSection();

      // Only update if we've changed sections and not currently scrolling
      if (currentSection !== currentSectionIndex && !isScrolling) {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          scrollToSection(currentSection);
        });
      }
    }
  });

  // Handle key navigation (arrow keys)
  window.addEventListener("keydown", function (e) {
    // Skip if scrolling animation is in progress, smooth scrolling is disabled,
    // popup is active, or focus is on the 3D model viewer
    if (
      isScrolling ||
      !smoothScrollingEnabled ||
      document.body.classList.contains("popup-active") ||
      isOverModelViewer
    ) {
      return;
    }

    // Throttle key events, but less aggressively
    const now = Date.now();
    if (now - lastScrollTime < scrollThrottleTime) {
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      lastScrollTime = now;
      requestAnimationFrame(() => {
        scrollToSection(currentSectionIndex + 1);
      });
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      lastScrollTime = now;
      requestAnimationFrame(() => {
        scrollToSection(currentSectionIndex - 1);
      });
    }
  });

  // Handle touch events for mobile
  let touchStartY = 0;
  let touchEndY = 0;
  const minSwipeDistance = 50; // Minimum distance to consider a swipe

  window.addEventListener(
    "touchstart",
    function (e) {
      if (
        isOverModelViewer ||
        isScrolling ||
        !smoothScrollingEnabled ||
        document.body.classList.contains("popup-active")
      ) {
        return;
      }
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchend",
    function (e) {
      if (
        isOverModelViewer ||
        isScrolling ||
        !smoothScrollingEnabled ||
        document.body.classList.contains("popup-active")
      ) {
        return;
      }

      // Apply throttling, but with reduced time
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottleTime) {
        return;
      }

      touchEndY = e.changedTouches[0].screenY;
      const touchDistance = touchEndY - touchStartY;

      // If the touch moved far enough, consider it a swipe
      if (Math.abs(touchDistance) >= minSwipeDistance) {
        e.preventDefault();
        lastScrollTime = now;

        // Get current section
        currentSectionIndex = getCurrentSection();

        // Determine direction (negative = swipe up = next section)
        const direction = touchDistance < 0 ? 1 : -1;

        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          scrollToSection(currentSectionIndex + direction);
        });
      }
    },
    { passive: false }
  );

  // Toggle smooth scrolling when popup is shown/hidden
  const popupOverlay = document.querySelector(".popup-overlay");
  if (popupOverlay) {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "class") {
          const isActive = popupOverlay.classList.contains("active");
          smoothScrollingEnabled = !isActive;
        }
      });
    });

    observer.observe(popupOverlay, { attributes: true });
  }

  // Add section identifiers for easier debugging
  validSections.forEach((section, index) => {
    section.dataset.sectionIndex = index;
  });

  // Set initial section based on page load position
  window.addEventListener("load", function () {
    setTimeout(() => {
      currentSectionIndex = getCurrentSection();
      scrollToSection(currentSectionIndex);
    }, 100);
  });
}

/**
 * Initialize the new review cards section with rotating content
 */
function initReviewCards() {
  const reviewsContainer = document.getElementById("reviews-container");
  const navDots = document.querySelectorAll(".reviews-nav-dot");

  if (!reviewsContainer || navDots.length === 0) return;

  // Get all review cards (these are now generated from real database data)
  const reviewCards = Array.from(document.querySelectorAll(".review-card"));

  // If we have no review cards, nothing to initialize
  if (reviewCards.length === 0) return;

  // Calculate how many pages we have (3 reviews per page)
  const totalReviews = reviewCards.length;
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  // If we only have one page or less, no need for carousel
  if (totalPages <= 1) return;

  // Keep track of current page (0-based)
  let currentPageIndex = 0;

  // Flag to prevent multiple transitions
  let isTransitioning = false;

  // Function to show a specific page of reviews
  function showPage(pageIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Update active navigation dot
    navDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === pageIndex);
    });

    // Hide all cards first with fade out
    reviewCards.forEach((card) => {
      card.classList.add("fading-out");
      card.classList.remove("fading-in");
    });

    // After fade out, show the cards for the current page
    setTimeout(() => {
      reviewCards.forEach((card, index) => {
        const cardPageIndex = Math.floor(index / reviewsPerPage);
        if (cardPageIndex === pageIndex) {
          card.style.display = "block";
          setTimeout(() => {
            card.classList.remove("fading-out");
            card.classList.add("fading-in");
          }, 30);
        } else {
          card.style.display = "none";
        }
      });
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }, 300);
  }

  // Initialize: show first page and set up nav dots
  showPage(0);

  // Add click event listeners to nav dots
  navDots.forEach((dot, index) => {
    if (index < totalPages) {
      dot.addEventListener("click", function () {
        if (index === currentPageIndex || isTransitioning) return;
        currentPageIndex = index;
        showPage(currentPageIndex);
      });
    }
  });

  // Auto rotate through pages every 8 seconds (only if we have multiple pages)
  if (totalPages > 1) {
    setInterval(() => {
      if (isTransitioning) return;
      currentPageIndex = (currentPageIndex + 1) % totalPages;
      showPage(currentPageIndex);
    }, 8000);
  }

  // For Him & For Her button functionality

  document.addEventListener("DOMContentLoaded", function () {
    const forHerButton = document.querySelector(".for-her");
    const forHimButton = document.querySelector(".for-him");
    const genderContainer = document.querySelector(".gender");
    const transitionContainer = document.querySelector(".transition-container");
    const transitionImage = document.querySelector("#transition-img");

    // Initialize existing elements
    const textOverlayIndulge = document.querySelector(".text-overlay-indulge");
    const textOverlayYour = document.querySelector(".text-overlay-your");
    const leftContainer = document.querySelector(".left-container p");
    const rightContainer = document.querySelector(".right-container p");
    const exploreButtons = document.querySelectorAll(".explore-fragrances");
    const forHerBtn = document.querySelector(".for-her");
    const forHimBtn = document.querySelector(".for-him");
    const fragranceQuiz = document.querySelector(".fragrance-quiz");

    function handleGenderSelection(gender) {
      const imagePath =
        gender === "her"
          ? "./img/girlTestCopy.jpg"
          : "https://m.media-amazon.com/images/I/71jzd3LtzPL._AC_UF1000,1000_QL80_.jpg";

      if (!genderContainer || !transitionContainer || !transitionImage) return;

      // Set the transition image
      transitionImage.src = imagePath;

      // Add transitioning class to fade out content
      genderContainer.classList.add("transitioning");

      // After content starts fading out, show the transition image
      setTimeout(() => {
        transitionContainer.classList.add("active");
      }, 100);
      // Show transition container with overlay
      transitionContainer.classList.add("active");

      // Set up scroll button handlers
      const upButton = transitionContainer.querySelector(".scroll-btn.up");
      const downButton = transitionContainer.querySelector(".scroll-btn.down");

      upButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Add scroll up functionality
      });

      downButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Add scroll down functionality
      });
    }

    // Event listeners for buttons
    if (forHerButton) {
      forHerButton.addEventListener("click", () =>
        handleGenderSelection("her")
      );
    }

    if (forHimButton) {
      forHimButton.addEventListener("click", () =>
        handleGenderSelection("him")
      );
    } // Remove any auto-initialization of show classes
    // Elements will be shown on hover instead

    setTimeout(() => {
      if (fragranceQuiz) fragranceQuiz.classList.add("show");
    }, 2500);
  });
}

// --- Fragrance Modal Logic for Carousel ---
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("fragrance-modal");
  const modalClose = document.querySelector(".fragrance-modal-close");
  const modalImg = document.getElementById("fragrance-modal-img");
  const modalName = document.getElementById("fragrance-modal-name");
  const modalTop = document.getElementById("fragrance-modal-top");
  const modalMiddle = document.getElementById("fragrance-modal-middle");
  const modalBase = document.getElementById("fragrance-modal-base");
  const modalSizes = document.getElementById("fragrance-modal-sizes");
  const modalPrice = document.getElementById("fragrance-modal-price");
  const addToCartBtn = document.getElementById("fragrance-modal-add-to-cart");

  // Helper: Open modal
  function openModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
  // Helper: Close modal
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
    modalSizes.innerHTML = "";
    modalTop.textContent = "";
    modalMiddle.textContent = "";
    modalBase.textContent = "";
    modalPrice.textContent = "";
    addToCartBtn.disabled = true;
    addToCartBtn.dataset.size = "";
    addToCartBtn.dataset.fragranceId = "";
  }
  if (modalClose) modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // Listen for click on active product card image only
  document.querySelectorAll(".product-card").forEach(card => {
    const imgEl = card.querySelector("img");
    if (!imgEl) return;
    imgEl.addEventListener("click", function (e) {
      // Only trigger for the active card
      if (!card.classList.contains("active")) return;
      e.stopPropagation(); // Prevent bubbling to card click
      const fragranceId = card.getAttribute("data-fragrance-id");
      if (!fragranceId) return;
      // Set EJS-rendered name and image
      modalName.textContent = card.getAttribute("data-name") || "";
      modalImg.src = imgEl.src;
      // Fetch fragrance details from backend
      fetch(`/fragrance/details/${fragranceId}`)
        .then(res => {
          console.log('Response status:', res.status);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('Fetched fragrance data:', data);
          // Notes
          modalTop.textContent = data.notes?.top || "-";
          modalMiddle.textContent = data.notes?.middle || "-";
          modalBase.textContent = data.notes?.base || "-";
          // Sizes
          modalSizes.innerHTML = "";
          let firstAvailable = null;
          data.sizes.forEach((sizeObj, idx) => {
            const btn = document.createElement("button");
            btn.className = "fragrance-size-btn";
            btn.textContent = `${sizeObj.size}ml`;
            btn.dataset.price = sizeObj.price;
            btn.dataset.size = sizeObj.size;
            btn.type = "button";
            if (!sizeObj.inStock) {
              btn.disabled = true;
              btn.classList.add("out-of-stock");
            } else if (!firstAvailable) {
              firstAvailable = btn;
            }
            btn.addEventListener("click", function () {
              if (btn.disabled) return;
              // Deselect all
              modalSizes.querySelectorAll(".fragrance-size-btn").forEach(b => b.classList.remove("selected"));
              btn.classList.add("selected");
              modalPrice.textContent = `EGP${Number(btn.dataset.price).toFixed(2)}`;
              addToCartBtn.disabled = false;
              addToCartBtn.dataset.size = btn.dataset.size;
              addToCartBtn.dataset.fragranceId = fragranceId;
            });
            modalSizes.appendChild(btn);
          });
          // Auto-select first available size
          if (firstAvailable) {
            firstAvailable.click();
          } else {
            modalPrice.textContent = "Out of Stock";
            addToCartBtn.disabled = true;
          }
          openModal();
        })
        .catch((error) => {
          console.error('Error fetching fragrance details:', error);
          modalTop.textContent = modalMiddle.textContent = modalBase.textContent = "Error loading details.";
          modalSizes.innerHTML = "";
          modalPrice.textContent = "Unavailable";
          addToCartBtn.disabled = true;
          openModal();
        });
    });
  });

  // Add to Cart functionality
  addToCartBtn.addEventListener("click", async function () {
    // Check if user is logged in
    if (!window.isUserLoggedIn) {
      // Show Toastify notification for login requirement
      Toastify({
        text: "🔐 Please login to add items to your cart",
        duration: 4000,
        close: true,
        style: {
          background: "red",
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "Poppins",
        },
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      return;
    }

    const fragranceId = addToCartBtn.dataset.fragranceId;
    const size = addToCartBtn.dataset.size;
    if (!fragranceId || !size) return;

    // Get the price from the modal price display
    const priceText = modalPrice.textContent;
    const price = parseFloat(priceText.replace('EGP', '').replace(',', ''));
    
    if (!price) {
      Toastify({
        text: "❗ Unable to determine price",
        duration: 4000,
        close: true,
        style: {
          background: "red",
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "Poppins",
        },
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      return;
    }

    // Check stock - get the selected size button to check if it's in stock
    const selectedSizeBtn = modalSizes.querySelector('.fragrance-size-btn.selected');
    if (!selectedSizeBtn || selectedSizeBtn.disabled) {
      Toastify({
        text: "❗ This item is currently out of stock!",
        duration: 4000,
        close: true,
        style: {
          background: "red",
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "Poppins",
        },
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      return;
    }

    addToCartBtn.disabled = true;
    addToCartBtn.textContent = "Adding...";

    const data = { 
      productId: fragranceId, 
      size: size.replace('ml', ''), 
      price: price, 
      category: "regular" 
    };

    try {
      const response = await fetch("/api/users/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        addToCartBtn.textContent = "Added!";
        updateCartUI(result);
        
        // Show success toast
        Toastify({
          text: "✅ Added to cart successfully!",
          duration: 3000,
          close: true,
          style: {
            background: "green",
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "Poppins",
          },
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
        }).showToast();
        
        setTimeout(() => {
          closeModal();
          addToCartBtn.textContent = "Add to Cart";
          addToCartBtn.disabled = false;
        }, 1500);
      } else {
        addToCartBtn.textContent = "Error";
        Toastify({
          text: "❗ " + (result.message || "Failed to add to cart"),
          duration: 4000,
          close: true,
          style: {
            background: "red",
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "Poppins",
          },
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
        }).showToast();
        
        setTimeout(() => {
          addToCartBtn.textContent = "Add to Cart";
          addToCartBtn.disabled = false;
        }, 1200);
      }
    } catch (err) {
      addToCartBtn.textContent = "Error";
      Toastify({
        text: "🔐 Please login to add items to your cart",
        duration: 4000,
        close: true,
        style: {
          background: "red",
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "Poppins",
        },
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      
      setTimeout(() => {
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.disabled = false;
      }, 1200);
    }
  });

  // Function to update cart UI (similar to all-fragrances page)
  function updateCartUI(result) {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = result.cartCount;
    }

    const cartItemsContainer = document.querySelector(".cart-items-container");
    if (!cartItemsContainer) return;

    if (result.cartCount === 0) {
      cartItemsContainer.innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
          <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
          <h4 class="mt-3">Your cart is empty.</h4>
        </div>
      `;
      return;
    }

    // Define image maps (same as in EJS)
    const wrapImageMap = {
      "Silk Ribbon Wrap": "/img/wraps/silk-wrapper.webp",
      "Premium Gift Box": "/img/wraps/gift-box.jpg",
      "Velvet Box": "/img/wraps/gift-wrap.jpeg",
      "Leather Case": "/img/wraps/leather-case.jpg",
      "Gold Foil Wrap": "/img/wraps/gold-wrap.jpg",
      "Silver Foil Wrap": "/img/wraps/silver-wrap.jpg",
      "Floral Pattern Box": "/img/wraps/floral-box.jpeg",
      "Luxury Gift Bag": "/img/wraps/luxury-box.jpg",
      "Holiday Special": "/img/wraps/holiday-box.jpg",
    };

    const cardImageMap = {
      "Spray A Little Happiness": "/img/cards/love-card.jpg",
      "Scent With Love": "/img/cards/gift-card1.png",
      "Christmas Special": "/img/cards/christmas-card.webp",
      "Birthday Wishes": "/img/cards/birthday-card.webp",
      Anniversary: "/img/cards/anniversary-card.webp",
      "Thank You": "/img/cards/thank-you-card.jpg",
      "Valentine Special": "/img/cards/valentine-card.png",
      "Gold Luxury": "/img/cards/luxury-card.avif",
      "Floral Design": "/img/cards/floral-card.jpg",
    };

    // Fetch updated cart data
    fetch("/api/users/cart")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.cart) {
          cartItemsContainer.innerHTML = ""; // Clear existing content
          
          data.cart.forEach((item) => {
            const isGift = item.category === "gift";
            const perfumeImage = item.fragrance.image ? item.fragrance.image[0] : "/img/logo.png";
            
            // Create gift collage if it's a gift item
            let collageHTML = "";
            if (isGift) {
              collageHTML = `
                <div class="gift-collage d-flex flex-column align-items-center">
                  <div class="gift-collage-images d-flex flex-wrap justify-content-center">
                    <img src="${perfumeImage}" alt="Perfume" class="gift-collage-img" />
                    ${item.card && cardImageMap[item.card.name] ? 
                      `<img src="${cardImageMap[item.card.name]}" alt="${item.card.name}" class="gift-collage-img" />` : ''}
                    ${item.wrap && wrapImageMap[item.wrap.name] ? 
                      `<img src="${wrapImageMap[item.wrap.name]}" alt="${item.wrap.name}" class="gift-collage-img" />` : ''}
                  </div>
                </div>
              `;
            }

            const cartItemHTML = `
              <div class="row cart-item mb-3" data-price="${item.price}" data-category="${item.category}">
                <div class="col-md-3">
                  ${isGift ? collageHTML : `<img src="${perfumeImage}" alt="${item.fragrance.name}" class="img-fluid rounded" />`}
                </div>

                <div class="col-md-5 mt-3">
                  <h5 class="card-title-cart">${item.fragrance.name}</h5>
                  <p class="text-muted">Gender: ${item.fragrance.gender} | Size: ${item.size}</p>
                </div>

                <div class="col-md-4 d-flex flex-column">
                  <p class="fw-bold mb-2 text-end">${item.price} EGP</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="input-group" style="max-width: 180px">
                      ${!isGift ? 
                        `<button type="button" class="btn btn-outline-secondary btn-sm minus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">-</button>` : ''}
                      <input type="text" class="form-control form-control-sm text-center quantity-input" value="${item.quantity}" min="1" ${isGift ? 'readonly disabled' : ''} />
                      ${!isGift ? 
                        `<button type="button" class="btn btn-outline-secondary btn-sm plus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">+</button>` : ''}
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-danger trash-can-button ms-2" data-size="${item.size}" data-fragrance-id="${item.fragrance._id}" ${item.gift ? `data-gift-id="${item.gift}"` : ''}>
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;

            cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
          });

          // Attach event listeners to the new cart buttons
          attachCartEventListeners();
          updateSubtotal();
        }
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }

  // Function to attach event listeners to cart buttons
  function attachCartEventListeners() {
    // Attach event listeners to plus buttons
    document.querySelectorAll(".plus-button").forEach((button) => {
      // Remove any existing event listeners to prevent duplicates
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      newButton.addEventListener("click", async function () {
        const fragranceId = this.getAttribute("data-fragrance-id");
        const size = this.getAttribute("data-size");
        const cartItem = this.closest(".cart-item");
        const quantityInput = cartItem.querySelector(".quantity-input");
        const originalQty = parseInt(quantityInput.value);

        // Update UI immediately for better UX
        quantityInput.value = originalQty + 1;
        updateSubtotal();
        
        try {
          const response = await fetch("/api/users/increase", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: fragranceId, size }), // Use productId to match all-fragrances.js
          });
          const result = await response.json();
          if (!result.success) {
            // Revert on failure
            quantityInput.value = originalQty;
            updateSubtotal();
          }
        } catch (error) {
          console.error("Error increasing quantity:", error);
          // Revert on error
          quantityInput.value = originalQty;
          updateSubtotal();
        }
      });
    });

    // Attach event listeners to minus buttons
    document.querySelectorAll(".minus-button").forEach((button) => {
      // Remove any existing event listeners to prevent duplicates
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      newButton.addEventListener("click", async function () {
        const fragranceId = this.getAttribute("data-fragrance-id");
        const size = this.getAttribute("data-size");
        const cartItem = this.closest(".cart-item");
        const quantityInput = cartItem.querySelector(".quantity-input");
        const originalQty = parseInt(quantityInput.value);

        if (originalQty <= 1) return; // Don't allow quantity below 1

        // Update UI immediately for better UX
        quantityInput.value = originalQty - 1;
        updateSubtotal();
        
        try {
          const response = await fetch("/api/users/decrease", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: fragranceId, size }), // Use productId to match all-fragrances.js
          });
          const result = await response.json();
          if (!result.success) {
            // Revert on failure
            quantityInput.value = originalQty;
            updateSubtotal();
          }
        } catch (error) {
          console.error("Error decreasing quantity:", error);
          // Revert on error
          quantityInput.value = originalQty;
          updateSubtotal();
        }
      });
    });

    // Attach event listeners to trash buttons
    document.querySelectorAll(".trash-can-button").forEach((button) => {
      // Remove any existing event listeners to prevent duplicates
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      newButton.addEventListener("click", async function () {
        const fragranceId = this.getAttribute("data-fragrance-id");
        const size = this.getAttribute("data-size");
        const giftId = this.getAttribute("data-gift-id");
        const cartItem = this.closest(".cart-item");
        const category = cartItem.getAttribute("data-category") || "regular";
        const cartItemsContainer = document.querySelector(".cart-items-container");
        
        try {
          const response = await fetch("/api/users/removefromcart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              fragranceId, 
              size, 
              giftId,
              category 
            }),
          });
          const result = await response.json();
          if (result.success) {
            // Remove the item from UI
            cartItem.remove();
            updateSubtotal();

            // Update cart count
            const cartCount = document.getElementById("cart-count");
            if (cartCount) {
              const currentCount = parseInt(cartCount.textContent) || 0;
              cartCount.textContent = Math.max(0, currentCount - 1);
            }

            // Check if cart is empty
            const remainingItems = cartItemsContainer.querySelectorAll(".cart-item");
            if (remainingItems.length === 0) {
              cartItemsContainer.innerHTML = `
                <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
                  <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
                  <h4 class="mt-3">Your cart is empty.</h4>
                </div>
              `;
            }
          }
        } catch (error) {
          console.error("Error removing item:", error);
          alert("Error removing item. Please try again.");
        }
      });
    });
  }

  // Function to update subtotal
  function updateSubtotal() {
    const cartItems = document.querySelectorAll(".cart-item");
    let subtotal = 0;

    cartItems.forEach((item) => {
      const price = parseFloat(item.getAttribute("data-price"));
      const quantity = parseInt(item.querySelector(".quantity-input").value);
      subtotal += price * quantity;
    });

    const subtotalElement = document.querySelector(".cart-info-subtotal span");
    if (subtotalElement) {
      subtotalElement.textContent = `${subtotal} EGP`;
    }
  }
});
