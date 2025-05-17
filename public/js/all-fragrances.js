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

/*
Adds a click event listener to the entire document.

When a click occurs anywhere on the page:

Loops through all .ml elements.

For each .ml element, finds its closest .card-price container.

If the .card-price container has the active class, removes the active class to hide the dropdown menu. 
*/

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
// Select the filter button and its container
const filterButton = document.querySelector(".filter-button");
const filterContainer = document.querySelector(".filter-container");
const dropdownMenuFilter = filterContainer.querySelector(
  ".dropdown-menu-filter"
);

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

// =====================SEARCH BAR RELATED===================================
const searchBox = document.getElementById("searchBox");
const clearSearch = document.getElementById("clearSearch");

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
  // For example, update the cart count displayed in the header
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = result.cartCount; // Assuming the backend returns the updated cart count
  }

  // Optionally, you can add more dynamic updates like showing the cart items
}
