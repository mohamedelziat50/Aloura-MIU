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
      modalDescription.textContent = "Please fill in your information to create an account:";
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

// ============ Password toggle functionality ============
document.addEventListener('DOMContentLoaded', function() {
  // Login form password toggle
  const passwordToggle = document.getElementById('passwordToggle');
  const passwordInput = document.getElementById('password');
  const passwordIcon = document.getElementById('passwordIcon');
  
  if (passwordToggle && passwordInput && passwordIcon) {
    passwordToggle.addEventListener('click', function() {
      // Toggle password visibility
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.classList.remove('fa-lock');
        passwordIcon.classList.add('fa-lock-open');
      } else {
        passwordInput.type = 'password';
        passwordIcon.classList.remove('fa-lock-open');
        passwordIcon.classList.add('fa-lock');
      }
    });
  }
  
  // Signup form password toggle
  const signupPasswordToggle = document.getElementById('signupPasswordToggle');
  const signupPasswordInput = document.getElementById('signup-password');
  const signupPasswordIcon = document.getElementById('signupPasswordIcon');
  
  if (signupPasswordToggle && signupPasswordInput && signupPasswordIcon) {
    signupPasswordToggle.addEventListener('click', function() {
      if (signupPasswordInput.type === 'password') {
        signupPasswordInput.type = 'text';
        signupPasswordIcon.classList.remove('fa-lock');
        signupPasswordIcon.classList.add('fa-lock-open');
      } else {
        signupPasswordInput.type = 'password';
        signupPasswordIcon.classList.remove('fa-lock-open');
        signupPasswordIcon.classList.add('fa-lock');
      }
    });
  }
  
  // Confirm password toggle
  const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
  const confirmPasswordInput = document.getElementById('signup-confirm-password');
  const confirmPasswordIcon = document.getElementById('confirmPasswordIcon');
  
  if (confirmPasswordToggle && confirmPasswordInput && confirmPasswordIcon) {
    confirmPasswordToggle.addEventListener('click', function() {
      if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        confirmPasswordIcon.classList.remove('fa-lock');
        confirmPasswordIcon.classList.add('fa-lock-open');
      } else {
        confirmPasswordInput.type = 'password';
        confirmPasswordIcon.classList.remove('fa-lock-open');
        confirmPasswordIcon.classList.add('fa-lock');
      }
    });
  }
});

