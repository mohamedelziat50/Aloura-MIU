import showFunToast from "./toast.js";
document.addEventListener("DOMContentLoaded", function () {
  let images = [
    document.getElementById("main-image").src,
    ...Array.from(document.getElementsByClassName("subimage")).map(
      (img) => img.src
    ),
  ];

  let lightbox = document.getElementById("lightbox");
  let lightboxImg = document.getElementById("lightbox-img");
  let mainImage = document.getElementById("main-image");
  let prevArrow = document.getElementById("prev-arrow");
  let nextArrow = document.getElementById("next-arrow");
  let overlay = document.createElement("div");
  overlay.id = "lightbox-overlay";
  document.body.appendChild(overlay);

  let currentImageIndex = 0;
  let scale = 1;
  const zoomMin = 1;
  const zoomMax = 3;

  function openLightbox(index) {
    currentImageIndex = index;
    lightbox.style.display = "flex";
    overlay.style.display = "block"; // Show overlay
    lightboxImg.src = images[currentImageIndex];
    scale = 1;
    lightboxImg.style.transform = `scale(${scale})`;
    document.body.style.overflow = "hidden"; // Disable scrolling
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    overlay.style.display = "none"; // Hide overlay
    document.body.style.overflow = ""; // Enable scrolling
  }

  mainImage.addEventListener("click", function () {
    openLightbox(0);
  });

  document.querySelectorAll(".subimage").forEach((img, index) => {
    img.addEventListener("click", function () {
      openLightbox(index + 1);
    });
  });

  overlay.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    else if (currentImageIndex >= images.length) currentImageIndex = 0;
    lightboxImg.src = images[currentImageIndex];
    scale = 1;
    lightboxImg.style.transform = `scale(${scale})`;
  }

  prevArrow.addEventListener("click", function (event) {
    event.stopPropagation();
    changeImage(-1);
  });

  nextArrow.addEventListener("click", function (event) {
    event.stopPropagation();
    changeImage(1);
  });

  lightboxImg.addEventListener("wheel", function (event) {
    event.preventDefault();
    let zoomFactor = event.deltaY < 0 ? 0.1 : -0.1;
    scale = Math.min(Math.max(zoomMin, scale + zoomFactor), zoomMax);
    lightboxImg.style.transform = `scale(${scale})`;
  });

  let touchStartDistance = 0;
  lightboxImg.addEventListener("touchstart", function (event) {
    if (event.touches.length === 2)
      touchStartDistance = getTouchDistance(event);
  });

  lightboxImg.addEventListener("touchmove", function (event) {
    if (event.touches.length === 2) {
      event.preventDefault();
      let newDistance = getTouchDistance(event);
      let zoomFactor = newDistance / touchStartDistance;
      scale = Math.min(Math.max(zoomMin, scale * zoomFactor), zoomMax);
      lightboxImg.style.transform = `scale(${scale})`;
      touchStartDistance = newDistance;
    }
  });

  function getTouchDistance(event) {
    let dx = event.touches[0].clientX - event.touches[1].clientX;
    let dy = event.touches[0].clientY - event.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Collapsible sections functionality
  const collapsibleHeaders = document.querySelectorAll(".collapsible-header");

  collapsibleHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      // Toggle active class on the arrow icon
      const arrow = this.querySelector(".collapsible-arrow");
      arrow.classList.toggle("active");

      // Toggle the content visibility
      const content = this.nextElementSibling;
      content.classList.toggle("active");
    });
  });

  // Initialize static gender slider based on data attribute
  const genderSlider = document.querySelector(".gender-slider-container");
  if (genderSlider) {
    // Get the gender value from the data attribute (default to 2 if not set)
    const genderValue = genderSlider.getAttribute("data-gender-value") || "2";

    // Convert the gender value to a slider position (1-3)
    let sliderPosition;
    switch (genderValue) {
      case "1": // Male
        sliderPosition = "1";
        break;
      case "2": // Neutral
        sliderPosition = "2";
        break;
      case "3": // Female
        sliderPosition = "3";
        break;
      default:
        sliderPosition = "2"; // Default to neutral
    }

    // Remove active class from all points
    const sliderPoints = genderSlider.querySelectorAll(".slider-point");
    sliderPoints.forEach((point) => {
      point.classList.remove("active");

      // Add active class to the point that matches the gender value
      if (point.getAttribute("data-value") === sliderPosition) {
        point.classList.add("active");
      }
    });
  }

  // Add to Cart Functionality
  const addToCartButton = document.getElementById("add-to-cart-button");
  const sizeRadios = document.querySelectorAll("input[name='size']");

  addToCartButton.addEventListener("click", async function () {
    // Check if button is disabled (out of stock)
    if (this.disabled) {
      showFunToast("❗ This item is currently out of stock!", "red");
      return;
    }

    const selectedSize = document.querySelector("input[name='size']:checked");

    if (!selectedSize) {
      showFunToast("❗ Please select a size first!", "red");
      return;
    }

    const size = selectedSize.value;
    const price = selectedSize.getAttribute("data-price");
    const productId = this.getAttribute("productId");

    const data = { productId, size, price };

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
        showFunToast(result.message || "❗ An error occurred.", "red");
      }
    } catch (err) {
      showFunToast("🔐 Please login to add items to your cart", "red");
    }
  });

  // Function to update the UI
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
      "Holiday Special": "/img/wraps/holiday-box.jpg",
    };

    const cardImageMap = {
      "Spray A Little Happiness": "/img/cards/love-card.jpg",
      "Scent With Love": "/img/cards/gift-card1.png",
      "Christmas Special": "/img/cards/christmas-card.webp",
      "Birthday Wishes": "/img/cards/birthday-card.webp",
      Anniversary: "/img/cards/anniversary-card.webp",
      "Thank You": "/img/cards/thank-you-card.jpg",
      "Valentine Special": "/img/cards/valentine-card.png",
      "Gold Luxury": "/img/cards/luxury-card.avif",
      "Floral Design": "/img/cards/floral-card.jpg",
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
                   ${
                     perfumeImage
                       ? `<img src="${perfumeImage}" alt="Perfume" class="gift-collage-img" style="width: 56px; height: 56px; object-fit: cover;" />`
                       : ""
                   }
                   ${
                     cardImage
                       ? `<img src="${cardImage}" alt="Card" class="gift-collage-img" style="width: 56px; height: 56px; object-fit: cover;" />`
                       : ""
                   }
                 </div>
                 <div class="gift-collage-row d-flex flex-row justify-content-center align-items-center" style="gap: 6px; margin-top: 6px;">
                   ${
                     wrapImage
                       ? `<img src="${wrapImage}" alt="Wrap" class="gift-collage-img" style="width: 56px; height: 56px; object-fit: cover;" />`
                       : ""
                   }
                 </div>
               </div>
             `;
            }

            const cartItemHTML = `
             <div class="row cart-item mb-3" data-price="${
               item.price
             }" data-category="${item.category}">
               <div class="col-md-3">
                 ${
                   isGift
                     ? collageHTML
                     : `<img src="${perfumeImage}" alt="${item.fragrance.name}" class="img-fluid rounded" />`
                 }
               </div>
 
               <div class="col-md-5 mt-3">
                 <h5 class="card-title">${item.fragrance.name}</h5>
                 <p class="text-muted">Gender: ${
                   item.fragrance.gender
                 } | Size: ${item.size}</p>
               </div>
 
               <div class="col-md-4 d-flex flex-column">
                 <p class="fw-bold mb-2 text-end">${item.price} EGP</p>
                 <div class="d-flex justify-content-between align-items-center">
                   <div class="input-group" style="max-width: 180px">
                     ${
                       !isGift
                         ? `<button type="button" class="btn btn-outline-secondary btn-sm minus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">-</button>`
                         : ""
                     }
                     <input type="text" class="form-control form-control-sm text-center quantity-input" value="${
                       item.quantity
                     }" min="1" ${
              isGift ? "readonly disabled value='1'" : ""
            } />
                     ${
                       !isGift
                         ? `<button type="button" class="btn btn-outline-secondary btn-sm plus-button" data-fragrance-id="${item.fragrance._id}" data-size="${item.size}">+</button>`
                         : ""
                     }
                   </div>
                   <button type="button" class="btn btn-sm btn-outline-danger trash-can-button ms-2" data-size="${
                     item.size
                   }" data-fragrance-id="${item.fragrance._id}" ${
              item.gift ? `data-gift-id="${item.gift}"` : ""
            }>
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
            showFunToast(
              data.message || "❗ Error increasing quantity.",
              "red"
            );
          }
        } catch (error) {
          quantityInput.value = originalQty;
          console.error("Increase error:", error);
          showFunToast("❗ Error increasing quantity.", "red");
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
            showFunToast(
              data.message || "❗ Error decreasing quantity.",
              "red"
            );
          }
        } catch (error) {
          quantityInput.value = originalQty;
          console.error("Decrease error:", error);
          showFunToast("❗ Error decreasing quantity.", "red");
        }
      });
    });

    // Attach event listeners to trash buttons
    document.querySelectorAll(".trash-can-button").forEach((button) => {
      button.addEventListener("click", async function () {
        const fragranceId = this.getAttribute("data-fragrance-id");
        const size = this.getAttribute("data-size");
        const cartItem = this.closest(".cart-item");
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
            showFunToast("✅ Item removed from cart!", "green");
          } else {
            showFunToast(data.message || "❗ Error removing item.", "red");
          }
        } catch (err) {
          console.error("Failed to remove item from cart:", err);
          showFunToast("❗ Error removing item from cart.", "red");
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
});

document.addEventListener("DOMContentLoaded", function () {
  const suggestedProducts = document.getElementById("suggested-products");
  const prevBtn = document.getElementById("prev-suggestion");
  const nextBtn = document.getElementById("next-suggestion");
  const items = document.querySelectorAll(".suggested-item");
  const itemWidth = items[0].offsetWidth + 32; // width + gap (2rem = 32px)

  let currentPosition = 0;
  let autoScrollInterval;
  const totalItems = items.length;
  const visibleItems = 4; // Number of items visible at once
  const maxPosition = -(totalItems - visibleItems) * itemWidth;

  // Initialize auto-scroll
  startAutoScroll();

  // Next button click handler
  nextBtn.addEventListener("click", function () {
    resetAutoScroll();
    if (currentPosition > maxPosition) {
      currentPosition -= itemWidth;
      suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
    } else {
      // If at end, loop back to start
      currentPosition = 0;
      suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
    }
  });

  // Previous button click handler
  prevBtn.addEventListener("click", function () {
    resetAutoScroll();
    if (currentPosition < 0) {
      currentPosition += itemWidth;
      suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
    } else {
      // If at start, loop to end
      currentPosition = maxPosition;
      suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
    }
  });

  // Start auto-scroll interval
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (currentPosition > maxPosition) {
        currentPosition -= itemWidth;
        suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
      } else {
        // If at end, loop back to start
        currentPosition = 0;
        suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
      }
    }, 5000); // Change slide every 5 seconds
  }

  // Reset auto-scroll timer when user interacts
  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }

  // Pause auto-scroll on hover
  suggestedProducts.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval);
  });

  // Resume auto-scroll when mouse leaves
  suggestedProducts.addEventListener("mouseleave", () => {
    startAutoScroll();
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    // Recalculate item width on resize
    itemWidth = items[0].offsetWidth + 32;
    maxPosition = -(totalItems - visibleItems) * itemWidth;

    // Adjust current position if it's beyond new max position
    if (currentPosition < maxPosition) {
      currentPosition = maxPosition;
    }

    suggestedProducts.style.transform = `translateX(${currentPosition}px)`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const priceDisplay = document.getElementById("price");
  const sizeRadios = document.querySelectorAll("input[name='size']");
  const addToCartButton = document.getElementById("add-to-cart-button");

  function updatePriceFromChecked() {
    const selected = document.querySelector("input[name='size']:checked");
    const enabledRadios = document.querySelectorAll("input[name='size']:not(:disabled)");
    
    if (selected) {
      const price = selected.getAttribute("data-price");
      priceDisplay.textContent = `${price} EGP`;
    } else if (enabledRadios.length === 0) {
      // All sizes are out of stock
      if (addToCartButton) {
        addToCartButton.textContent = "Out of Stock";
        addToCartButton.disabled = true;
        addToCartButton.style.cursor = "not-allowed";
      }
    }
  }

  // Update price on page load
  updatePriceFromChecked();

  // Update price when user changes selection
  sizeRadios.forEach((radio) => {
    radio.addEventListener("change", updatePriceFromChecked);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const genderSlider = document.querySelector(".modern-gender-slider");
  const gender = genderSlider.getAttribute("data-gender");
  const sliderPoints = genderSlider.querySelectorAll(".slider-point");

  // Map gender string to point index
  const genderMap = {
    Male: 1,
    Unisex: 2,
    Female: 3,
  };

  const activeValue = genderMap[gender];
  sliderPoints.forEach((point) => {
    if (point.getAttribute("data-value") === String(activeValue)) {
      point.classList.add("active");
    } else {
      point.classList.remove("active");
    }
  });
});
