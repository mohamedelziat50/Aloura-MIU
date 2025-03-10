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


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");
    const loginModalLabel = document.getElementById("loginModalLabel");
    const modalDescription = document.querySelector(".modal-description");
    const phoneInput = document.getElementById("phone");
    const countryCodeSelect = document.getElementById("countryCode");

    // List of all countries with their codes and flags
    const countryCodes = [
        { name: "United States", code: "+1", flag: "🇺🇸" },
        { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
        { name: "Canada", code: "+1", flag: "🇨🇦" },
        { name: "India", code: "+91", flag: "🇮🇳" },
        { name: "Germany", code: "+49", flag: "🇩🇪" },
        { name: "France", code: "+33", flag: "🇫🇷" },
        { name: "Australia", code: "+61", flag: "🇦🇺" },
        { name: "China", code: "+86", flag: "🇨🇳" },
        { name: "Japan", code: "+81", flag: "🇯🇵" },
        { name: "Brazil", code: "+55", flag: "🇧🇷" },
        { name: "South Africa", code: "+27", flag: "🇿🇦" },
        { name: "Russia", code: "+7", flag: "🇷🇺" },
        { name: "Mexico", code: "+52", flag: "🇲🇽" },
        { name: "Italy", code: "+39", flag: "🇮🇹" },
        { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
        { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
        { name: "South Korea", code: "+82", flag: "🇰🇷" },
        { name: "Indonesia", code: "+62", flag: "🇮🇩" },
        { name: "Turkey", code: "+90", flag: "🇹🇷" },
        { name: "Netherlands", code: "+31", flag: "🇳🇱" },
        { name: "Spain", code: "+34", flag: "🇪🇸" },
        { name: "Sweden", code: "+46", flag: "🇸🇪" },
        { name: "Switzerland", code: "+41", flag: "🇨🇭" },
        { name: "Argentina", code: "+54", flag: "🇦🇷" },
        { name: "Nigeria", code: "+234", flag: "🇳🇬" },
        { name: "Egypt", code: "+20", flag: "🇪🇬" },
        { name: "Pakistan", code: "+92", flag: "🇵🇰" },
        { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
        { name: "Philippines", code: "+63", flag: "🇵🇭" },
        { name: "Malaysia", code: "+60", flag: "🇲🇾" },
        { name: "Thailand", code: "+66", flag: "🇹🇭" },
        { name: "Vietnam", code: "+84", flag: "🇻🇳" },
        { name: "Colombia", code: "+57", flag: "🇨🇴" },
        { name: "Poland", code: "+48", flag: "🇵🇱" },
        { name: "Ukraine", code: "+380", flag: "🇺🇦" }
    ];

    // Populate the country code dropdown
    countryCodes.forEach(country => {
        const option = document.createElement("option");
        option.value = country.code;
        option.textContent = `${country.flag} ${country.name} (${country.code})`;
        countryCodeSelect.appendChild(option);
    });

    // Switch to Sign-up Form
    document.getElementById("showSignUpForm").addEventListener("click", function () {
        loginForm.style.display = "none";
        signUpForm.style.display = "block";
        loginModalLabel.textContent = "Sign Up";
        modalDescription.style.display = "none"; // Hide the description
    });

    // Switch back to Login Form
    document.getElementById("showLoginForm").addEventListener("click", function () {
        loginForm.style.display = "block";
        signUpForm.style.display = "none";
        loginModalLabel.textContent = "Login";
        modalDescription.style.display = "block"; // Show the description again
        modalDescription.textContent = "Please enter your e-mail and password:";
    });

    // Restrict Phone Number Input to Only Numbers
    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, ''); // Removes all non-numeric characters
        });
    }

    // Combine Country Code with Phone Number before Submission
    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        const fullPhoneNumber = countryCodeSelect.value + phoneInput.value;
        console.log("Full Phone Number:", fullPhoneNumber);
        alert("Phone Number Submitted: " + fullPhoneNumber);
        // You can now send fullPhoneNumber to your backend
    });
});

