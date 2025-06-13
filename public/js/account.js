import showFunToast from "/js/toast.js";
// Account page functionality
document.addEventListener("DOMContentLoaded", function () {
  // Add address link functionality
  const addAddressLink = document.querySelector(".add-address");
  if (addAddressLink) {
    addAddressLink.addEventListener("click", function (e) {
      e.preventDefault();
      // You can implement address functionality here
      alert("Address adding functionality will be implemented here");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("profile-picture");
  const preview = document.getElementById("profile-picture-preview");
  const resetButton = document.getElementById("reset-profile-picture");
  const DEFAULT_PIC_PATH = "/uploads/defaultProfilePic.png";
  let isDefaultPicture = false;

  // Store original values on load
  const originalValues = {
    name: document.getElementById("firstName").value.trim(),
    phone: document.getElementById("phoneNumber").value.trim(),
    email: document.getElementById("email").value.trim(),
    profilePicture: preview.getAttribute("src"),
  };

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      isDefaultPicture = false;
    }
  });

  resetButton.addEventListener("click", () => {
    preview.src = DEFAULT_PIC_PATH;
    fileInput.value = "";
    isDefaultPicture = true;
  });

  const form = document.getElementById("profile-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("firstName").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const oldpassword = document.getElementById("currentPassword").value.trim();
    const newpassword = document.getElementById("newPassword").value.trim();
    const confirmpassword = document
      .getElementById("confirmPassword")
      .value.trim();
    const profilePicture = fileInput.files[0];
    const currentPicture = preview.getAttribute("src");

    // Detect if any field has changed
    const hasChanged =
      name !== originalValues.name ||
      phone !== originalValues.phone ||
      email !== originalValues.email ||
      oldpassword !== "" ||
      newpassword !== "" ||
      currentPicture !== originalValues.profilePicture;

    if (!hasChanged) {
      showFunToast("ℹ️ No changes detected.", "red");
      return;
    }

    if (phone.length > 10) {
      showFunToast("⚠️ Phone number must be exactly 10 digits.", "red");
      return;
    }

    // Password validation block
    if (oldpassword || newpassword || confirmpassword) {
      if (!oldpassword || !newpassword || !confirmpassword) {
        showFunToast("⚠️ Fill all password fields!", "red");
        return;
      }

      if (newpassword.length < 6 || confirmpassword.length < 6) {
        showFunToast("⚠️ Password must be at least 6 characters long!", "red");
        return;
      }

      if (newpassword !== confirmpassword) {
        showFunToast("⚠️ New passwords do not match!", "red");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    } else if (isDefaultPicture) {
      formData.append("profilePicture", DEFAULT_PIC_PATH);
    }

    if (oldpassword && newpassword) {
      formData.append("oldpassword", oldpassword);
      formData.append("newpassword", newpassword);
    }

    try {
      const id = document.getElementById("profile-form").dataset.userId; // EJS injects this into the script
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showFunToast("✅ Profile updated successfully!", "green");
        setTimeout(() => location.reload(), 1500);
      } else {
        showFunToast(data.message || "❌ Update failed.", "red");
      }
    } catch (err) {
      console.error(err);
      showFunToast("❌ Something went wrong.", "red");
    }
  });
});
