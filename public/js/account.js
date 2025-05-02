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

  // Start shopping button functionality
  const startShoppingBtn = document.querySelector(".action-button");
  if (startShoppingBtn) {
    startShoppingBtn.addEventListener("click", function () {
      // Navigate to the shop/products page
      window.location.href = "/all-fragrances";
    });
  }

  const fileInput = document.getElementById("profile-picture");
  const preview = document.getElementById("profile-picture-preview");
  const resetButton = document.getElementById("reset-profile-picture");
  const DEFAULT_PIC_PATH = "/uploads/defaultProfilePic.png";

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      preview.src = URL.createObjectURL(file);
    }
  });

  resetButton.addEventListener("click", function () {
    preview.src = DEFAULT_PIC_PATH; // Set to default picture
    fileInput.value = ""; // Clear the file input (remove selected file)
  });
});
