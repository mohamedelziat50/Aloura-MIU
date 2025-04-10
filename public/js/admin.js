document.addEventListener("DOMContentLoaded", () => {
    const buttons = {
        dashboard: document.getElementById('btn-dashboard'),
        products: document.getElementById('btn-products'),
        orders: document.getElementById('btn-orders'),
        users: document.getElementById('btn-users'),
        reviews: document.getElementById('btn-reviews'),
        settings: document.getElementById('btn-settings'),
        logout: document.getElementById('btn-logout'),
    };

    const sections = {
        dashboard: document.getElementById('section-dashboard'),
        products: document.getElementById('section-products'),
        orders: document.getElementById('section-orders'),
        users: document.getElementById('section-users'),
        reviews: document.getElementById('section-reviews'),
        settings: document.getElementById('section-settings'),
    };

    function showSection(name) {
        for (let key in sections) {
            sections[key].style.display = 'none';
        }
        sections[name].style.display = 'block';
    }

    // Initial display
    showSection('dashboard');

    buttons.dashboard.onclick = () => showSection('dashboard');
    buttons.products.onclick = () => showSection('products');
    buttons.orders.onclick = () => showSection('orders');
    buttons.users.onclick = () => showSection('users');
    buttons.reviews.onclick = () => showSection('reviews');
    buttons.settings.onclick = () => showSection('settings');

    buttons.logout.onclick = () => {
       window.location.href="/";
    };
});

document.addEventListener("DOMContentLoaded", () => {
    // ... your existing button and section declarations ...

    // Add this for Settings Tab functionality
    const settingsTabs = {
        general: document.getElementById('general-tab'),
        appearance: document.getElementById('appearance-tab'),
        seo: document.getElementById('seo-tab'),
        social: document.getElementById('social-tab')
    };

    const settingsTabButtons = {
        general: document.querySelector('[data-tab="general"]'),
        appearance: document.querySelector('[data-tab="appearance"]'),
        seo: document.querySelector('[data-tab="seo"]'),
        social: document.querySelector('[data-tab="social"]')
    };

    function showSettingsTab(name) {
        for (let key in settingsTabs) {
            settingsTabs[key].classList.remove('active');
            settingsTabButtons[key].classList.remove('active');
        }
        settingsTabs[name].classList.add('active');
        settingsTabButtons[name].classList.add('active');
    }

    // Initialize first tab as active
    if (settingsTabButtons.general) {
        showSettingsTab('general');
        
        // Add click handlers for settings tabs
        settingsTabButtons.general.onclick = () => showSettingsTab('general');
        settingsTabButtons.appearance.onclick = () => showSettingsTab('appearance');
        settingsTabButtons.seo.onclick = () => showSettingsTab('seo');
        settingsTabButtons.social.onclick = () => showSettingsTab('social');
    }

});