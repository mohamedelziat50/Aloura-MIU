import showFunToast from "./toast.js";

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
  const showSignUpFormBtn = document.getElementById("showSignUpForm");
  if (showSignUpFormBtn) {
    showSignUpFormBtn.addEventListener("click", function () {
      loginForm.style.display = "none";
      signUpForm.style.display = "block";
      loginModalLabel.textContent = "Sign Up";
      modalDescription.textContent =
        "Please fill in your information to create an account:";
    });
  }

  // show the 2fa form
  const show2faBtn = document.getElementById("show2fa");
  if (show2faBtn) {
    show2faBtn.addEventListener("click", function () {
      loginForm.style.display = "none";
      twofactorForm.style.display = "block";
      loginModalLabel.textContent = "verification";
      loginModalLabel.classList.add("verification-title");
      modalDescription.style.display = "none"; // Hide the description
      backArrow.style.display = "block";
    });
  }

  // funtion to clear the fields in the verification form
  const clearfieldBtn = document.getElementById("clearfield");
  if (clearfieldBtn) {
    clearfieldBtn.addEventListener("click", function () {
      const verificationInputs = document.querySelectorAll(
        "#twofactor input[type='tel']"
      );
      verificationInputs.forEach((input) => {
        input.value = ""; // Clear the input field
      });
    });
  }

  // Switch to Forget Password Form
  const showforgetpasswordBtn = document.getElementById("showforgetpassword");
  if (showforgetpasswordBtn) {
    showforgetpasswordBtn.addEventListener("click", function () {
      loginForm.style.display = "none";
      forgetpasswordForm.style.display = "block";
      loginModalLabel.textContent = "Reset Password";
      loginModalLabel.classList.add("verification-title");
      modalDescription.style.display = "block";
      modalDescription.textContent =
        "Enter your email address and we'll send you a link to reset your password";
    });
  }

  // Switch back to Login Form from Sign-up Form
  const showLoginFormBtn = document.getElementById("showLoginForm");
  if (showLoginFormBtn) {
    showLoginFormBtn.addEventListener("click", function () {
      console.log("Switching back to login form from sign-up");
      loginForm.style.display = "block";
      signUpForm.style.display = "none";
      loginModalLabel.textContent = "Login";
      modalDescription.style.display = "block"; // Show the description again
      modalDescription.textContent = "Please enter your e-mail and password:";
    });
  }

  // Switch back to Login Form from Forget Password Form
  const showLoginForm1Btn = document.getElementById("showLoginForm1");
  if (showLoginForm1Btn) {
    showLoginForm1Btn.addEventListener("click", function () {
      loginForm.style.display = "block";
      forgetpasswordForm.style.display = "none";
      loginModalLabel.textContent = "Login";
      loginModalLabel.classList.remove("verification-title");
      modalDescription.style.display = "block";
      modalDescription.textContent = "Please enter your e-mail and password:";
    });
  }

  // Restrict Phone Number Input to Only Numbers
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, ""); // Removes all non-numeric characters
    });
  }

  // Add back button functionality for 2FA form
  if (backArrow) {
    backArrow.addEventListener("click", function () {
      twofactorForm.style.display = "none";
      loginForm.style.display = "block";
      loginModalLabel.textContent = "Login";
      loginModalLabel.classList.remove("verification-title");
      modalDescription.style.display = "block";
      modalDescription.textContent = "Please enter your e-mail and password:";
      backArrow.style.display = "none";
    });
  }
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
document.addEventListener("DOMContentLoaded", function () {
  // Login form password toggle
  const passwordToggle = document.getElementById("passwordToggle");
  const passwordInput = document.getElementById("password");
  const passwordIcon = document.getElementById("passwordIcon");

  if (passwordToggle && passwordInput && passwordIcon) {
    passwordToggle.addEventListener("click", function () {
      // Toggle password visibility
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.remove("fa-lock");
        passwordIcon.classList.add("fa-lock-open");
      } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove("fa-lock-open");
        passwordIcon.classList.add("fa-lock");
      }
    });
  }

  // Signup form password toggle
  const signupPasswordToggle = document.getElementById("signupPasswordToggle");
  const signupPasswordInput = document.getElementById("signup-password");
  const signupPasswordIcon = document.getElementById("signupPasswordIcon");

  if (signupPasswordToggle && signupPasswordInput && signupPasswordIcon) {
    signupPasswordToggle.addEventListener("click", function () {
      if (signupPasswordInput.type === "password") {
        signupPasswordInput.type = "text";
        signupPasswordIcon.classList.remove("fa-lock");
        signupPasswordIcon.classList.add("fa-lock-open");
      } else {
        signupPasswordInput.type = "password";
        signupPasswordIcon.classList.remove("fa-lock-open");
        signupPasswordIcon.classList.add("fa-lock");
      }
    });
  }

  // Confirm password toggle
  const confirmPasswordToggle = document.getElementById(
    "confirmPasswordToggle"
  );
  const confirmPasswordInput = document.getElementById(
    "signup-confirm-password"
  );
  const confirmPasswordIcon = document.getElementById("confirmPasswordIcon");

  if (confirmPasswordToggle && confirmPasswordInput && confirmPasswordIcon) {
    confirmPasswordToggle.addEventListener("click", function () {
      if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        confirmPasswordIcon.classList.remove("fa-lock");
        confirmPasswordIcon.classList.add("fa-lock-open");
      } else {
        confirmPasswordInput.type = "password";
        confirmPasswordIcon.classList.remove("fa-lock-open");
        confirmPasswordIcon.classList.add("fa-lock");
      }
    });
  }
});

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form from submitting

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const phone = document.getElementById("signup-phone").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;

  // Validation
  if (name === "") {
    showFunToast("❗ Please enter your name.", "red");
    return;
  }

  if (name.length < 3) {
    showFunToast("👶 Too tiny! Username needs 3+ characters.", "red");
    return;
  }
  if (name.length > 50) {
    showFunToast(
      "📏 Whoa! Username's way too long. Keep it under 50 characters!",
      "red"
    );
    return;
  }

  if (email === "" || !validateEmail(email)) {
    showFunToast("📧 Please enter a valid email address.", "red");
    return;
  }

  if (phone === "" || !validatePhone(phone)) {
    showFunToast("📱 Please enter a valid phone number.", "red");
    return;
  }

  if (password.length < 6) {
    showFunToast("🔒 Password must be at least 6 characters long.", "red");
    return;
  }

  if (password !== confirmPassword) {
    showFunToast("🔒 Passwords do not match.", "red");
    return;
  }

  const formData = {
    name,
    email,
    phone,
    password,
  };

  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        showFunToast(data.message || "✅ Signed up successfully!", "green");
        setTimeout(() => {
          window.location.href = "/"; // Redirect to the user's page
        }, 1000);
      } else {
        showFunToast(data.message || "❗ An error occurred.", "red");
      }
    })
    .catch((error) => {
      showFunToast(error.message || "❗ An error occurred.", "red");
    });
});

// Helper functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9]{10,15}$/;
  return re.test(phone);
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form from submitting

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validation before sending request
  if (email === "" || !validateEmail(email)) {
    showFunToast("📧 Please enter a valid email address.", "red");
    return;
  }

  const formData = {
    email,
    password,
  };

  fetch("http://localhost:3000/login", {
    method: "POST",
    credentials: "include", // ← important!
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        showFunToast(data.message || "✅ Signed in successfully!", "green");
        setTimeout(() => {
          window.location.href = `/${data.user.role}/${data.user.id}`; // Redirect to the user's page
        }, 1000);
      } else {
        showFunToast(data.message || "❗ An error occurred.", "red");
      }
    })
    .catch((error) => {
      showFunToast(error.message || "❗ An error occurred.", "red");
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authError = urlParams.get("authError");

  if (authError) {
    const loginModal = new bootstrap.Modal(
      document.getElementById("loginModal")
    );
    setTimeout(() => {
      loginModal.show();
    }, 1000);
  }
});
