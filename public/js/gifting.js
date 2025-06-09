import showFunToast from "./toast.js";
document.addEventListener("DOMContentLoaded", function () {
  // Modal elements
  const giftModal = document.getElementById("gift-modal");
  const closeModal = document.querySelector(".close-modal");
  const modalSteps = document.querySelectorAll(".modal-step");

  // Selection tracking
  let selectedPerfume = null;
  let selectedWrap = null;
  let selectedCard = null;

  // Open modal when Add to Cart is clicked
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      giftModal.style.display = "block";
      document.body.style.overflow = "hidden";
      showStep("step-perfume");
      resetSelections();
    });
  });

  // Close modal
  closeModal.addEventListener("click", function () {
    giftModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Reset all selections
  function resetSelections() {
    selectedPerfume = null;
    selectedWrap = null;
    selectedCard = null;

    // Reset all select buttons
    document
      .querySelectorAll(".select-perfume, .select-wrap, .select-card")
      .forEach((btn) => {
        btn.textContent = "Select";
        btn.style.backgroundColor = "";
      });
  }

  // Step navigation
  function showStep(stepId) {
    modalSteps.forEach((step) => {
      step.style.display = "none";
    });
    document.getElementById(stepId).style.display = "block";
  }

  // Next step buttons with validation
  document.querySelectorAll(".next-step").forEach((button) => {
    button.addEventListener("click", function () {
      const nextStep = this.dataset.next;
      const currentStep = this.closest(".modal-step").id;

      // Validate selections before proceeding
      if (currentStep === "step-perfume" && !selectedPerfume) {
        showFunToast("Please select a perfume before continuing", "red");
        return;
      }

      if (currentStep === "step-wrap" && !selectedWrap) {
        showFunToast(
          "Please select a gift wrap option before continuing",
          "red"
        );
        return;
      }

      if (currentStep === "step-card" && !selectedCard) {
        showFunToast("Please select a greeting card before continuing", "red");
        return;
      }

      showStep(nextStep);
    });
  });

  // Back buttons
  document.querySelectorAll(".back-step").forEach((button) => {
    button.addEventListener("click", function () {
      const prevStep = this.dataset.back;
      showStep(prevStep);
    });
  });

  // Toggle selection function
  function toggleSelection(element, selectedItem, itemType) {
    const allButtons = element.parentElement.querySelectorAll(
      `.select-${itemType}`
    );

    // Reset all buttons in this group
    allButtons.forEach((btn) => {
      btn.textContent = "Select";
      btn.style.backgroundColor = "";
    });

    // If clicking the already selected item, deselect it
    if (selectedItem && selectedItem.element === element) {
      return null;
    }

    // Select the new item
    element.textContent = "Selected ✓";
    element.style.backgroundColor = "#4CAF50";

    return {
      element: element,
      name: element.closest(`.${itemType}-option`).querySelector("h3, h4")
        .textContent,
      price:
        element
          .closest(`.${itemType}-option`)
          .querySelector(".price, p:nth-of-type(1)")?.textContent || "",
      image: element.closest(`.${itemType}-option`).querySelector("img").src,
    };
  }

  // Perfume selection
  document.querySelectorAll(".select-perfume").forEach((button) => {
    button.addEventListener("click", function () {
      selectedPerfume = toggleSelection(this, selectedPerfume, "perfume");
    });
  });

  // Wrap selection
  document.querySelectorAll(".select-wrap").forEach((button) => {
    button.addEventListener("click", function () {
      selectedWrap = toggleSelection(this, selectedWrap, "wrap");
    });
  });

  // Card selection - Modified to ensure only one card can be selected
  document.querySelectorAll(".select-card").forEach((button) => {
    button.addEventListener("click", function () {
      // First deselect any currently selected card
      if (selectedCard) {
        selectedCard.element.textContent = "Select";
        selectedCard.element.style.backgroundColor = "";
      }

      // Select the new card
      selectedCard = {
        element: this,
        name: this.closest(".card-option").querySelector("h4").textContent,
        image: this.closest(".card-option").querySelector("img").src,
      };

      this.textContent = "Selected ✓";
      this.style.backgroundColor = "#4CAF50";

      // Update preview
      const preview = document.getElementById("selected-card-preview");
      if (preview) {
        preview.src = selectedCard.image;
      }
    });
  });

  // Character counter
  const messageTextarea = document.getElementById("gift-message");
  const charCount = document.querySelector(".char-count");

  if (messageTextarea && charCount) {
    messageTextarea.addEventListener("input", function () {
      charCount.textContent = `${this.value.length}/100`;
    });
  }

  // Confirm gift button
  const confirmBtn = document.querySelector(".confirm-gift");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      const recipientName = document.getElementById("recipient-name").value;
      const message = document.getElementById("gift-message").value;

      // Validate required fields
      if (!recipientName) {
        showFunToast("Please enter the recipient's name", "red");
        return;
      }

      // Build summary
      const summaryList = document.querySelector(".gift-summary");
      summaryList.innerHTML = "";

      // Calculate total price
      let total = 0;

      if (selectedPerfume) {
        const perfumePrice = parseFloat(
          selectedPerfume.price.replace(/[^0-9.]/g, "")
        );
        total += perfumePrice;
        summaryList.innerHTML += `<li>Perfume: ${selectedPerfume.name} (${selectedPerfume.price})</li>`;
      }

      if (selectedWrap) {
        const wrapPrice = parseFloat(
          selectedWrap.price.replace(/[^0-9.]/g, "")
        );
        total += wrapPrice;
        summaryList.innerHTML += `<li>Wrap: ${selectedWrap.name} (${selectedWrap.price})</li>`;
      }

      if (selectedCard) {
        summaryList.innerHTML += `<li>Card: ${selectedCard.name}</li>`;
      }

      summaryList.innerHTML += `<li>For: ${recipientName}</li>`;

      if (message) {
        summaryList.innerHTML += `<li>Message: ${message.substring(0, 20)}${
          message.length > 20 ? "..." : ""
        }</li>`;
      }

      // Update total
      document.getElementById("gift-total").textContent = total.toFixed(2);

      showStep("step-confirm");
    });
  }

  // Complete order button
  const completeOrderBtn = document.querySelector(".complete-order");
  if (completeOrderBtn) {
    completeOrderBtn.addEventListener("click", async () => {
      try {
        // Get the selected elements
        const selectedPerfume = document.querySelector(
          ".perfume-option.selected"
        );
        const selectedWrap = document.querySelector(".wrap-option.selected");
        const selectedCard = document.querySelector(".card-option.selected");

        // Validate selections
        if (!selectedPerfume || !selectedWrap || !selectedCard) {
          throw new Error("Please select all gift items before proceeding");
        }

        // Get and clean the price values
        const perfumePrice =
          selectedPerfume.querySelector(".price")?.textContent;
        const wrapPrice = selectedWrap.querySelector("p")?.textContent;

        const cleanPerfumePrice = perfumePrice
          ? parseFloat(perfumePrice.replace(/[^0-9.]/g, ""))
          : 0;
        const cleanWrapPrice = wrapPrice
          ? parseFloat(wrapPrice.replace(/[^0-9.]/g, ""))
          : 0;
        const totalPrice =
          parseFloat(document.getElementById("gift-total").textContent) || 0;

        const giftData = {
          perfume: {
            name:
              selectedPerfume.querySelector("h3")?.textContent.trim() ||
              "Not selected",
            price: cleanPerfumePrice,
          },
          wrap: {
            name:
              selectedWrap.querySelector("h4")?.textContent.trim() ||
              "Not selected",
            price: cleanWrapPrice,
          },
          card: {
            name:
              selectedCard.querySelector("h4")?.textContent.trim() ||
              "Not selected",
          },
          recipientName: document.getElementById("recipient-name").value.trim(),
          message: document.getElementById("gift-message").value.trim(),
          totalPrice: totalPrice,
        };

        // Log the data being sent
        console.log("Sending gift data:", giftData);

        // Validate required fields
        if (!giftData.recipientName) {
          throw new Error("Please enter the recipient's name");
        }

        if (
          !giftData.perfume.name ||
          !giftData.wrap.name ||
          !giftData.card.name
        ) {
          throw new Error("Please select all gift items");
        }

        const response = await fetch("/api/gifting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(giftData),
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.error("Server response:", responseData);
          if (response.status === 401) {
            throw new Error("Please log in to create a gift order");
          }
          throw new Error(
            responseData.details?.[0] || responseData.error || "Order failed"
          );
        }

        showFunToast("Order completed successfully!", "green");

        // Close the modal
        const giftModal = document.getElementById("gift-modal");
        if (giftModal) {
          giftModal.style.display = "none";
          document.body.style.overflow = "auto";
        }

        // Dispatch cart update event
        window.dispatchEvent(new Event("cart-updated"));

        // Refresh the cart if we're on the cart page
        if (typeof fetchAndDisplayGifts === "function") {
          fetchAndDisplayGifts();
        }

        // Reset the form
        resetSelections();
        document.getElementById("recipient-name").value = "";
        document.getElementById("gift-message").value = "";
      } catch (error) {
        console.error("Order error:", error);
        showFunToast(`Order failed: ${error.message}`, "red");
      }
    });
  }

  // Close when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === giftModal) {
      giftModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Fetch and display gifts if we're on the cart or checkout page
  if (
    document.querySelector(".cart-items") ||
    document.querySelector(".checkout-items")
  ) {
    fetchAndDisplayGifts();
  }
});

