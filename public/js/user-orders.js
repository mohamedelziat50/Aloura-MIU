import showFunToast from "/js/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("orderSearchInput");
  const ordersList = document.querySelector(".user-orders-list");

  let debounceTimer;

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const query = searchInput.value.trim();

      try {
        const res = await fetch(
          `/api/orders/search?q=${encodeURIComponent(query)}`
        );
        const orders = await res.json();

        if (!orders.length) {
          ordersList.innerHTML = `<p class="text-center">No orders found for "${query}"</p>`;
          return;
        }

        ordersList.innerHTML = "";

        orders.forEach((order) => {
          const itemsHTML = order.items
            .map(
              (item) => `
              <div class="user-order-item">
                <img src="${item.fragrance.image[0]}" alt="${
                item.fragrance.name
              }" class="user-order-item-img" />
                <div class="user-order-item-details">
                  <div class="user-order-item-title">${
                    item.fragrance.name
                  }</div>
                  <div class="user-order-item-meta">
                    Size: ${item.size} | Quantity: ${
                item.quantity
              } | Unit Price: ${item.price} EGP | Total Price: ${(
                item.price * item.quantity
              ).toFixed(2)} EGP
                  </div>
                </div>
                <div class="user-order-item-actions">
                  <a href="/fragrances-page/${
                    item.fragrance._id
                  }"><button class="order-btn">Buy it again</button></a>
                  <button class="order-btn">Write a Product Review</button>
                </div>
              </div>`
            )
            .join("");

          const cardHTML = `
              <div class="user-order-card">
                <div class="user-order-summary">
                  <div class="user-order-info">
                    <span class="order-label">ORDER PLACED</span>
                    <span class="order-value">${moment(order.createdAt).format(
                      "D MMMM YYYY"
                    )}</span>
                  </div>
                  <div class="user-order-info">
                    <span class="order-label">TOTAL</span>
                    <span class="order-value">EGP ${order.totalPrice.toFixed(
                      2
                    )}</span>
                  </div>
                  <div class="user-order-info">
                    <span class="order-label">City</span>
                    <span class="order-value">${
                      order.shippingAddress.city
                    }</span>
                  </div>
                  <div class="user-order-info">
                    <span class="order-label">Address</span>
                    <span class="order-value">${
                      order.shippingAddress.address
                    }</span>
                  </div>
                  <div class="user-order-info">
                    <span class="order-label">Apartment</span>
                    <span class="order-value">${
                      order.shippingAddress.apartment
                    }</span>
                  </div>
                  <div class="user-order-links">
                    <div class="user-order-info order-id-info">
                      <span class="order-label">ORDER #${
                        order.orderNumber
                      }</span>
                    </div>
                  </div>
                </div>
                <div class="user-order-items">
                  ${itemsHTML}
                </div>
              </div>`;

          ordersList.insertAdjacentHTML("beforeend", cardHTML);
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
        ordersList.innerHTML = `<p class="text-center text-danger">Error loading search results.</p>`;
      }
    }, 300);
  });

  // User's cancel order
  window.cancelOrder = async (orderId, status) => {
    try {
      const response = await fetch(`/api/orders/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, orderId }),
      });

      const data = await response.json();

      if (response.ok) {
        showFunToast(
          data.message || "✅ Order cancelled successfully!",
          "green"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        showFunToast(data.error || "❗ Failed to cancel order status.", "red");
      }
    } catch (error) {
      showFunToast(error.message || "❗ An error occurred.", "red");
    }
  };
});
