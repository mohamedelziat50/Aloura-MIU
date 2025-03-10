// Add this at the start of your script file, outside any other functions
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements that need transitions
    const femaleImg = document.querySelector('.female img');
    const maleImg = document.querySelector('.male img');
    const buttons = document.querySelectorAll('.text-overlay button');
    const indulgeText = document.querySelector('.text-overlay-indulge');
    const yourText = document.querySelector('.text-overlay-your');

    // Start image transitions
    setTimeout(() => {
        femaleImg.classList.add('loaded');
        maleImg.classList.add('loaded');
    }, 100); // Small delay to ensure CSS is ready

    // Start text transitions after images finish their transition
    setTimeout(() => {
        indulgeText.classList.add('show');
        yourText.classList.add('show');
        
        // Add slight delay for buttons to appear after the text
        setTimeout(() => {
            buttons.forEach(button => {
                button.classList.add('show');
                // Make buttons clickable after they appear
                button.style.pointerEvents = 'auto';
            });
        }, 130);
    }, 1000); // Increased delay to ensure images are fully loaded
});

function changeImages(gender) {
  let femaleDiv = document.querySelector(".female");
  let maleDiv = document.querySelector(".male");
  let femaleImg = document.getElementById("female-img");
  let maleImg = document.getElementById("male-img");
  let transitionContainer = document.querySelector(".transition-container");
  let transitionImg = document.getElementById("transition-img");
  
  // Get and hide the text overlays
  document.querySelector(".text-overlay-indulge").classList.add("hidden");
  document.querySelector(".text-overlay-your").classList.add("hidden");

  // Set the transition image based on gender
  if (gender === "female") {
    transitionImg.src = "https://www.perfumestars.com/wp-content/uploads/2024/12/burberry-her-eau-de-parfum-intense-new-fragrance-2024.jpg";
  } else if (gender === "male") {
    transitionImg.src = "https://cdn.shopify.com/s/files/1/0524/6733/5333/files/Versace_Eros-5_480x480.jpg?v=1609687512";
  }

  // Hide both gender containers
  femaleDiv.classList.add("hidden");
  maleDiv.classList.add("hidden");

  // Show the transition container
  transitionContainer.classList.add("active");
}


document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      // If at the very top of the page, reset to the initial state
      nav.classList.remove('nav-visible', 'hidden'); 
    } else if (currentScrollY > lastScrollY) {
      // Hide navbar when scrolling down
      nav.classList.add('hidden');
      nav.classList.remove('nav-visible');
    } else {
      // Show navbar when scrolling up
      nav.classList.remove('hidden');
      nav.classList.add('nav-visible');
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


