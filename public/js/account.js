// Account page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add address link functionality
    const addAddressLink = document.querySelector('.add-address');
    if (addAddressLink) {
        addAddressLink.addEventListener('click', function(e) {
            e.preventDefault();
            // You can implement address functionality here
            alert('Address adding functionality will be implemented here');
        });
    }

    // Start shopping button functionality
    const startShoppingBtn = document.querySelector('.action-button');
    if (startShoppingBtn) {
        startShoppingBtn.addEventListener('click', function() {
            // Navigate to the shop/products page
            window.location.href = '/all-fragrances';
        });
    }

    // Sign out button functionality
    const signOutBtn = document.querySelector('.sign-out-button');
    // nabilo to do: add sign out functionality
});