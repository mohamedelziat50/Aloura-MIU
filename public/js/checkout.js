// script to remove the cerdit card payemt when chencked

document.addEventListener("DOMContentLoaded", function () {
  const codCheckbox = document.getElementById("cash");
  const paymentMethodSection = document.getElementById("payment-method");
  const confirmationMessage = document.querySelector(
    ".cod-confirmation-message"
  );

  // Set initial state based on checkbox
  if (codCheckbox.checked) {
    paymentMethodSection.classList.add("hidden");
    confirmationMessage.style.display = "block";
  } else {
    paymentMethodSection.classList.remove("hidden");
    confirmationMessage.style.display = "none";
  }

  // Add event listener for changes
  codCheckbox.addEventListener("change", function () {
    if (this.checked) {
      paymentMethodSection.classList.add("hidden");
      confirmationMessage.style.display = "block";
    } else {
      paymentMethodSection.classList.remove("hidden");
      confirmationMessage.style.display = "none";
    }
  });
});

//this  is to write on the card

document.addEventListener("DOMContentLoaded", function () {
  // Get input fields
  const cardNumberInput = document.getElementById("card-number");
  const cardNameInput = document.getElementById("card-name");
  const cardExpiryInput = document.getElementById("expiry");
  const cardCVVInput = document.getElementById("cvv");

  // Get display elements on the card
  const cardNumberDisplay = document.querySelector(
    ".card-flip-front .card-number"
  );
  const cardNameDisplay = document.querySelector(".card-flip-front .card-name");
  const cardExpiryDisplay = document.querySelector(
    ".card-flip-front .valid-date h5"
  );
  const cardCVVDisplay = document.querySelector(".card-flip-back .signature i");

  // Update functions
  function updateCardNumber() {
    let digitsOnly = cardNumberInput.value.replace(/\D/g, "").slice(0, 16); // max 16 digits
    let formattedNumber = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    cardNumberInput.value = formattedNumber;
    cardNumberDisplay.textContent = formattedNumber || "8050 2030 3020 5040";
  }

  function updateCardName() {
    let cleanedName = cardNameInput.value
      .replace(/[^a-zA-Z\s]/g, "")
      .toUpperCase();
    cardNameInput.value = cleanedName;
    cardNameDisplay.textContent = cleanedName || "PREM KUMAR SHAHI";
  }

  function updateCardExpiry() {
    let value = cardExpiryInput.value.replace(/\D/g, "");
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2, 4);
    cardExpiryInput.value = value.slice(0, 5);
    cardExpiryDisplay.textContent = cardExpiryInput.value || "05/28";
  }

  function updateCardCVV() {
    let digitsOnly = cardCVVInput.value.replace(/\D/g, "").slice(0, 3);
    cardCVVInput.value = digitsOnly;
    cardCVVDisplay.textContent = digitsOnly || "005";
  }

  // Event listeners for real-time updates
  cardNumberInput.addEventListener("input", updateCardNumber);
  cardNameInput.addEventListener("input", updateCardName);
  cardExpiryInput.addEventListener("input", updateCardExpiry);
  cardCVVInput.addEventListener("input", updateCardCVV);
});

// ========= CVV Flip card when focus & blurred =================
document.addEventListener("DOMContentLoaded", function () {
  // Get the CVV input element - update the selector to match your input
  const cvvInput = document.getElementById("cvv"); // or input#cvv

  // Get the card flip container
  const cardFlipContainer = document.querySelector(".card-flip-container"); //Returns a single element, byclassname returned a large list

  // If both are not null
  if (cvvInput && cardFlipContainer) {
    // Add focus event listener
    cvvInput.addEventListener("focus", function () {
      // Add the flip class to rotate the card (check css file)
      cardFlipContainer.classList.add("flip");
    });

    // Add blur (loss of focus) event listener
    cvvInput.addEventListener("blur", function () {
      // Remove the flip class to revert the card
      cardFlipContainer.classList.remove("flip");
    });
  }
});

// ============ CASH ON DELIEVERY BUTTON POP UP (COD) ===============
document.addEventListener("DOMContentLoaded", function () {
  // Get the Cash On Delivery checkbox and confirmation message
  const codCheckbox = document.getElementById("cash");
  const confirmationMessage = document.querySelector(
    ".cod-confirmation-message"
  );

  // Make sure we have both elements
  if (codCheckbox && confirmationMessage) {
    // Add event listener to the checkbox
    codCheckbox.addEventListener("change", function () {
      confirmationMessage.style.display = codCheckbox.checked
        ? "block"
        : "none";
    });
  }
});
