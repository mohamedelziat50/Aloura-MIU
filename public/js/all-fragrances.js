import showFunToast from "/js/toast.js";
// Select all ml elements from the card-price container
const mlElements = document.querySelectorAll(".card-price .ml");

// Loop Through Each .ml Element
mlElements.forEach((ml) => {
  // Find the Closest .card-price Container to be used as reference later
  const cardPrice = ml.closest(".card-price");

  const dropdownMenu = cardPrice.querySelector(".dropdown-menu");

  // Add a click event listener for every ml
  ml.addEventListener("click", (e) => {
    // Prevent the click from bubbling up to the document
    e.stopPropagation();
    // toggles the active class on the .card-price container. This class is used to show/hide the dropdown menu.
    cardPrice.classList.toggle("active");

    // Reset display to block before fade-in animation
    if (cardPrice.classList.contains("active")) {
      dropdownMenu.style.display = "block";
    }
  });

  // Selects all elements with the class .dropdown-option inside the current .card-price container.
  // Add click event listeners to each dropdown option to handle selection.
  const dropdownOptions = cardPrice.querySelectorAll(".dropdown-option");
  dropdownOptions.forEach((option) => {
    // Add Click Event Listener to each Dropdown Option
    option.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click from bubbling up to the card-price div

      // gets the data-price attribute value from the clicked option.
      const price = option.getAttribute("data-price");
      // same thing
      const ml = option.getAttribute("data-ml");

      // updates the .price element inside the .card-price container with the selected price.
      cardPrice.querySelector(".price").textContent = price;
      cardPrice.querySelector(".ml").textContent = `${ml} ▼`; // Update ml with arrow

      // removes the active class from the .card-price container, hiding the dropdown menu.
      cardPrice.classList.remove("active"); // Hide dropdown after selection
    });
  });

  // Hide dropdown after fade-out animation completes
  dropdownMenu.addEventListener("animationend", (e) => {
    if (e.animationName === "fadeOutTop") {
      dropdownMenu.style.display = "none"; // Hide the dropdown after animation
    }
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  mlElements.forEach((ml) => {
    const cardPrice = ml.closest(".card-price");
    if (cardPrice.classList.contains("active")) {
      cardPrice.classList.remove("active"); // Hide the dropdown
    }
  });
});

// ==================== New Filter Button Code ====================
// LITERALLY SAME CODE AS ABOVE, BUT WE CHANGE ONLY A SINGLE BUTTON'S TEXT, NOT PRICE + ML
function initializeFilterButton() {
  // Select the filter button and its container
  const filterButton = document.querySelector(".filter-button");
  const filterContainer = document.querySelector(".filter-container");

  // Exit if either element doesn't exist
  if (!filterButton || !filterContainer) {
    return;
  }

  const dropdownMenuFilter = filterContainer.querySelector(
    ".dropdown-menu-filter"
  );
  if (!dropdownMenuFilter) {
    return;
  }

  // Toggle dropdown menu on filter button click
  filterButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the document
    filterContainer.classList.toggle("active");

    // Reset display to block before fade-in animation
    if (filterContainer.classList.contains("active")) {
      dropdownMenuFilter.style.display = "block";
    }
  });

  // Add click event listeners to each dropdown option
  const dropdownOptionsFilter = filterContainer.querySelectorAll(
    ".dropdown-option-filter"
  );
  dropdownOptionsFilter.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click from bubbling up to the filter container

      // Get the selected value
      const value = option.getAttribute("data-value");

      // Update the filter button text with the selected value
      filterButton.textContent = `${value} ▼`;

      // Hide the dropdown after selection
      filterContainer.classList.remove("active");
    });
  });

  // Hide dropdown after fade-out animation completes
  dropdownMenuFilter.addEventListener("animationend", (e) => {
    if (e.animationName === "fadeOutTop") {
      dropdownMenuFilter.style.display = "none"; // Hide the dropdown after animation
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    if (filterContainer.classList.contains("active")) {
      filterContainer.classList.remove("active"); // Hide the dropdown
    }
  });
}

// Initialize the filter button functionality
initializeFilterButton();

// =====================SEARCH BAR RELATED===================================
function initializeSearchBar() {
  const searchBox = document.getElementById("searchBox");
  const clearSearch = document.getElementById("clearSearch");

  // Exit if either element doesn't exist
  if (!searchBox || !clearSearch) {
    return;
  }

  // Add an event listener for the search box to listen for input (text)
  searchBox.addEventListener("input", () => {
    // If searchBox has a value, then we'll display the clear icon!
    clearSearch.style.display = searchBox.value ? "block" : "none";
  });

  // Close icon event listener
  clearSearch.addEventListener("click", () => {
    // Reset searchBox's value to empty
    searchBox.value = "";
    // Then hide the icon once again
    clearSearch.style.display = "none";
  });
}

