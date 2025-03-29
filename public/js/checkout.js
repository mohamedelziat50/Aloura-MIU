// script to remove the cerdit card payemt when chencked
    
      document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("cash").addEventListener("change", function () {
          const checkoutSection = document.getElementById("payment-method");
          checkoutSection.style.display = this.checked ? "none" : "block";
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
        const cardNameDisplay = document.querySelector(
          ".card-flip-front .card-name"
        );
        const cardExpiryDisplay = document.querySelector(
          ".card-flip-front .valid-date h5"
        );
        const cardCVVDisplay = document.querySelector(
          ".card-flip-back .signature i"
        );

        // Update functions
        function updateCardNumber() {
          let formattedNumber = cardNumberInput.value.replace(
            /(\d{4})(?=\d)/g,
            "$1 "
          );
          cardNumberDisplay.textContent =
            formattedNumber || "8050 2030 3020 5040";
        }

        function updateCardName() {
          cardNameDisplay.textContent =
            cardNameInput.value.toUpperCase() || "PREM KUMAR SHAHI";
        }

        function updateCardExpiry() {
          cardExpiryDisplay.textContent = cardExpiryInput.value || "05/28";
        }

        function updateCardCVV() {
          cardCVVDisplay.textContent = cardCVVInput.value || "005";
        }

        // Event listeners for real-time updates
        cardNumberInput.addEventListener("input", updateCardNumber);
        cardNameInput.addEventListener("input", updateCardName);
        cardExpiryInput.addEventListener("input", updateCardExpiry);
        cardCVVInput.addEventListener("input", updateCardCVV);
      });

// ========= CVV Flip card when focus & blurred =================
document.addEventListener('DOMContentLoaded', function() {
  // Get the CVV input element - update the selector to match your input
  const cvvInput = document.getElementById('cvv'); // or input#cvv
  
  // Get the card flip container
  const cardFlipContainer = document.querySelector('.card-flip-container'); //Returns a single element, byclassname returned a large list
  
  // If both are not null
  if (cvvInput && cardFlipContainer) 
  {
    // Add focus event listener
    cvvInput.addEventListener('focus', function() {
      // Add the flip class to rotate the card (check css file)
      cardFlipContainer.classList.add('flip');
    });
    
    // Add blur (loss of focus) event listener
    cvvInput.addEventListener('blur', function() {
      // Remove the flip class to revert the card
      cardFlipContainer.classList.remove('flip');
    });
  }
});

// ============ CASH ON DELIEVERY BUTTON POP UP (COD) ===============
document.addEventListener('DOMContentLoaded', function() {
  // Get the Cash On Delivery checkbox and confirmation message
  const codCheckbox = document.getElementById('cash');
  const confirmationMessage = document.querySelector('.cod-confirmation-message');
  
  // Make sure we have both elements
  if (codCheckbox && confirmationMessage) {
    // Add event listener to the checkbox
    codCheckbox.addEventListener('change', function() {
      confirmationMessage.style.display = codCheckbox.checked ? 'block' : 'none';
    });
  }
});