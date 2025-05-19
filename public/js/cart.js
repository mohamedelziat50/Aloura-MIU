document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".trash-can-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const fragranceId = button.getAttribute("data-fragrance-id");
      const size = button.getAttribute("data-size");

      try {
        const res = await fetch("/api/users/removefromcart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fragranceId, size }),
        });

        const data = await res.json();
        console.log(data.message);
        if (data.success) {
          location.reload(); // or remove the element dynamically
        }
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      }
    });
  });
});

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
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trashButtons = document.querySelectorAll(".trash-can-button");

  trashButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      const fragranceId = this.getAttribute("data-fragrance-id");
      const size = this.getAttribute("data-size");

      const cartItem = this.closest(".cart-item");

      // Optimistically remove the item from UI
      cartItem.remove();
      updateSubtotal();

      try {
        const res = await fetch("/api/users/cart/" + fragranceId, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ size }), // size is optional but recommended
        });
        if (res.status === 204) {
          return { success: true }; // mock a success
        }

        const data = await res.json();

        if (!data.success) {
          // Optionally re-insert the item if needed
          window.location.reload(); // fallback in case of failure
        }
      } catch (error) {
        console.error("Remove from cart error:", error);
      }
    });
  });
});
