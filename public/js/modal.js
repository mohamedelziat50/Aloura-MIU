document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const forgetpasswordForm = document.getElementById("forgetpasswordform");
  const twofactorForm = document.getElementById("twofactor");

  const loginModalLabel = document.getElementById("loginModalLabel");
  const modalDescription = document.querySelector(".modal-description");
  const phoneInput = document.getElementById("phone");
  const countryCodeSelect = document.getElementById("countryCode");

  // List of all countries with their codes and flags
  const countryCodes = [
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+1", flag: "🇨🇦" },
    { code: "+91", flag: "🇮🇳" },
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
    { name: "Ukraine", code: "+380", flag: "🇺🇦" },
  ];

  // Populate the country code dropdown
  countryCodes.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.code;
    option.textContent = `${country.flag} ${country.name} (${country.code})`;
    countryCodeSelect.appendChild(option);
  });

  // Switch to Sign-up Form
  document
    .getElementById("showSignUpForm")
    .addEventListener("click", function () {
      loginForm.style.display = "none";
      signUpForm.style.display = "block";
      loginModalLabel.textContent = "Sign Up";
      modalDescription.style.display = "none"; // Hide the description
    });
  // show the 2fa form
  document.getElementById("show2fa").addEventListener("click", function () {
    loginForm.style.display = "none";
    twofactorForm.style.display = "block";
    loginModalLabel.textContent = "verification";
    modalDescription.style.display = "none"; // Hide the description
  });

  // funtion to clear the fields in the verification form
  document.getElementById("clearfield").addEventListener("click", function () {
    const verificationInputs = document.querySelectorAll(
      "#twofactor input[type='tel']"
    );
    verificationInputs.forEach((input) => {
      input.value = ""; // Clear the input field
    });
  });

  document
    .getElementById("showforgetpassword")
    .addEventListener("click", function () {
      loginForm.style.display = "none";
      forgetpasswordForm.style.display = "";
      loginModalLabel.textContent = "Forget password";
      modalDescription.style.display = "none"; // Hide the description
    });

  // Switch back to Login Form
  document
    .getElementById("showLoginForm")
    .addEventListener("click", function () {
      loginForm.style.display = "block";
      signUpForm.style.display = "none";
      loginModalLabel.textContent = "Login";
      modalDescription.style.display = "block"; // Show the description again
      modalDescription.textContent = "Please enter your e-mail and password:";
    });
  //switch back to login form from forget password form
  document
    .getElementById("showLoginForm1")
    .addEventListener("click", function () {
      loginForm.style.display = "block";
      forgetpasswordForm.style.display = "none";
      loginModalLabel.textContent = "Login";
      modalDescription.style.display = "block"; // Show the description again
      modalDescription.textContent = "Please enter your e-mail and password:";
    });

  // Restrict Phone Number Input to Only Numbers
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, ""); // Removes all non-numeric characters
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

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents form from submitting

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Check credentials
      if (email === "admin@gmail.com" && password === "admin") {
        window.location.href = "/public/pages/admin.html"; // Redirect to admin page
      } else {
        alert("Invalid email or password");
      }
    });
});

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const links = document.querySelector(".links");
  const overlay = document.querySelector(".menu-overlay");
  const body = document.body;

  function toggleMenu() {
    links.classList.toggle("active");
    overlay.classList.toggle("active");
    body.style.overflow = links.classList.contains("active") ? "hidden" : "";
  }

  mobileMenuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking a link
  const menuLinks = document.querySelectorAll(".links a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  // Close menu on window resize if open
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && links.classList.contains("active")) {
      toggleMenu();
    }
  });
});