// Add this to your gifting.js (if not already present)
document
  .querySelectorAll(".select-perfume, .select-wrap, .select-card")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      // Remove 'selected' from all options in this category
      const category = e.target.closest(".modal-step").id.replace("step-", "");
      document.querySelectorAll(`.${category}-option`).forEach((opt) => {
        opt.classList.remove("selected");
      });
      // Add 'selected' to clicked option
      e.target.closest(`.${category}-option`).classList.add("selected");
    });
  });

// Function to fetch and display gifts
async function fetchAndDisplayGifts() {
  try {
    const response = await fetch("/api/gifting", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch gifts");
    }

    const gifts = await response.json();
    displayGiftsInCart(gifts);
    displayGiftsInCheckout(gifts);
  } catch (error) {
    console.error("Error fetching gifts:", error);
    showFunToast("Failed to load gifts", "red");
  }
}

// Function to display gifts in cart
function displayGiftsInCart(gifts) {
  const cartContainer = document.querySelector(".cart-items");
  if (!cartContainer) return;

  const giftItems = gifts
    .map(
      (gift) => `
    <div class="cart-item gift-item">
      <div class="item-details">
        <h4>Gift Package</h4>
        <p><strong>Perfume:</strong> ${gift.perfume.name}</p>
        <p><strong>Wrap:</strong> ${gift.wrap.name}</p>
        <p><strong>Card:</strong> ${gift.card.name}</p>
        <p><strong>To:</strong> ${gift.recipientName}</p>
        ${
          gift.message ? `<p><strong>Message:</strong> ${gift.message}</p>` : ""
        }
        <p><strong>Total:</strong> $${gift.totalPrice.toFixed(2)}</p>
      </div>
      <button class="remove-gift" data-gift-id="${gift._id}">Remove</button>
    </div>
  `
    )
    .join("");

  cartContainer.innerHTML = giftItems;

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-gift").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const giftId = e.target.dataset.giftId;
      try {
        const response = await fetch(`/api/gifting/${giftId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to remove gift");
        }

        showFunToast("Gift removed successfully", "green");
        fetchAndDisplayGifts(); // Refresh the display
      } catch (error) {
        console.error("Error removing gift:", error);
        showFunToast("Failed to remove gift", "red");
      }
    });
  });
}

// Function to display gifts in checkout
function displayGiftsInCheckout(gifts) {
  const checkoutContainer = document.querySelector(".checkout-items");
  if (!checkoutContainer) return;

  const giftItems = gifts
    .map(
      (gift) => `
    <div class="checkout-item gift-item">
      <div class="item-details">
        <h4>Gift Package</h4>
        <p><strong>Perfume:</strong> ${gift.perfume.name}</p>
        <p><strong>Wrap:</strong> ${gift.wrap.name}</p>
        <p><strong>Card:</strong> ${gift.card.name}</p>
        <p><strong>To:</strong> ${gift.recipientName}</p>
g        ${
        gift.message ? `<p><strong>Message:</strong> ${gift.message}</p>` : ""
      }
        <p><strong>Price:</strong> $${gift.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  `
    )
    .join("");

  checkoutContainer.innerHTML = giftItems;

  // Update total price
  const totalPrice = gifts.reduce((sum, gift) => sum + gift.totalPrice, 0);
  const totalElement = document.querySelector(".checkout-total");
  if (totalElement) {
    totalElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
}
