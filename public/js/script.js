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
});

/**
 * Initializes all page entrance animations
 */
function initPageAnimations() {
  // Fetch all elements that need transitions
  const femaleImg = document.querySelector(".female img");
  const maleImg = document.querySelector(".male img");
  const forHerBtn = document.querySelector(".for-her");
  const forHimBtn = document.querySelector(".for-him");
  const indulgeText = document.querySelector(".text-overlay-indulge");
  const yourText = document.querySelector(".text-overlay-your");
  const journeyText = document.querySelector(".fragrance-quiz");

  // Start image transitions
  setTimeout(() => {
    if (femaleImg) femaleImg.classList.add("loaded"); // Adds the 'loaded' class (CSS transition class) to the female image.
    if (maleImg) maleImg.classList.add("loaded"); // Adds the 'loaded' class (CSS transition class) to the male image.
  }, 100); // Delays execution by 100ms to allow images to load

  // Start text transitions after images finish loading
  setTimeout(() => {
    if (indulgeText) indulgeText.classList.add("show");
    if (yourText) yourText.classList.add("show");

    // Add slight delay for buttons to appear after the text
    setTimeout(() => {
      if (forHimBtn) forHimBtn.classList.add("show");
      if (forHerBtn) forHerBtn.classList.add("show");

      // Show journey text at the same time as buttons
      if (journeyText) journeyText.classList.add("show");
    }, 130); // Delayed button appearance
  }, 200); // Delays text transition slightly
}


