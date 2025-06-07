import showFunToast from "./toast.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const forgetpasswordForm = document.getElementById("forgetpasswordform");
  const backArrow = document.getElementById("backToLogin");

  const twofactorForm = document.getElementById("twofactor");
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
      forgetpasswordForm.style.display = "none";
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
        input.value = "";
      });
      const resetpassword = document.getElementById("resetpassword");
      resetpassword.value = "";
    });
  }

  // Switch to Forget Password Form
  const showforgetpasswordBtn = document.getElementById("showforgetpassword");
  if (showforgetpasswordBtn) {
    showforgetpasswordBtn.addEventListener("click", function () {
      loginForm.style.display = "none";
      document.getElementById("resetOptionForm").style.display = "block";
      loginModalLabel.textContent = "Reset Password";
      loginModalLabel.classList.add("verification-title");
      modalDescription.style.display = "none";
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

  // Check if all required elements exist
  if (!mobileMenuBtn || !links || !overlay) {
    return; // Exit if any required element is missing
  }

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

document.addEventListener("DOMContentLoaded", function () {
  const resetPasswordToggle = document.getElementById("resetpasswordToggle");
  const resetPasswordInput = document.getElementById("resetpasswordInput");
  const resetPasswordIcon = document.getElementById("resetpasswordIcon");

  if (resetPasswordToggle && resetPasswordInput && resetPasswordIcon) {
    resetPasswordToggle.addEventListener("click", function () {
      if (resetPasswordInput.type === "password") {
        resetPasswordInput.type = "text";
        resetPasswordIcon.classList.remove("fa-lock");
        resetPasswordIcon.classList.add("fa-lock-open");
      } else {
        resetPasswordInput.type = "password"; // ✅ Fix here
        resetPasswordIcon.classList.remove("fa-lock-open");
        resetPasswordIcon.classList.add("fa-lock");
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

  fetch("http://localhost:3000/api/auth/signup", {
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

  fetch("http://localhost:3000/api/auth/login", {
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
        if (data.user.role === "admin") {
          window.location.href = `/admin/${data.user.id}`;
        } else {
          window.location.href = `/`; // or any public/index route
        }
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

document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logoutLink");

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault(); // Stop the normal redirect

      showFunToast("👋 Logged out! Hope to see you back soon!", "green");

      // After a small delay, redirect to the logout page
      setTimeout(() => {
        window.location.href = "/api/auth/logout";
      }, 1000);
    });
  }
});

document
  .getElementById("forgetpasswordform")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("forget-email").value.trim();

    if (!email) {
      showFunToast("❗ Please enter your email.", "red");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        showFunToast(
          data.message || "✅ Check your email for reset instructions!",
          "green"
        );

        setTimeout(() => {
          document.getElementById("loginForm").style.display = "none";
          document.getElementById("signUpForm").style.display = "none";
          document.getElementById("forgetpasswordform").style.display = "none";

          // Show the 2FA form
          document.getElementById("twofactor").style.display = "block";

          // Update modal title and description
          document.getElementById("loginModalLabel").textContent =
            "Verification";
          document
            .getElementById("loginModalLabel")
            .classList.add("verification-title");
          document.querySelector(".modal-description").style.display = "none"; // Hide description
          document.getElementById("backToLogin").style.display = "block";
        }, 1000);
      } else {
        showFunToast(data.message || "❌ Error: Email not found.", "red");
      }
    } catch (error) {
      console.error(error);
      showFunToast("❌ Server error.", "red");
    }
    ``;
  });

//when you paste the code it automaticly write each one in the write spot
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("#twofactor input[type='tel']");

  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
      e.target.value = value;

      if (value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && e.target.value === "" && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData)
        .getData("text")
        .toUpperCase()
        .replace(/[^A-Z]/g, "");

      if (paste.length === inputs.length) {
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = paste[i];
        }
        inputs[inputs.length - 1].focus();
      }
    });
  });
});

// JS for handling the reset from the verification modal