// Initialize the search bar functionality
initializeSearchBar();

const allCards = new Set(); // Global
let fragranceCards; // Global

document.addEventListener("DOMContentLoaded", () => {
  fragranceCards = document.querySelectorAll(".card");

  fragranceCards.forEach((card) => {
    allCards.add(card);
  });

  const filterOptions = document.querySelectorAll(".dropdown-option-filter");
  const filterButton = document.querySelector(".filter-button");

  // ✅ FIX: You forgot this forEach loop!
  filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedCategory = option.getAttribute("data-value");
      filterButton.textContent = `${selectedCategory} ▼`;

      const matchingCards = [];

      // Step 1: Hide all cards instantly
      allCards.forEach((card) => {
        card.classList.add("hidden");
        card.removeAttribute("data-scrolly-top");
        card.removeAttribute("data-scrolly-down");
      });

      // Step 2: Collect matching cards
      fragranceCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        const isMatch =
          selectedCategory === "None" ||
          cardCategory.toLowerCase() === selectedCategory.toLowerCase();

        if (isMatch) {
          matchingCards.push(card);
        }
      });

      // Step 3: Reveal matching cards cleanly (1 frame later)
      requestAnimationFrame(() => {
        matchingCards.forEach((card) => {
          card.classList.remove("hidden");
          card.setAttribute(
            "data-scrolly-top",
            "moveFromTop, duration:0.5s, delay:0.1s"
          );
          card.setAttribute(
            "data-scrolly-down",
            "moveFromBottom, duration:1.0s, delay:0.12s"
          );
        });
      });
    });
  });
});

const genderLinks = document.querySelectorAll(".gender-filter");

genderLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // prevent page jump

    const selectedGender = link.getAttribute("data-gender");
    const matchingCards = [];

    // Step 1: Hide all cards
    allCards.forEach((card) => {
      card.classList.add("hidden");
      card.removeAttribute("data-scrolly-top");
      card.removeAttribute("data-scrolly-down");
    });

    // Step 2: Collect matching cards
    fragranceCards.forEach((card) => {
      const cardGender = card.getAttribute("data-gender");

      const isMatch =
        selectedGender === "None" ||
        cardGender.toLowerCase() === selectedGender.toLowerCase();

      if (isMatch) {
        matchingCards.push(card);
      }
    });

    // Step 3: Reveal matching cards
    requestAnimationFrame(() => {
      matchingCards.forEach((card) => {
        card.classList.remove("hidden");
        card.setAttribute(
          "data-scrolly-top",
          "moveFromTop, duration:0.5s, delay:0.1s"
        );
        card.setAttribute(
          "data-scrolly-down",
          "moveFromBottom, duration:1.0s, delay:0.12s"
        );
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const genderFromUrl = urlParams.get("gender");

  if (genderFromUrl) {
    const matchingCards = [];

    allCards.forEach((card) => {
      card.classList.add("hidden");
      card.removeAttribute("data-scrolly-top");
      card.removeAttribute("data-scrolly-down");
    });

    fragranceCards.forEach((card) => {
      const cardGender = card.getAttribute("data-gender");
      if (
        genderFromUrl === "None" ||
        cardGender.toLowerCase() === genderFromUrl.toLowerCase()
      ) {
        matchingCards.push(card);
      }
    });

    requestAnimationFrame(() => {
      matchingCards.forEach((card) => {
        card.classList.remove("hidden");
        card.setAttribute(
          "data-scrolly-top",
          "moveFromTop, duration:0.5s, delay:0.1s"
        );
        card.setAttribute(
          "data-scrolly-down",
          "moveFromBottom, duration:1.0s, delay:0.12s"
        );
      });
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".card-button");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      const card = this.closest(".card");
      const cardPriceContainer = card.querySelector(".card-price");

      const priceText = cardPriceContainer
        ?.querySelector(".price")
        ?.textContent?.trim();
      const mlText = cardPriceContainer
        ?.querySelector(".ml")
        ?.textContent?.trim();

      if (!priceText || !mlText) {
        alert("Missing price or size.");
        return;
      }

      const price = parseFloat(priceText);
      const size = mlText.replace("▼", "").trim();
      const productId = this.getAttribute("productId");

      if (!productId) {
        alert("Missing product ID.");
        return;
      }

      const data = { productId, size, price };
      console.log("Sending to backend:", data);

      try {
        const response = await fetch("/api/users/addToCart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          updateCartUI(result);
        } else {
          alert("Error: " + result.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    });
  });
});

// Function to update the UI (e.g., cart count, cart items list, etc.)
function updateCartUI(result) {
  // Update the cart count displayed in the header
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = result.cartCount;
  }

  // Get the cart items container
  const cartItemsContainer = document.querySelector(".cart-items-container");
  if (!cartItemsContainer) return;

  // If cart is empty, show empty state
  if (result.cartCount === 0) {
    cartItemsContainer.innerHTML = `
      <div class="d-flex flex-column justify-content-center align-items-center text-muted mt-3" style="min-height: 300px">
        <i class="bi bi-cart-x" style="font-size: 2.5rem"></i>
        <h4 class="mt-3">Your cart is empty.</h4>
      </div>
    `;
    return;
  }

  // Fetch both cart items and gifts
  Promise.all([
    fetch("/api/users/cart").then(response => response.json()),
    fetch("/api/gifting", {
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())
  ])
    .then(([cartData, giftsData]) => {
      if (cartData.success && cartData.cart) {
        // Clear existing items
        cartItemsContainer.innerHTML = "";

        // Add each cart item
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

        // Add gifts if any exist
        if (giftsData && giftsData.length > 0) {
          giftsData.forEach(gift => {
            const giftItemHTML = `
              <div class="row cart-item mb-3" data-price="${gift.totalPrice}">
                <div class="col-md-3">
                  <img
                    src="/images/gift-package.jpg"
                    alt="Gift Package"
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
            `;
            cartItemsContainer.insertAdjacentHTML("beforeend", giftItemHTML);
          });
        }

        // Update subtotal
        updateSubtotal();

        // Reattach event listeners for the new buttons
        attachCartEventListeners();
        showFunToast(
          "✅ Item successfully added to your cart!",
          "green",
          "left"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });
}

// Function to attach event listeners to cart buttons
function attachCartEventListeners() {
  // Attach event listeners to plus buttons
  document.querySelectorAll(".plus-button").forEach((button) => {
    button.addEventListener("click", async function () {
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
          quantityInput.value = originalQty;
        }
      } catch (error) {
        quantityInput.value = originalQty;
        console.error("Increase error:", error);
      }
    });
  });

  // Attach event listeners to minus buttons
  document.querySelectorAll(".minus-button").forEach((button) => {
    button.addEventListener("click", async function () {
      const fragranceId = this.getAttribute("data-fragrance-id");
      const size = this.getAttribute("data-size");
      const cartItem = this.closest(".cart-item");
      const quantityInput = cartItem.querySelector(".quantity-input");
      const originalQty = parseInt(quantityInput.value);

      if (originalQty <= 1) return;

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
    });
  });

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

// Function to update subtotal
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

function initializeSearchFunctionality() {
  const searchBox = document.getElementById("searchBox");
  if (!searchBox) return;

  let lastVisibleCardIds = [];

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".card");

    // Find the new matching cards
    const matchingCards = Array.from(cards).filter((card) => {
      const productName = card
        .querySelector(".card-title")
        .textContent.toLowerCase();
      return productName.includes(query);
    });

    // Get new visible card "IDs" (or indexes if no IDs exist)
    const newVisibleCardIds = matchingCards.map(
      (card, index) => card.dataset.id || index
    );

    // Compare old and new visible card sets
    const hasChanged =
      lastVisibleCardIds.length !== newVisibleCardIds.length ||
      !lastVisibleCardIds.every((id, i) => id === newVisibleCardIds[i]);

    if (!hasChanged) {
      // No change: skip the hide/show animation
      return;
    }

    // Update the lastVisibleCardIds
    lastVisibleCardIds = newVisibleCardIds;

    // Step 1: Hide all cards instantly
    cards.forEach((card) => {
      card.classList.add("hidden");
      card.style.display = "none";
    });

    // Step 2: After short delay, show only matching cards
    setTimeout(() => {
      matchingCards.forEach((card) => {
        card.classList.remove("hidden");
        card.style.display = "";
      });
    }, 50); // You can increase this to 300ms for smoother animation
  });
}

initializeSearchFunctionality();

const clearSearch = document.getElementById("clearSearch");
const searchBox = document.getElementById("searchBox");

clearSearch.addEventListener("click", () => {
  if (searchBox) {
    searchBox.value = "";
  }

  const cards = document.querySelectorAll(".card");

  // First, hide all cards
  cards.forEach((card) => {
    card.classList.add("hidden");
    card.style.display = "none";
  });

  // After a short delay (e.g., 300ms), show all cards again
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("hidden");
      card.style.display = "";
    });
  }, 50); // 300 milliseconds delay
});
