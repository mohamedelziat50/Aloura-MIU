// user-reviews.js: Independent JS for user reviews page
import showFunToast from "./toast.js";

document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.review-star');
  const ratingInput = document.getElementById('review-rating');
  let selected = 0;

  function highlightStars(count) {
    stars.forEach((star, i) => {
      if (i < count) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }

  stars.forEach((star, idx) => {
    star.addEventListener('mouseenter', () => {
      highlightStars(idx + 1);
    });
    star.addEventListener('mouseleave', () => {
      highlightStars(selected);
    });
    star.addEventListener('click', () => {
      selected = idx + 1;
      ratingInput.value = selected;
      highlightStars(selected);
    });
  });

  // Form Handling
  const reviewForm = document.getElementById('review-form');

  if (reviewForm) {
    reviewForm.addEventListener('submit', async function (e) {
      // Prevent default form submission
      e.preventDefault();

      // Get the selected star value
      const rating = ratingInput.value;
      // Get the value from review comment box
      const reviewCommentBox = document.getElementById('review-box');
      const comment = reviewCommentBox ? reviewCommentBox.value : '';
      // Get the fragrance id from the submit button
      const fragranceId = document.getElementById('submit-form-button').getAttribute('fragrance-id');

      // Validate
      if (!rating || rating == 0) return showFunToast("❌ Rating is required.", "red");
      if (!comment || comment.trim() == '') return showFunToast("❌ Review's comment is required.", "red");
      if (!fragranceId) return showFunToast("❌ Fragrance ID not found, Try again.", "red");

      // ========== Final Data Object ==========
      const formData = {
        rating,
        comment,
        fragranceId
      };
      
      // ========== Submit to backend ==========
      try {
        const response = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
  
        const data = await response.json();
  
        if (response.ok) {
          showFunToast(data.message || "✅ Review placed successfully!", "green");
          setTimeout(() => (window.location.href = "/"), 900);
        } else {
          showFunToast(data.error || "❌ An error occurred.", "red");
        }
      } catch (error) {
        console.log(error);
        showFunToast(error.message || "❌ Network error.", "red");
      }
    });
  }

});
