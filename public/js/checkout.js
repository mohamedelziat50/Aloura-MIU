import showFunToast from "./toast.js";

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
    let value = cardExpiryInput.value.replace(/\D/g, ""); // Remove non-digit characters
    // If the value length is more than 2, insert a slash between month and year
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    // If the month is greater than 12, set it to 12
    const month = parseInt(value.slice(0, 2), 10);
    if (month > 12) {
      value = "12" + value.slice(2); // Limit the month to 12
    }
    // Limit the input to 5 characters (MM/YY)
    cardExpiryInput.value = value.slice(0, 5);
    // Update the display with the current expiry value or default
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

// Creating an HTTP POST Request for an order happens here
document.addEventListener("DOMContentLoaded", function () {
  // Get the checkout button
  const checkoutButton = document.getElementById("checkout-button");
  // Get the form
  const form = document.getElementById("checkoutForm");

  // The checkout button is outside the form, so handle it to properly submit
  checkoutButton.addEventListener("click", function () {
    // Use requestSubmit to trigger the submit event and allow JS handler
    form.requestSubmit();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Trimmed inputs
    const fullName = document.getElementById("first-name").value.trim();
    const email = document.getElementById("emailaddress").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const address = document.getElementById("address").value.trim();
    const apartment = document.getElementById("apartment").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const country = document.getElementById("country").value.trim();

    // === Basic Field Validations ===
    if (!fullName) return showFunToast("❌ Full name is required.", "red");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return showFunToast("❌ Enter a valid email address.", "red");
    }
    if (!phone || !/^\d{8,15}$/.test(phone)) {
      return showFunToast("❌ Enter a valid phone number (digits only).", "red");
    }
    if (!address) return showFunToast("❌ Address is required.", "red");
    if (!apartment) return showFunToast("❌ Apartment is required.", "red");
    if (!city) return showFunToast("❌ City is required.", "red");
    if (!state) return showFunToast("❌ State is required.", "red");
    if (!country) return showFunToast("❌ Country is required.", "red");

    const shippingAddress = { address, apartment, city, state, country };

    const codCheckbox = document.getElementById("cash");
    const paid = !codCheckbox.checked;

    let cardData = undefined;
    let binData = undefined;

    // === CARD VALIDATION SECTION ===
    if (paid) {
      const rawCardNumber = document.getElementById("card-number").value.trim();
      const cardNumber = rawCardNumber.replace(/\D/g, "");
      const cardName = document.getElementById("card-name").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      // === Field presence checks ===
      if (!cardName) return showFunToast("❌ Card name is required.", "red");
      if (!cardNumber) return showFunToast("❌ Card number is required.", "red");
      if (!expiry) return showFunToast("❌ Expiry date is required.", "red");
      if (!cvv) return showFunToast("❌ CVV is required.", "red");

      // === Luhn Check ===
      function isValidCardNumber(cardNumber) {
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
          let digit = parseInt(cardNumber[i]);
          if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }
          sum += digit;
          shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
      }

      if (!isValidCardNumber(cardNumber)) {
        return showFunToast("❌ Invalid card number.", "red");
      }

      // === CVV Check ===
      if (!/^\d{3,4}$/.test(cvv)) {
        return showFunToast("❌ Invalid CVV. Must be 3 or 4 digits.", "red");
      }

      // === Expiry Format Check ===
      const [monthStr, yearStr] = expiry.split("/");
      const month = parseInt(monthStr);
      const year = parseInt(yearStr);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = parseInt(now.getFullYear().toString().slice(-2));

      if (!monthStr || !yearStr || isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        return showFunToast("❌ Invalid expiry format (MM/YY).", "red");
      }

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return showFunToast("❌ Card is expired.", "red");
      }

      // === BIN validation ===
      const bin = cardNumber.slice(0, 6);
      if (bin.length !== 6 || isNaN(bin)) {
        showFunToast("❌ Invalid card number. Please recheck.", "red");
        return;
      }

      try {
        const binRes = await fetch(`/api/orders/validate-bin/${bin}`);
        if (!binRes.ok) {
          showFunToast("❌ Invalid card issuer. Please try another card.", "red");
          return;
        }
        binData = await binRes.json();
        console.log("Card Info:", binData);
      } catch (err) {
        showFunToast("❌ Failed to verify card. Please try again.", "red");
        return;
      }

      cardData = { cardNumber, cardName, expiry, cvv };
    }

    try {
      // Fetch gifts before submitting the order
      const giftsResponse = await fetch('/api/gifting', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!giftsResponse.ok) {
        throw new Error('Failed to fetch gifts');
      }

      const gifts = await giftsResponse.json();

      // ========== Final Data Object ==========
      const formData = {
        fullName,
        email,
        phone,
        shippingAddress,
        paid,
        cardData,
        binData,
        gifts: gifts.map(gift => gift._id) // Include gift IDs in the order
      };

      // ========== Submit to backend ==========
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showFunToast(data.message || "✅ Order placed successfully!", "green");
        setTimeout(() => (window.location.href = "/"), 900);
      } else {
        showFunToast(data.message || "❌ An error occurred.", "red");
      }
    } catch (error) {
      showFunToast(error.message || "❌ Network error.", "red");
    }
  });
});

// ========== CART SYNC: Refresh checkout if cart is updated in this page ==========
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("cart-updated", function () {
    setTimeout(() => {
      window.location.reload(); // Refresh to sync checkout with latest cart
    }, 500);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phoneNumber");

  phoneInput.addEventListener("input", (e) => {
    // Replace any non-digit character with empty string
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
  });
});
