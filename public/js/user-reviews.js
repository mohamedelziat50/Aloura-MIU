// user-reviews.js: Independent JS for user reviews page

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

  // Prevent form submission (static demo)
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Review submitted! (static demo)');
    });
  }
});
