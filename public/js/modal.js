document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const forgetpasswordForm = document.getElementById("forgetpasswordform");
  const twofactorForm = document.getElementById("twofactor");
  const backArrow = document.getElementById("backToLogin");
  const loginModalLabel = document.getElementById("loginModalLabel");
  const modalDescription = document.querySelector(".modal-description");
  const phoneInput = document.getElementById("phone");


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
    backArrow.style.display = "block";
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


  // Add back button functionality for 2FA form
  document.getElementById("backToLogin").addEventListener("click", function () {
    twofactorForm.style.display = "none";
    loginForm.style.display = "block";
    loginModalLabel.textContent = "Login";
    modalDescription.style.display = "block";
    modalDescription.textContent = "Please enter your e-mail and password:";
    backArrow.style.display = "none";
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
        window.location.href = "/admin"; // Redirect to admin page
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
