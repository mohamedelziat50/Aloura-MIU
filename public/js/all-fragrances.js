// Select all ml elements from the card-price container
const mlElements = document.querySelectorAll('.card-price .ml');

mlElements.forEach(ml => {
    const cardPrice = ml.closest('.card-price');

    // Toggle dropdown when clicking on the ml element
    ml.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from bubbling up to the document
        cardPrice.classList.toggle('active');
    });

    // Handle dropdown option selection
    const dropdownOptions = cardPrice.querySelectorAll('.dropdown-option');
    dropdownOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click from bubbling up to the card-price div
            const price = option.getAttribute('data-price');
            const ml = option.getAttribute('data-ml');
            cardPrice.querySelector('.price').textContent = price;
            cardPrice.querySelector('.ml').textContent = `${ml} ▼`; // Update ml with arrow
            cardPrice.classList.remove('active'); // Hide dropdown after selection
        });
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    mlElements.forEach(ml => {
        const cardPrice = ml.closest('.card-price');
        if (cardPrice.classList.contains('active')) {
            cardPrice.classList.remove('active'); // Hide the dropdown
        }
    });
});