function initGenderHoverEffects() {
  const leftContainer = document.querySelector(".left-container");
  const rightContainer = document.querySelector(".right-container");
  const forHerBtn = document.querySelector(".for-her");
  const forHimBtn = document.querySelector(".for-him");
  const femaleDiv = document.querySelector(".female"); // Select the PARENT div for flex
  const maleDiv = document.querySelector(".male");     // Select the PARENT div for flex
  const your = document.querySelector(".text-overlay-your");
  const indulge = document.querySelector(".text-overlay-indulge");
  const leftParagraphs = leftContainer.querySelectorAll("p");
  const rightParagraphs = rightContainer.querySelectorAll("p");
  const leftBtn = leftContainer.querySelector(".explore-fragrances");
  const rightBtn = rightContainer.querySelector(".explore-fragrances");
  const genderContainer = document.querySelector(".gender");
  const transitionContainer = document.querySelector(".transition-container");

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
    maleCanvas
  ];
  
  elementsToHide.forEach(el => {
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
  })

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
    leftParagraphs.forEach(p => p.classList.add("show"));
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
    leftParagraphs.forEach(p => p.classList.remove("show"));
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
    rightParagraphs.forEach(p => p.classList.add("show"));
    maleDiv.style.flexGrow = "1.5";    // Increase the size of the male DIV
    femaleDiv.style.flexGrow = "0.5";  // Decrease the size of the female DIV
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
    rightParagraphs.forEach(p => p.classList.remove("show"));
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

  if (!slider || !prevBtn || !nextBtn || cards.length === 0 || !productDetails) return;

  const visibleCards = 3;
  const cardMargin = 160;
  const cardCount = cards.length;
  const cardWidth = slider.offsetWidth / visibleCards - cardMargin * 2;

  // Duplicate first and last few cards for seamless looping
  const firstClones = cards.slice(0, visibleCards).map((card) => card.cloneNode(true));
  const lastClones = cards.slice(-visibleCards).map((card) => card.cloneNode(true));

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
    productDetails.querySelector(".product-description").textContent = description;
    productDetails.querySelector(".rating-score").textContent = rating;
    productDetails.querySelector(".product-size").textContent = size;
    productDetails.querySelector(".product-price").textContent = price;
  }

  function updateActiveCard() {
    cards.forEach((card, index) => {
      const isActive = index === cardIndex + 1;
      card.classList.toggle("active", isActive);
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
  const popupOverlay = document.querySelector('.popup-overlay');
  const popupClose = document.querySelector('.popup-close');
  const popupBtn = document.querySelector('.popup-btn');
  
  if (!popupOverlay || !popupClose || !popupBtn) return;
  
  // Show popup after 5 seconds (5000ms)
  setTimeout(() => {
    // Store current scroll position
    const scrollY = window.scrollY;
    
    // Add active class to show the popup
    popupOverlay.classList.add('active');
    document.body.classList.add('popup-active');
    
    // Disable scrolling while keeping the same visual position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  }, 5000);
  
  // Function to close popup and restore page functionality
  function closePopup() {
    // Remove active classes
    popupOverlay.classList.remove('active');
    document.body.classList.remove('popup-active');
    
    // Re-enable scrolling and restore position
    const scrollY = parseInt(document.body.style.top || '0') * -1;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Don't manually scroll, browser will maintain position naturally
  }
  
  // Close popup when X is clicked
  popupClose.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default behavior that might cause page to scroll
    closePopup();
  });
  
  // Close popup when button is clicked and open login modal
  popupBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default behavior that might cause page to scroll
    closePopup();
    
    // Open the login modal using Bootstrap's modal API
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
  });
  
  // Close popup when clicking outside the popup container
  popupOverlay.addEventListener('click', (e) => {
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
    document.querySelector('.gender'),
    document.querySelector('.quality-model-section'),
    document.querySelector('.product-slider-section'),
    document.querySelector('footer')
  ];
  
  // Filter out any null sections (in case they don't exist)
  const validSections = sections.filter(section => section !== null);
  
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
  const modelViewer = document.getElementById('model-viewer');
  
  // Set initial section heights to viewport height for proper scrolling
  validSections.forEach(section => {
    section.style.minHeight = '100vh';
    section.style.scrollMarginTop = '0';
  });
  
  // Add event listeners for mouse over/out of model viewer
  if (modelViewer) {
    // Disable smooth scrolling when mouse is over the model viewer
    modelViewer.addEventListener('mouseenter', () => {
      isOverModelViewer = true;
    });
    
    // Re-enable smooth scrolling when mouse leaves the model viewer
    modelViewer.addEventListener('mouseleave', () => {
      isOverModelViewer = false;
    });
    
    // Also track touch events for mobile
    modelViewer.addEventListener('touchstart', () => {
      isOverModelViewer = true;
    });
    
    modelViewer.addEventListener('touchend', () => {
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
      const sectionCenter = sectionTop + (sectionHeight / 2);
      const distanceToCenter = Math.abs(scrollPosition + (windowHeight / 2) - sectionCenter);
      
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
      behavior: 'smooth',
      block: 'start'
    });
    
    // Reset isScrolling after animation completes
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, scrollAnimationDuration); // Use animation duration instead of throttle time
  }
  
  // Handle wheel events for smooth scrolling with minimal delay
  window.addEventListener('wheel', function(e) {
    // Skip if scrolling animation is in progress, smooth scrolling is disabled,
    // popup is active, or mouse is over the 3D model viewer
    if (isScrolling || !smoothScrollingEnabled || 
        document.body.classList.contains('popup-active') || 
        isOverModelViewer) {
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
    
  }, { passive: false });
  
  // Completely prevent normal scrolling to avoid interference
  window.addEventListener('scroll', function(e) {
    if (isScrolling) return; // Allow programmatic scrolling
    
    // If not currently in a programmatic scroll, snap to nearest section
    if (smoothScrollingEnabled && 
        !document.body.classList.contains('popup-active') && 
        !isOverModelViewer) {
      
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
  window.addEventListener('keydown', function(e) {
    // Skip if scrolling animation is in progress, smooth scrolling is disabled,
    // popup is active, or focus is on the 3D model viewer
    if (isScrolling || !smoothScrollingEnabled || 
        document.body.classList.contains('popup-active') || 
        isOverModelViewer) {
      return;
    }
    
    // Throttle key events, but less aggressively
    const now = Date.now();
    if (now - lastScrollTime < scrollThrottleTime) {
      e.preventDefault();
      return;
    }
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      lastScrollTime = now;
      requestAnimationFrame(() => {
        scrollToSection(currentSectionIndex + 1);
      });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
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
  
  window.addEventListener('touchstart', function(e) {
    if (isOverModelViewer || isScrolling || !smoothScrollingEnabled || 
        document.body.classList.contains('popup-active')) {
      return;
    }
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  window.addEventListener('touchend', function(e) {
    if (isOverModelViewer || isScrolling || !smoothScrollingEnabled || 
        document.body.classList.contains('popup-active')) {
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
  }, { passive: false });
  
  // Toggle smooth scrolling when popup is shown/hidden
  const popupOverlay = document.querySelector('.popup-overlay');
  if (popupOverlay) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const isActive = popupOverlay.classList.contains('active');
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
  window.addEventListener('load', function() {
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
  const reviewsContainer = document.getElementById('reviews-container');
  const navDots = document.querySelectorAll('.reviews-nav-dot');
  
  if (!reviewsContainer || navDots.length === 0) return;
  
  // Get all review cards (these are now generated from real database data)
  const reviewCards = Array.from(document.querySelectorAll('.review-card'));
  
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
      dot.classList.toggle('active', i === pageIndex);
    });

    // Hide all cards first with fade out
    reviewCards.forEach(card => {
      card.classList.add('fading-out');
      card.classList.remove('fading-in');
    });
    
    // After fade out, show the cards for the current page
    setTimeout(() => {
      reviewCards.forEach((card, index) => {
        const cardPageIndex = Math.floor(index / reviewsPerPage);
        if (cardPageIndex === pageIndex) {
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.remove('fading-out');
            card.classList.add('fading-in');
          }, 30);
        } else {
          card.style.display = 'none';
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
      dot.addEventListener('click', function() {
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

document.addEventListener('DOMContentLoaded', function() {
    const forHerButton = document.querySelector('.for-her');
    const forHimButton = document.querySelector('.for-him');
    const genderContainer = document.querySelector('.gender');
    const transitionContainer = document.querySelector('.transition-container');
    const transitionImage = document.querySelector('#transition-img');

    // Initialize existing elements
    const textOverlayIndulge = document.querySelector('.text-overlay-indulge');
    const textOverlayYour = document.querySelector('.text-overlay-your');
    const leftContainer = document.querySelector('.left-container p');
    const rightContainer = document.querySelector('.right-container p');
    const exploreButtons = document.querySelectorAll('.explore-fragrances');
    const forHerBtn = document.querySelector('.for-her');
    const forHimBtn = document.querySelector('.for-him');
    const fragranceQuiz = document.querySelector('.fragrance-quiz');
    

    function handleGenderSelection(gender) {
        const imagePath = gender === 'her' ? './img/girlTestCopy.jpg' : 'https://m.media-amazon.com/images/I/71jzd3LtzPL._AC_UF1000,1000_QL80_.jpg';
        
        if (!genderContainer || !transitionContainer || !transitionImage) return;

        // Set the transition image
        transitionImage.src = imagePath;
        
        // Add transitioning class to fade out content
        genderContainer.classList.add('transitioning');
        
        // After content starts fading out, show the transition image
        setTimeout(() => {
            transitionContainer.classList.add('active');
        }, 100);
        // Show transition container with overlay
        transitionContainer.classList.add('active');
        
        // Set up scroll button handlers
        const upButton = transitionContainer.querySelector('.scroll-btn.up');
        const downButton = transitionContainer.querySelector('.scroll-btn.down');
        
        upButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add scroll up functionality
        });
        
        downButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add scroll down functionality
        });
    }

    // Event listeners for buttons
    if (forHerButton) {
        forHerButton.addEventListener('click', () => handleGenderSelection('her'));
    }
    
    if (forHimButton) {
        forHimButton.addEventListener('click', () => handleGenderSelection('him'));
    }    // Remove any auto-initialization of show classes
    // Elements will be shown on hover instead

    setTimeout(() => {
        if (fragranceQuiz) fragranceQuiz.classList.add('show');
    }, 2500);
})
};