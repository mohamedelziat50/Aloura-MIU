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

        // Create a minimal gift data object with only necessary fields
        const giftData = {
          perfume: {
            name: selectedPerfume.querySelector("h3")?.textContent.trim() || "Not selected",
            price: cleanPerfumePrice
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
          totalPrice: totalPrice
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

        // Close the modal
        const giftModal = document.getElementById("gift-modal");
        if (giftModal) {
          giftModal.style.display = "none";
          document.body.style.overflow = "auto";
        }

        // Update the cart UI
        const cartItemsContainer = document.querySelector(".cart-items-container");
        if (cartItemsContainer) {
          try {
            // Fetch both cart items and gifts
            const [cartResponse, giftsResponse] = await Promise.all([
              fetch("/api/users/cart", { credentials: "include" }),
              fetch("/api/gifting", { credentials: "include" })
            ]);

            const cartData = await cartResponse.json();
            const giftsData = await giftsResponse.json();

            const hasCartItems = cartData.success && cartData.cart && cartData.cart.length > 0;
            const hasGifts = Array.isArray(giftsData) && giftsData.length > 0;
            const isEmpty = !hasCartItems && !hasGifts;

            // Clear existing items
            cartItemsContainer.innerHTML = "";

            // If both cart and gifts are empty, show empty state
            if (isEmpty) {
              cartItemsContainer.innerHTML = `
                <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
                  <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
                  <h4 class="mt-3">Your cart is empty.</h4>
                </div>
              `;
            } else {
              // Add cart items if they exist
              if (hasCartItems) {
                cartData.cart.forEach((item) => {
                  const cartItemHTML = `
                    <div class="row cart-item mb-3" data-price="${item.price}">
                      <div class="col-md-3">
                        <img src="${item.fragrance.image[0]}" alt="${item.fragrance.name}" class="img-fluid rounded" />
                      </div>
                      <div class="col-md-5 mt-3">
                        <h5 class="card-title">${item.fragrance.name}</h5>
                        <p class="text-muted">Gender: ${item.fragrance.gender} | Size: ${item.size}</p>
                      </div>
                      <div class="col-md-4 d-flex flex-column">
                        <p class="fw-bold mb-2 text-end">${item.price} EGP</p>
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="input-group" style="max-width: 180px">
                            <button type="button" class="btn btn-outline-secondary btn-sm minus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">-</button>
                            <input type="text" class="form-control form-control-sm text-center quantity-input" value="${item.quantity}" min="0" />
                            <button type="button" class="btn btn-outline-secondary btn-sm plus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">+</button>
                          </div>
                          <button type="button" class="btn btn-sm btn-outline-danger trash-can-button ms-2" data-size="${item.size}" data-fragrance-id="${item.fragrance._id}">
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                  cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
                });
              }

              // Add gift items if they exist
              if (hasGifts) {
                giftsData.forEach((gift) => {
                  if (gift && gift.perfume) {
                    const giftItemHTML = `
                      <div class="row cart-item mb-3" data-price="${gift.totalPrice}">
                        <div class="col-md-3">
                          <img src="${gift.perfume.image || '/images/default-perfume.jpg'}" 
                               alt="${gift.perfume.name}" 
                               class="img-fluid rounded" />
                        </div>
                        <div class="col-md-5 mt-3">
                          <h5 class="card-title">${gift.perfume.name}</h5>
                          <p class="text-muted">Gift for: ${gift.recipientName} | Wrap: ${gift.wrap.name}</p>
                          ${gift.message ? `<p class="text-muted small">Message: ${gift.message}</p>` : ''}
                        </div>
                        <div class="col-md-4 d-flex flex-column">
                          <p class="fw-bold mb-2 text-end">${gift.totalPrice} EGP</p>
                          <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-sm btn-outline-danger trash-can-button" data-gift-id="${gift._id}">
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                    cartItemsContainer.insertAdjacentHTML("beforeend", giftItemHTML);
                  }
                });
              }
            }

            // Update subtotal
            updateSubtotal();

            // Reattach event listeners
            attachCartEventListeners();
          } catch (error) {
            console.error("Error updating cart:", error);
          }
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

// Function to attach event listeners to cart buttons
function attachCartEventListeners() {
  // Attach event listeners to trash buttons
  document.querySelectorAll(".trash-can-button").forEach((button) => {
    button.addEventListener("click", async function () {
      const giftId = this.getAttribute("data-gift-id");
      const fragranceId = this.getAttribute("data-fragrance-id");
      const size = this.getAttribute("data-size");
      const cartItem = this.closest(".cart-item");
      const cartItemsContainer = document.querySelector(".cart-items-container");

      try {
        let res;
        if (giftId) {
          // Handle gift removal
          res = await fetch(`/api/gifting/${giftId}`, {
            method: "DELETE",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            credentials: "include"
          });
        } else {
          // Handle regular cart item removal
          res = await fetch("/api/users/removefromcart", {
            method: "DELETE",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ fragranceId, size })
          });
        }

        const data = await res.json();

        // Check for successful deletion - consider 200 status as success even without specific message
        if (res.ok) {
          cartItem.remove();
          updateSubtotal();

          // Check if this was the last item
          const remainingItems = cartItemsContainer.querySelectorAll(".cart-item");
          if (remainingItems.length === 0) {
            cartItemsContainer.innerHTML = `
              <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
                <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
                <h4 class="mt-3">Your cart is empty.</h4>
              </div>
            `;
          }
          showFunToast("Item removed successfully", "green");
        } else {
          throw new Error(data.message || data.error || "Failed to remove item");
        }
      } catch (err) {
        console.error("Error in delete operation:", err);
        showFunToast(err.message || "Error removing item. Please try again.", "red");
      }
    });
  });
}