document.querySelector(".verify").addEventListener("click", async () => {
  const codeInputs = document.querySelectorAll(".input-fields input");
  const newPassword = document
    .getElementById("resetpasswordInput")
    .value.trim();
  const code = Array.from(codeInputs)
    .map((input) => input.value)
    .join("");

  if (code.length !== 4) {
    showFunToast("❗ Please enter the full 4-digit code.", "red");
    return;
  }

  if (!newPassword) {
    showFunToast("❗ Please enter a new password.", "red");
    return;
  }

  if (newPassword.length < 6) {
    showFunToast("❗ Password must be at least 6 characters long.", "red");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, newPassword }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      showFunToast(
        data.message || "✅ Password updated successfully!",
        "green"
      );
      setTimeout(() => {
        window.location.href = "/?authError=true"; // Redirect to the login page
      }, 1000);
    } else {
      showFunToast(data.message || "❌ Failed to update password.", "red");
    }
  } catch (error) {
    console.error(error);
    showFunToast("❌ Server error.", "red");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const resetOptionForm = document.getElementById("resetOptionForm");
  const forgetpasswordPhoneForm = document.getElementById("forgetpasswordPhoneForm");

  // Show Reset Options when "Forgot Password?" is clicked
  const showforgetpasswordBtn = document.getElementById("showforgetpassword");
  if (showforgetpasswordBtn) {
    showforgetpasswordBtn.addEventListener("click", function () {
      loginForm.style.display = "none";
      resetOptionForm.style.display = "block";
      loginModalLabel.textContent = "Reset Password";
      modalDescription.style.display = "block";
      modalDescription.textContent = "Choose how you would like to reset your password:";
    });
  }
  // Handle "Reset using Email" option
  const chooseEmailBtn = document.getElementById("chooseEmail");
  if (chooseEmailBtn) {
    chooseEmailBtn.addEventListener("click", function() {
      resetOptionForm.style.display = "none";
      document.getElementById("forgetpasswordform").style.display = "block";
      loginModalLabel.textContent = "Reset Password";
      modalDescription.style.display = "block";
      modalDescription.textContent = "Enter your email address, a link to reset your password will be sent";
    });
  }

  // Handle "Reset using Phone" option
  const choosePhoneBtn = document.getElementById("choosePhone");
  if (choosePhoneBtn) {
    choosePhoneBtn.addEventListener("click", function() {
      resetOptionForm.style.display = "none";
      forgetpasswordPhoneForm.style.display = "block";
      loginModalLabel.textContent = "Reset Password";
      modalDescription.style.display = "block";
      modalDescription.textContent = "Enter your phone number, a code to reset your password will be sent";
    });
  }
  // Back to Reset Options from Email Form
  const backToResetOptionsBtn = document.getElementById("backToResetOptions");
  if (backToResetOptionsBtn) {
    backToResetOptionsBtn.addEventListener("click", function() {
      document.getElementById("forgetpasswordform").style.display = "none";
      resetOptionForm.style.display = "block";
      modalDescription.style.display = "block";
      modalDescription.textContent = "Choose how you would like to reset your password:";
    });
  }

  // Back to Reset Options from Phone Form
  const backToResetOptionsPhoneBtn = document.getElementById("backToResetOptionsPhone");
  if (backToResetOptionsPhoneBtn) {
    backToResetOptionsPhoneBtn.addEventListener("click", function() {
      document.getElementById("forgetpasswordPhoneForm").style.display = "none";
      resetOptionForm.style.display = "block";
      modalDescription.style.display = "none";
    });
  }

  // Back to Login from Reset Options
  const backToLoginFromOptionsBtn = document.getElementById("backToLoginFromOptions");
  if (backToLoginFromOptionsBtn) {
    backToLoginFromOptionsBtn.addEventListener("click", function() {
      resetOptionForm.style.display = "none";
      loginForm.style.display = "block";
      loginModalLabel.textContent = "Login";
      loginModalLabel.classList.remove("verification-title");
      modalDescription.style.display = "block";
      modalDescription.textContent = "Please enter your e-mail and password:";
    });
  }

  // Handle "Have Code?" button click in phone reset form
  document.getElementById("show2faPhone").addEventListener("click", function() {
    // Hide all other forms
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("forgetpasswordPhoneForm").style.display = "none";
    document.getElementById("resetOptionForm").style.display = "none";

    // Show the 2FA form
    document.getElementById("twofactor").style.display = "block";

    // Update modal title and description
    document.getElementById("loginModalLabel").textContent = "Verification";
    document.getElementById("loginModalLabel").classList.add("verification-title");
    document.querySelector(".modal-description").style.display = "none";
    document.getElementById("backToLogin").style.display = "block";
  });
});
