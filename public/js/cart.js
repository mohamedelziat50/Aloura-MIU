function updateSubtotal() {
  const cartItems = document.querySelectorAll(".cart-item");
  let subtotal = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.getAttribute("data-price"));
    const quantity = parseInt(item.querySelector(".quantity-input").value);
    subtotal += price * quantity;
  });

  const subtotalElement = document.querySelector(".cart-info-subtotal span");
  subtotalElement.textContent = `${subtotal} EGP`;
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
      const category = cartItem.getAttribute("data-category") || "regular";
      const cardName = cartItem.getAttribute("data-card-name");
      const wrapName = cartItem.getAttribute("data-wrap-name");
      const cartItemsContainer = document.querySelector(
        ".cart-items-container"
      );

      try {
        const res = await fetch("/api/users/removefromcart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fragranceId,
            size,
            category,
            cardName,
            wrapName,
          }),
        });

        const data = await res.json();
        if (data.success) {
          cartItem.remove();
          updateSubtotal();

          // Check if this was the last item
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
        } else {
          alert("Error removing item. Please try again.");
        }
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      }
      // Dispatch cart-updated event for checkout sync
      window.dispatchEvent(new Event("cart-updated"));
    });
  });
});