// Function to update subtotal
function updateSubtotal() {
  const cartItems = document.querySelectorAll(".cart-item");
  let subtotal = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.getAttribute("data-price"));
    const quantityInput = item.querySelector(".quantity-input");
    if (quantityInput) {
      const quantity = parseInt(quantityInput.value);
      subtotal += price * quantity;
    } else {
      subtotal += price;
    }
  });

  const subtotalElement = document.querySelector(".cart-info-subtotal span");
  if (subtotalElement) {
    subtotalElement.textContent = `${subtotal} EGP`;
  }
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", async () => {
  const cartItemsContainer = document.querySelector(".cart-items-container");
  if (cartItemsContainer) {
    try {
      // Fetch both cart items and gifts
      const [cartResponse, giftsResponse] = await Promise.all([
        fetch("/api/users/cart", { credentials: "include" }),
        fetch("/api/gifting", { credentials: "include" })
      ]);

      const cartData = await cartResponse.json();
      const giftsData = await giftsResponse.json();

      const hasCartItems = cartData.success && cartData.cart && cartData.cart.length > 0;
      const hasGifts = Array.isArray(giftsData) && giftsData.length > 0;
      const isEmpty = !hasCartItems && !hasGifts;

      // If both cart and gifts are empty, show empty state
      if (isEmpty) {
        cartItemsContainer.innerHTML = `
          <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
            <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
            <h4 class="mt-3">Your cart is empty.</h4>
          </div>
        `;
        return;
      }

      // Clear existing items
      cartItemsContainer.innerHTML = "";

      // Add cart items if they exist
      if (hasCartItems) {
        cartData.cart.forEach((item) => {
          const cartItemHTML = `
            <div class="row cart-item mb-3" data-price="${item.price}">
              <div class="col-md-3">
                <img src="${item.fragrance.image[0]}" alt="${item.fragrance.name}" class="img-fluid rounded" />
              </div>
              <div class="col-md-5 mt-3">
                <h5 class="card-title">${item.fragrance.name}</h5>
                <p class="text-muted">Gender: ${item.fragrance.gender} | Size: ${item.size}</p>
              </div>
              <div class="col-md-4 d-flex flex-column">
                <p class="fw-bold mb-2 text-end">${item.price} EGP</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="input-group" style="max-width: 180px">
                    <button type="button" class="btn btn-outline-secondary btn-sm minus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">-</button>
                    <input type="text" class="form-control form-control-sm text-center quantity-input" value="${item.quantity}" min="0" />
                    <button type="button" class="btn btn-outline-secondary btn-sm plus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">+</button>
                  </div>
                  <button type="button" class="btn btn-sm btn-outline-danger trash-can-button ms-2" data-size="${item.size}" data-fragrance-id="${item.fragrance._id}">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
          cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
        });
      }

      // Add gift items if they exist
      if (hasGifts) {
        giftsData.forEach((gift) => {
          if (gift && gift.perfume) {
            const giftItemHTML = `
              <div class="row cart-item mb-3" data-price="${gift.totalPrice}">
                <div class="col-md-3">
                  <img src="${gift.perfume.image || '/images/default-perfume.jpg'}" 
                       alt="${gift.perfume.name}" 
                       class="img-fluid rounded" />
                </div>
                <div class="col-md-5 mt-3">
                  <h5 class="card-title">${gift.perfume.name}</h5>
                  <p class="text-muted">Gift for: ${gift.recipientName} | Wrap: ${gift.wrap.name}</p>
                  ${gift.message ? `<p class="text-muted small">Message: ${gift.message}</p>` : ''}
                </div>
                <div class="col-md-4 d-flex flex-column">
                  <p class="fw-bold mb-2 text-end">${gift.totalPrice} EGP</p>
                  <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-sm btn-outline-danger trash-can-button" data-gift-id="${gift._id}">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;
            cartItemsContainer.insertAdjacentHTML("beforeend", giftItemHTML);
          }
        });
      }

      // Update subtotal
      updateSubtotal();

      // Attach event listeners
      attachCartEventListeners();
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }
});
