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
  
  // All review card data - we'll use these to rotate new content into the cards
  const allReviews = [
    // First set (already displayed)
    {
      text: '"Absolutely stunning fragrance that lasted all day. The quality is evident from the first spray - complex, sophisticated, and truly unique."',
      name: 'Sarah Johnson',
      location: 'New York, USA',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      stars: 5
    },
    {
      text: '"I\'ve tried many luxury fragrances over the years, but Aloura stands out for its exceptional longevity and silage. Worth every penny!"',
      name: 'Michael Reynolds',
      location: 'London, UK',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      stars: 5
    },
    {
      text: '"The attention to detail in these fragrances is remarkable. Each note unfolds beautifully throughout the day, receiving compliments wherever I go."',
      name: 'Emma Chen',
      location: 'Toronto, Canada',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      stars: 4
    },
    // Second set
    {
      text: '"I bought this as a gift for my husband, and he absolutely loves it. The scent is masculine but not overwhelming, perfect for daily wear."',
      name: 'Jennifer Thompson',
      location: 'Sydney, Australia',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      stars: 5
    },
    {
      text: '"The packaging alone speaks volumes about the quality. When I opened the box, I knew I was in for something special. The fragrance did not disappoint!"',
      name: 'David Miller',
      location: 'Chicago, USA',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      stars: 5
    },
    {
      text: '"As someone who is very particular about fragrances, I can confidently say that Aloura stands among the best I\'ve ever tried. Worth the investment."',
      name: 'Sophie Martin',
      location: 'Paris, France',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
      stars: 4
    },
    // Third set
    {
      text: '"The versatility of this fragrance is impressive. Works perfectly from office meetings to evening events. I get compliments every time I wear it."',
      name: 'James Wilson',
      location: 'Berlin, Germany',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      stars: 5
    },
    {
      text: '"I\'ve been using this fragrance for 3 months now and it still smells as amazing as the first day. The bottle design is also a beautiful addition to my vanity."',
      name: 'Aisha Khan',
      location: 'Dubai, UAE',
      avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
      stars: 5
    },
    {
      text: '"I was hesitant about ordering a fragrance online without smelling it first, but the reviews convinced me. So glad I took the chance - it\'s absolutely divine!"',
      name: 'Robert Lee',
      location: 'Singapore',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      stars: 5
    },
    // Fourth set
    {
      text: '"Purchased this after a friend recommended it, and I\'m blown away by how well it lasts. Even after a full day, the scent remains elegant and pronounced."',
      name: 'Elena Gonzalez',
      location: 'Madrid, Spain',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      stars: 5
    },
    {
      text: '"The customer service was exceptional when I had questions about the fragrance notes. The perfume itself exceeded my expectations - rich and sophisticated."',
      name: 'Omar Hassan',
      location: 'Cairo, Egypt',
      avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
      stars: 4
    },
    {
      text: '"I love how this fragrance evolves throughout the day. The initial notes are bright and fresh, while the dry down is warm and comforting. Perfect complexity!"',
      name: 'Mia Anderson',
      location: 'Stockholm, Sweden',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      stars: 5
    }
  ];
  
  // Get all review cards
  const reviewCards = Array.from(document.querySelectorAll('.review-card'));
  
  // Keep track of which set we're displaying (0-3)
  let currentSetIndex = 0;
  
  // Keep track of which card is currently being updated (0-2)
  let currentCardIndex = 0;
  
  // Flag to prevent multiple transitions
  let isTransitioning = false;
  
  // Function to update a specific card with new content
  function updateCard(cardIndex, reviewData) {
    const card = reviewCards[cardIndex];
    
    // Start fade out
    card.classList.add('fading-out');
    card.classList.remove('fading-in');
    
    // After fade out, update content and fade back in
    setTimeout(() => {
      // Update stars
      const starsContainer = card.querySelector('.review-card-stars');
      starsContainer.innerHTML = Array(5).fill('').map((_, i) => 
        i < reviewData.stars 
          ? '<i class="fa-solid fa-star"></i>' 
          : '<i class="fa-regular fa-star"></i>'
      ).join('');
      
      // Update text
      card.querySelector('.review-card-text').textContent = reviewData.text;
      
      // Update reviewer info
      card.querySelector('.review-card-avatar img').src = reviewData.avatar;
      card.querySelector('.review-card-avatar img').alt = reviewData.name;
      card.querySelector('.review-card-name').textContent = reviewData.name;
      card.querySelector('.review-card-location').textContent = reviewData.location;
      
      // Fade back in
      setTimeout(() => {
        card.classList.remove('fading-out');
        card.classList.add('fading-in');
        
        // If this is the last card in the rotation, we're done transitioning
        if (cardIndex === 2) {
          setTimeout(() => {
            isTransitioning = false;
          }, 300);
        }
      }, 30);
    }, 300);
  }
  
  // Function to update all cards in the set
  function updateCardsSet(setIndex) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Update active navigation dot
    navDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === setIndex);
    });
    
    // Get the starting index for the reviews in this set
    const startReviewIndex = setIndex * 3;
    
    // Start cycling through each card with a delay between them
    setTimeout(() => updateCard(0, allReviews[startReviewIndex]), 0);
    setTimeout(() => updateCard(1, allReviews[startReviewIndex + 1]), 400);
    setTimeout(() => updateCard(2, allReviews[startReviewIndex + 2]), 800);
  }
  
  // Add click event listeners to nav dots
  navDots.forEach((dot) => {
    dot.addEventListener('click', function() {
      const newSetIndex = parseInt(this.dataset.index);
      if (newSetIndex === currentSetIndex || isTransitioning) return;
      currentSetIndex = newSetIndex;
      updateCardsSet(currentSetIndex);
    });
  });
  
  // Auto rotate through sets every 10 seconds (reduced from 15 seconds)
  setInterval(() => {
    if (isTransitioning) return;
    currentSetIndex = (currentSetIndex + 1) % 4; // We have 4 sets
    updateCardsSet(currentSetIndex);
  }, 10000);
}


