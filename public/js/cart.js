console.log("Cart.js loaded"); // Debug log

function updateSubtotal() {
  const cartItems = document.querySelectorAll(".cart-item");
  let subtotal = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.getAttribute("data-price"));
    const quantity = parseInt(item.querySelector(".quantity-input").value);
    subtotal += price * quantity;
  });

  const subtotalElement = document.querySelector(".cart-info-subtotal span");
  if (subtotalElement) {
    subtotalElement.textContent = `${subtotal} EGP`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const plusButtons = document.querySelectorAll(".plus-button");
  const minusButtons = document.querySelectorAll(".minus-button");

  // 🔒 Lock map per button
  const lockMap = new WeakMap();

  function isLocked(button) {
    return lockMap.get(button);
  }

  function lock(button) {
    lockMap.set(button, true);
    button.disabled = true;
  }

  function unlock(button) {
    lockMap.set(button, false);
    button.disabled = false;
  }

  // 🔼 PLUS BUTTON
  plusButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      if (isLocked(this)) return;
      lock(this);

      const fragranceId = this.getAttribute("data-fragrance-id");
      const size = this.getAttribute("data-size");
      const cartItem = this.closest(".cart-item");
      const quantityInput = cartItem.querySelector(".quantity-input");
      const originalQty = parseInt(quantityInput.value);

      quantityInput.value = originalQty + 1;
      updateSubtotal();

      try {
        const res = await fetch("/api/users/increase", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: fragranceId, size }),
        });

        const data = await res.json();

        if (!data.success) {
          quantityInput.value = originalQty; // revert
        }
      } catch (error) {
        quantityInput.value = originalQty;
        console.error("Increase error:", error);
      }

      unlock(this);
      // Dispatch cart-updated event for checkout sync
      window.dispatchEvent(new Event("cart-updated"));
    });
  });

  // 🔽 MINUS BUTTON
  minusButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      if (isLocked(this)) return;
      lock(this);

      const fragranceId = this.getAttribute("data-fragrance-id");
      const size = this.getAttribute("data-size");
      const cartItem = this.closest(".cart-item");
      const quantityInput = cartItem.querySelector(".quantity-input");
      const originalQty = parseInt(quantityInput.value);

      if (originalQty <= 1) {
        unlock(this);
        return;
      }

      quantityInput.value = originalQty - 1;
      updateSubtotal();

      try {
        const res = await fetch("/api/users/decrease", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: fragranceId, size }),
        });

        const data = await res.json();

        if (!data.success) {
          quantityInput.value = originalQty;
        }
      } catch (error) {
        quantityInput.value = originalQty;
        console.error("Decrease error:", error);
      }

      unlock(this);
      // Dispatch cart-updated event for checkout sync
      window.dispatchEvent(new Event("cart-updated"));
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".trash-can-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const fragranceId = button.getAttribute("data-fragrance-id");
      const size = button.getAttribute("data-size");
      const cartItem = button.closest(".cart-item");
      const cartItemsContainer = document.querySelector(
        ".cart-items-container"
      );

      cartItem.remove();
      updateSubtotal();

      try {
        const res = await fetch("/api/users/removefromcart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fragranceId, size }),
        });

        const data = await res.json();
        if (!data.success) {
          alert("Error removing item. Please try again.");
        }

        // ✅ Check again after removal
        if (
          cartItemsContainer &&
          cartItemsContainer.querySelectorAll(".cart-item").length === 0
        ) {
          cartItemsContainer.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
              <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
              <h4 class="mt-3">Your cart is empty.</h4>
            </div>
          `;
        }
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      }
      // Dispatch cart-updated event for checkout sync
      window.dispatchEvent(new Event("cart-updated"));
    });
  });
});

// Function to fetch and display gifts
async function fetchAndDisplayGifts() {
  console.log("Fetching gifts..."); // Debug log
  
  const cartItemsContainer = document.querySelector('.cart-items-container');
  if (!cartItemsContainer) {
    console.log("Cart container not found"); // Debug log
    return;
  }

  // Don't show empty state while loading
  const existingEmptyState = cartItemsContainer.querySelector('.d-flex.flex-column.justify-content-center');
  if (existingEmptyState) {
    existingEmptyState.remove();
  }

  try {
    console.log("Making fetch request to /api/gifting"); // Debug log
    const response = await fetch('/api/gifting', {
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log("Response status:", response.status); // Debug log
    
    if (!response.ok) {
      throw new Error(`Failed to fetch gifts: ${response.status}`);
    }

    const gifts = await response.json();
    console.log("Received gifts:", gifts); // Debug log
    
    if (gifts.length === 0) {
      console.log("No gifts found"); // Debug log
      return;
    }

    // Create gift items HTML
    const giftItems = gifts.map(gift => `
      <div class="row cart-item mb-3" data-price="${gift.totalPrice}">
        <div class="col-md-3">
          <img
            src="${gift.perfume.image[0]}"
            alt="${gift.perfume.name}"
            class="img-fluid rounded"
          />
        </div>
        <div class="col-md-5 mt-3">
          <h5 class="card-title">Gift Package</h5>
          <p class="text-muted">
            Perfume: ${gift.perfume.name} | Wrap: ${gift.wrap.name} | Card: ${gift.card.name}
          </p>
          <p class="text-muted">
            To: ${gift.recipientName}
          </p>
        </div>
        <div class="col-md-4 d-flex flex-column">
          <p class="fw-bold mb-2 text-end">${gift.totalPrice} EGP</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="input-group" style="max-width: 180px">
              <input
                type="text"
                class="form-control form-control-sm text-center quantity-input"
                value="1"
                min="0"
                readonly
              />
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger trash-can-button remove-gift ms-2"
              data-gift-id="${gift._id}"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Append gifts to the cart container
    cartItemsContainer.insertAdjacentHTML('beforeend', giftItems);

    // Add event listeners for gift remove buttons
    document.querySelectorAll('.remove-gift').forEach(button => {
      button.addEventListener('click', async (e) => {
        const giftId = e.target.closest('.remove-gift').dataset.giftId;
        const giftItem = e.target.closest('.cart-item');
        
        try {
          // Show loading state
          giftItem.style.opacity = '0.5';
          e.target.disabled = true;
          
          const response = await fetch(`/api/gifting/${giftId}`, {
            method: 'DELETE',
            credentials: 'include'
          });

          if (!response.ok) {
            throw new Error('Failed to remove gift');
          }

          // Remove the item with animation
          giftItem.style.transition = 'all 0.3s ease';
          giftItem.style.height = '0';
          giftItem.style.margin = '0';
          giftItem.style.padding = '0';
          giftItem.style.overflow = 'hidden';
          
          setTimeout(() => {
            giftItem.remove();
            showFunToast('Gift removed successfully', 'green');
            updateSubtotal();
            
            // Check if cart is empty
            const remainingItems = document.querySelectorAll('.cart-item');
            if (remainingItems.length === 0) {
              cartItemsContainer.innerHTML = `
                <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
                  <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
                  <h4 class="mt-3">Your cart is empty.</h4>
                </div>
              `;
            }
          }, 300);
        } catch (error) {
          console.error('Error removing gift:', error);
          showFunToast('Failed to remove gift', 'red');
          
          // Reset button state
          giftItem.style.opacity = '1';
          e.target.disabled = false;
        }
      });
    });

    // Update subtotal to include gifts
    updateSubtotal();
  } catch (error) {
    console.error('Error fetching gifts:', error);
    showFunToast('Failed to load gifts', 'red');
  }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded"); // Debug log
  fetchAndDisplayGifts();
});

// Listen for cart updates
window.addEventListener('cart-updated', function() {
  console.log('Cart updated, refreshing gifts...');
  fetchAndDisplayGifts();
});
