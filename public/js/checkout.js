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
  let value = cardExpiryInput.value.replace(/\D/g, "");  // Remove non-digit characters
  // If the value length is more than 2, insert a slash between month and year
  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }
  // If the month is greater than 12, set it to 12
  const month = parseInt(value.slice(0, 2), 10);
  if (month > 12) {
    value = "12" + value.slice(2);  // Limit the month to 12
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
  const form = document.getElementById('checkoutForm')

  // The checkout button is outside the form, so handle it to properly submit
  checkoutButton.addEventListener('click', function() {
      // Use requestSubmit to trigger the submit event and allow JS handler -> not .submit( does default form submission)
      form.requestSubmit();
  });

  form.addEventListener("submit", async (event) => {
        // Prevent default form submission => Don't do any default form stuff {MOST IMPORTANT LINE}
        event.preventDefault();
        
        // Customer Information
        const fullName = document.getElementById("first-name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phoneNumber").value

        // Shipping Address
        const address = document.getElementById("address").value;
        const apartment = document.getElementById("apartment").value
        const city = document.getElementById("city").value
        const state = document.getElementById("state").value
        const country = document.getElementById("country").value

        // Create shippingAddress object
        const shippingAddress = {
          address,
          apartment,
          city,
          state,
          country
        };
        
        // Payment method: Only send paid boolean, do NOT send card data  (For security reasons)
        const codCheckbox = document.getElementById("cash");
        const paid = codCheckbox.checked ? false : true;

        // If not COD, validate card fields before sending and send them for backend validation
        let cardData = undefined;
        if (paid) {
          const cardNumber = document.getElementById("card-number").value.trim();
          const cardName = document.getElementById("card-name").value.trim();
          const expiry = document.getElementById("expiry").value.trim();
          const cvv = document.getElementById("cvv").value.trim();

          cardData = { cardNumber, cardName, expiry, cvv };
        }

        const formData = {
          fullName,
          email,
          phone,
          shippingAddress,
          paid,
          cardData 
        };

        try {
            // Send the POST request along side the form's data in JSON format
            const response = await fetch('/api/orders', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                // The reason you need app.use(express.json()); is because your frontend JavaScript (in your EJS file) sends the form data as JSON using fetch
                body: JSON.stringify(formData)
            })

            // Store the server's response in a variable no matter success or error (this is the advantage)
            const data = await response.json()

            if (response.ok) 
            {
                showFunToast(data.message || "Order placed successfully!", "green");
                setTimeout(() => {
                    window.location.href = "/";
                }, 900);
            }
            else {
                showFunToast(data.message || "An error occurred.", "red");
            }
        }
        catch(error) {
            showFunToast(error.message || "Network error.", "red");
        }
        
    })
});

// ========== CART SYNC: Refresh checkout if cart is updated in this page ==========
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("cart-updated", function () {
    setTimeout(() => {
        window.location.reload(); // Refresh to sync checkout with latest cart
    }, 500);
  });
});
