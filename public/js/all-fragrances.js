// Select all ml elements from the card-price container
const mlElements = document.querySelectorAll('.card-price .ml');

// Loop Through Each .ml Element
mlElements.forEach(ml => {
    // Find the Closest .card-price Container to be used as reference later
    const cardPrice = ml.closest('.card-price');

    const dropdownMenu = cardPrice.querySelector('.dropdown-menu');

    // Add a click event listener for every ml
    ml.addEventListener('click', (e) => {
        // Prevent the click from bubbling up to the document
        e.stopPropagation(); 
        // toggles the active class on the .card-price container. This class is used to show/hide the dropdown menu.
        cardPrice.classList.toggle('active');

        // Reset display to block before fade-in animation
        if (cardPrice.classList.contains('active')) {
            dropdownMenu.style.display = 'block';
        }
    });

    // Selects all elements with the class .dropdown-option inside the current .card-price container.
    // Add click event listeners to each dropdown option to handle selection.
    const dropdownOptions = cardPrice.querySelectorAll('.dropdown-option');
    dropdownOptions.forEach(option => {
        // Add Click Event Listener to each Dropdown Option
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click from bubbling up to the card-price div

            // gets the data-price attribute value from the clicked option.
            const price = option.getAttribute('data-price');
            // same thing
            const ml = option.getAttribute('data-ml');

            // updates the .price element inside the .card-price container with the selected price.
            cardPrice.querySelector('.price').textContent = price;
            cardPrice.querySelector('.ml').textContent = `${ml} ▼`; // Update ml with arrow

            // removes the active class from the .card-price container, hiding the dropdown menu.
            cardPrice.classList.remove('active'); // Hide dropdown after selection
        });
    });

     // Hide dropdown after fade-out animation completes
    dropdownMenu.addEventListener('animationend', (e) => {
        if (e.animationName === 'fadeOutTop') {
            dropdownMenu.style.display = 'none'; // Hide the dropdown after animation
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
document.addEventListener('click', () => {
    mlElements.forEach(ml => {
        const cardPrice = ml.closest('.card-price');
        if (cardPrice.classList.contains('active')) {
            cardPrice.classList.remove('active'); // Hide the dropdown
        }
    });
});

// ==================== New Filter Button Code ====================
// LITERALLY SAME CODE AS ABOVE, BUT WE CHANGE ONLY A SINGLE BUTTON'S TEXT, NOT PRICE + ML
// Select the filter button and its container
const filterButton = document.querySelector('.filter-button');
const filterContainer = document.querySelector('.filter-container');
const dropdownMenuFilter = filterContainer.querySelector('.dropdown-menu-filter');

// Toggle dropdown menu on filter button click
filterButton.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent the click from bubbling up to the document
  filterContainer.classList.toggle('active');

  // Reset display to block before fade-in animation
  if (filterContainer.classList.contains('active')) {
    dropdownMenuFilter.style.display = 'block';
  }
});

// Add click event listeners to each dropdown option
const dropdownOptionsFilter = filterContainer.querySelectorAll('.dropdown-option-filter');
dropdownOptionsFilter.forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the filter container

    // Get the selected value
    const value = option.getAttribute('data-value');

    // Update the filter button text with the selected value
    filterButton.textContent = `${value} ▼`;

    // Hide the dropdown after selection
    filterContainer.classList.remove('active');
  });
});

// Hide dropdown after fade-out animation completes
dropdownMenuFilter.addEventListener('animationend', (e) => {
  if (e.animationName === 'fadeOutTop') {
    dropdownMenuFilter.style.display = 'none'; // Hide the dropdown after animation
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  if (filterContainer.classList.contains('active')) {
    filterContainer.classList.remove('active'); // Hide the dropdown
  }
});
