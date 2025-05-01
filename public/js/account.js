// Account page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Edit profile button functionality
    const editLink = document.querySelector('.edit-link');
    if (editLink) {
        editLink.addEventListener('click', function() {
            // This would typically navigate to or open a profile edit modal
            console.log('Edit profile clicked');
            // You can implement a redirect or modal here
            // Example: window.location.href = '/edit-profile';
            alert('Edit profile functionality will be implemented here');
        });
    }

    // Add address link functionality
    const addAddressLink = document.querySelector('.add-address');
    if (addAddressLink) {
        addAddressLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add address clicked');
            // You can implement a redirect or modal here
            // Example: window.location.href = '/add-address';
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