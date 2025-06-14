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
function toggleSelection(button, selectedItem, itemType) {
  const parentContainer = button.closest(".scroll-container");
  const allButtons = parentContainer.querySelectorAll(`.select-${itemType}`);

  // Deselect all buttons
  allButtons.forEach((btn) => {
    btn.textContent = "Select";
    btn.style.backgroundColor = "";
    btn.closest(`.${itemType}-option`).classList.remove("selected");
  });

  // If clicking the same selected item, return null (to deselect)
  if (selectedItem && selectedItem.element === button) {
    return null;
  }

  // Select the new item
  button.textContent = "Selected ✓";
  button.style.backgroundColor = "#4CAF50";
  button.closest(`.${itemType}-option`).classList.add("selected");

  return {
    element: button,
    name: button.closest(`.${itemType}-option`).querySelector("h3, h4")
      .textContent,
    price:
      button
        .closest(`.${itemType}-option`)
        .querySelector(".price, p:nth-of-type(1)")?.textContent || "",
    image: button.closest(`.${itemType}-option`).querySelector("img").src,
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

        // Create a minimal gift data object with only necessary fields
        const giftData = {
          perfume: {
            name: selectedPerfume.querySelector("h3")?.textContent.trim() || "Not selected",
           },
          wrap: {
            name: selectedWrap.querySelector("h4")?.textContent.trim() || "Not selected",
            price: cleanWrapPrice
          },
          card: {
            name: selectedCard.querySelector("h4")?.textContent.trim() || "Not selected"
          },
          recipientName: document.getElementById("recipient-name").value.trim(),
          message: document.getElementById("gift-message").value.trim(),
          price: totalPrice
        };

        // Validate required fields
        if (!giftData.recipientName) {
          throw new Error("Please enter the recipient's name");
        }

        if (!giftData.perfume.name || !giftData.wrap.name || !giftData.card.name) {
          throw new Error("Please select all gift items");
        }

        const response = await fetch("/api/gifting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(giftData)
        });

        if (!response.ok) {
          if (response.status === 413) {
            throw new Error("The gift data is too large. Please try again with less data.");
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        const responseData = await response.json();

        showFunToast("✅ Gift added successfully to your cart!", "green", "left");
        // Update the cart UI
        updateCartUI(responseData);

        // Close the modal
        const giftModal = document.getElementById("gift-modal");
        if (giftModal) {
          giftModal.style.display = "none";
          document.body.style.overflow = "auto";
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








function updateCartUI(result) {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = result.cartCount;
  }

  const cartItemsContainer = document.querySelector(".cart-items-container");
  if (!cartItemsContainer) return;

  if (result.cartCount === 0) {
    cartItemsContainer.innerHTML = `
      <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
        <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
        <h4 class="mt-3">Your cart is empty.</h4>
      </div>
    `;
    return;
  }

  // Define image maps (same as in EJS)
  const wrapImageMap = {
    "Silk Ribbon Wrap": "/img/wraps/silk-wrapper.webp",
    "Premium Gift Box": "/img/wraps/gift-box.jpg",
    "Velvet Box": "/img/wraps/gift-wrap.jpeg",
    "Leather Case": "/img/wraps/leather-case.jpg",
    "Gold Foil Wrap": "/img/wraps/gold-wrap.jpg",
    "Silver Foil Wrap": "/img/wraps/silver-wrap.jpg",
    "Floral Pattern Box": "/img/wraps/floral-box.jpeg",
    "Luxury Gift Bag": "/img/wraps/luxury-box.jpg",
    "Holiday Special": "/img/wraps/holiday-box.jpg"
  };

  const cardImageMap = {
    "Spray A Little Happiness": "/img/cards/love-card.jpg",
    "Scent With Love": "/img/cards/gift-card1.png",
    "Christmas Special": "/img/cards/christmas-card.webp",
    "Birthday Wishes": "/img/cards/birthday-card.webp",
    "Anniversary": "/img/cards/anniversary-card.webp",
    "Thank You": "/img/cards/thank-you-card.jpg",
    "Valentine Special": "/img/cards/valentine-card.png",
    "Gold Luxury": "/img/cards/luxury-card.avif",
    "Floral Design": "/img/cards/floral-card.jpg"
  };

  fetch("/api/users/cart")
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.cart) {
        cartItemsContainer.innerHTML = "";

        let subtotal = 0;

        data.cart.forEach((item) => {
          const isGift = item.category === "gift";
          subtotal += item.price * item.quantity;

          // Get images
          const perfumeImage = item.fragrance.image[0];
          const wrapImage = wrapImageMap[item.wrap?.name];
          const cardImage = cardImageMap[item.card?.name];

          let collageHTML = "";

          if (isGift) {
            collageHTML = `
              <div class="gift-collage d-flex flex-column align-items-center">
                <div class="gift-collage-row d-flex flex-row justify-content-center align-items-center" style="gap: 6px;">
                  ${perfumeImage ? `<img src="${perfumeImage}" alt="Perfume" class="gift-collage-img" style="width: 56px; height: 56px; object-fit: cover;" />` : ""}
                  ${cardImage ? `<img src="${cardImage}" alt="Card" class="gift-collage-img" style="width: 56px; height: 56px; object-fit: cover;" />` : ""}
                </div>
                <div class="gift-collage-row d-flex flex-row justify-content-center align-items-center" style="gap: 6px; margin-top: 6px;">
                  ${wrapImage ? `<img src="${wrapImage}" alt="Wrap" class="gift-collage-img" style="width: 56px; height: 56px; object-fit: cover;" />` : ""}
                </div>
              </div>
            `;
          }

          const cartItemHTML = `
            <div class="row cart-item mb-3" data-price="${item.price}" data-category="${item.category}">
              <div class="col-md-3">
                ${isGift ? collageHTML : `<img src="${perfumeImage}" alt="${item.fragrance.name}" class="img-fluid rounded" />`}
              </div>

              <div class="col-md-5 mt-3">
                <h5 class="card-title">${item.fragrance.name}</h5>
                <p class="text-muted">Gender: ${item.fragrance.gender} | Size: ${item.size}</p>
              </div>

              <div class="col-md-4 d-flex flex-column">
                <p class="fw-bold mb-2 text-end">${item.price} EGP</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="input-group" style="max-width: 180px">
                    ${!isGift ? `<button type="button" class="btn btn-outline-secondary btn-sm minus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">-</button>` : ""}
                    <input type="text" class="form-control form-control-sm text-center quantity-input" value="${item.quantity}" min="1" ${isGift ? "readonly disabled value='1'" : ""} />
                    ${!isGift ? `<button type="button" class="btn btn-outline-secondary btn-sm plus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">+</button>` : ""}
                  </div>
                  <button type="button" class="btn btn-sm btn-outline-danger trash-can-button ms-2" data-size="${item.size}" data-fragrance-id="${item.fragrance._id}" ${item.gift ? `data-gift-id="${item.gift}"` : ""}>
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          `;

          cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
        });

        // Update subtotal
        const subtotalEl = document.querySelector(".cart-info-subtotal span");
        if (subtotalEl) {
          subtotalEl.textContent = `${subtotal} EGP`;
        }

        updateSubtotal();
        attachCartEventListeners();
        showFunToast("✅ Item successfully added to your cart!", "green", "left");
      }
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });
}







function attachCartEventListeners() {
 

  // Attach event listeners to trash buttons
  document.querySelectorAll(".trash-can-button").forEach((button) => {
    button.addEventListener("click", async function () {
      const fragranceId = this.getAttribute("data-fragrance-id");
      const size = this.getAttribute("data-size");
      const cartItem = this.closest(".cart-item");
      const cartItemsContainer = document.querySelector(
        ".cart-items-container"
      );

      try {
        const res = await fetch("/api/users/removefromcart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fragranceId, size }),
        });

        const data = await res.json();
        if (data.success) {
          cartItem.remove();
          updateSubtotal();

          // Check if this was the last item
          const remainingItems =
            cartItemsContainer.querySelectorAll(".cart-item");
          if (remainingItems.length === 0) {
            cartItemsContainer.innerHTML = `
              <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
                <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
                <h4 class="mt-3">Your cart is empty.</h4>
              </div>
            `;
          }
        } else {
          alert("Error removing item. Please try again.");
        }
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      }
    });
  });
}