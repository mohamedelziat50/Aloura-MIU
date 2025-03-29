document.addEventListener('DOMContentLoaded', function() {
    // Get all the input fields
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    const cardNameInput = document.getElementById('card-name');

    // Get the display elements on the card
    const displayCardNumber = document.querySelector('.card-number');
    const displayExpiry = document.querySelector('.card-text-normal');
    const displayCardName = document.querySelector('.card-name');
    const displayCvv = document.querySelector('.signature i');

    // Update card number
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = '';
        
        for(let i = 0; i < value.length; i++) {
            if(i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        displayCardNumber.textContent = formattedValue || '8050 2030 3020 5040';
    });

    // Update expiry date
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if(value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2,4);
        }
        displayExpiry.textContent = value || '05/28';
    });

    // Update card name
    cardNameInput.addEventListener('input', function(e) {
        displayCardName.textContent = e.target.value || 'Prem Kumar Shahi';
    });

    // Update CVV
    cvvInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        displayCvv.textContent = value || '005';
    });

    // Add card flip animation when focusing on CVV
    const cardFlipContainer = document.querySelector('.card-flip-container');
    const cardFlipInner = document.querySelector('.card-flip-inner');

    cvvInput.addEventListener('focus', function() {
        cardFlipInner.style.transform = 'rotateY(180deg)';
    });

    cvvInput.addEventListener('blur', function() {
        cardFlipInner.style.transform = 'rotateY(0deg)';
    });
}); 