document.addEventListener("DOMContentLoaded", function () {
  //Ensures the JavaScript runs only after the HTML document is fully loaded.
  //Once the HTML document is fully loaded, these functions are called.

  // Initialize page animations
  initPageAnimations();

  // Initialize product slider
  initProductSlider();
  
  // Initialize popup with 5 second delay
  initPopup();
  
  // Initialize smooth section scrolling
  initSmoothSectionScrolling();
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
  const journeyText = document.querySelector(".journey-text");

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
      
      // Show journey text at the same time as buttons
      if (journeyText) {
        journeyText.classList.add("show");
      }
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

document.addEventListener("DOMContentLoaded", function () {
  const heading = document.querySelector(".grey-content h2");
  const glow = document.querySelector(".glow");

  // Trigger animations after a short delay (e.g., 500ms)
  setTimeout(() => {
    heading.classList.add("visible"); // Zoom in the heading
    glow.classList.add("visible"); // Add glow effect
  }, 100); // Adjust the delay as needed
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
    
    // Scroll back to the original position
    window.scrollTo(0, scrollY);
  }
  
  // Close popup when X is clicked
  popupClose.addEventListener('click', closePopup);
  
  // Close popup when button is clicked and open login modal
  popupBtn.addEventListener('click', () => {
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


