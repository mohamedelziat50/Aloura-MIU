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
    // Use requestSubmit to trigger the submit event and allow JS handler -> not .submit( does default form submission)
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
      return showFunToast(
        "❌ Enter a valid phone number (digits only).",
        "red"
      );
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
    let binData = undefined; // Declare binData here

    // === CARD VALIDATION SECTION ===
    if (paid) {
      const rawCardNumber = document.getElementById("card-number").value.trim();
      const cardNumber = rawCardNumber.replace(/\D/g, ""); // remove spaces and non-digits
      const cardName = document.getElementById("card-name").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      // === Field presence checks ===
      if (!cardNumber) return showFunToast("❌ Card number is required.", "red");
      if (!cardName) return showFunToast("❌ Card name is required.", "red");
      if (!expiry) return showFunToast("❌ Expiry date is required.", "red");
      if (!cvv) return showFunToast("❌ CVV is required.", "red");

      // === Card number validation ===
      if (!isValidCardNumber(cardNumber)) {
        return showFunToast("❌ Invalid card number.", "red");
      }

      // === Expiry date validation ===
      const [month, year] = expiry.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
      const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

      if (
        parseInt(month) < 1 ||
        parseInt(month) > 12 ||
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        return showFunToast("❌ Card has expired.", "red");
      }

      // === CVV validation ===
      if (!/^\d{3,4}$/.test(cvv)) {
        return showFunToast("❌ Invalid CVV.", "red");
      }

      cardData = { cardNumber, cardName, expiry, cvv };

      // Get BIN data
      try {
        const bin = cardNumber.substring(0, 6);
        const binResponse = await fetch(`/api/orders/bin/${bin}`);
        if (binResponse.ok) {
          binData = await binResponse.json();
        }
      } catch (error) {
        console.error("Error fetching BIN data:", error);
      }
    }

    // Fetch cart and gifts data
    try {
      const [cartResponse, giftsResponse] = await Promise.all([
        fetch("/api/users/cart", { credentials: "include" }),
        fetch("/api/gifting", { credentials: "include" })
      ]);

      const cartData = await cartResponse.json();
      const giftsData = await giftsResponse.json();

      const hasCartItems = cartData.success && cartData.cart && cartData.cart.length > 0;
      const hasGifts = Array.isArray(giftsData) && giftsData.length > 0;

      if (!hasCartItems && !hasGifts) {
        return showFunToast("❌ Your cart is empty.", "red");
      }

      // ========== Final Data Object ==========
      const formData = {
        fullName,
        email,
        phone,
        shippingAddress,
        paid,
        cardData,
        binData,
        gifts: hasGifts ? giftsData : [],
        cartItems: hasCartItems ? cartData.cart : []
      };

      // ========== Submit to backend ==========
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        showFunToast("✅ Order placed successfully!", "green");
        // Clear both cart and gifts after successful order
        await Promise.all([
          fetch("/api/users/clearcart", { method: "POST", credentials: "include" }),
          fetch("/api/gifting/clear", { method: "POST", credentials: "include" })
        ]);
        // Redirect to success page or orders page
        window.location.href = "/user-orders";
      } else {
        showFunToast(`❌ ${data.message || "Failed to place order."}`, "red");
      }
    } catch (error) {
      console.error("Error:", error);
      showFunToast("❌ An error occurred. Please try again.", "red");
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
