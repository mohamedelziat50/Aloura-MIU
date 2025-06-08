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
    completeOrderBtn.addEventListener("click", function () {
      // Here you would typically submit the order
      showFunToast("Order completed!", "green");
      giftModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Close when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === giftModal) {
      giftModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

document
  .querySelector(".complete-order")
  ?.addEventListener("click", async () => {
    try {
      const giftData = {
        perfume: {
          name:
            document.querySelector(".perfume-option.selected h3")
              ?.textContent || "Not selected",
          price:
            parseFloat(
              document.querySelector(".perfume-option.selected .price")
                ?.textContent
            ) || 0,
          image:
            document.querySelector(".perfume-option.selected img")?.src || "",
        },
        wrap: {
          name:
            document.querySelector(".wrap-option.selected h4")?.textContent ||
            "Not selected",
          price:
            parseFloat(
              document
                .querySelector(".wrap-option.selected p")
                ?.textContent.replace("+", "")
            ) || 0,
          image: document.querySelector(".wrap-option.selected img")?.src || "",
        },
        card: {
          name:
            document.querySelector(".card-option.selected h4")?.textContent ||
            "Not selected",
          image: document.querySelector(".card-option.selected img")?.src || "",
        },
        recipientName: document.getElementById("recipient-name").value,
        message: document.getElementById("gift-message").value,
        totalPrice:
          parseFloat(document.getElementById("gift-total").textContent) || 0,
      };

      const response = await fetch("/api/gifting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // No need for Authorization header since we're using cookies
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(giftData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Order failed");
      }

      const result = await response.json();
      console.log("Order success:", result);
    } catch (error) {
      console.error("Order error:", error);
      alert(`Order failed: ${error.message}`);
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
