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

// Sales Chart Data
function initCharts() {
    // Monthly Sales Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
      new Chart(salesCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Sales ($)',
            data: [1250, 1900, 2100, 1800, 2400, 1950],
            borderColor: '#000000',
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0,0,0,0.05)'
              }
            }
          }
        }
      });
    }
  
    // Top Fragrances Chart
    const productsCtx = document.getElementById('productsChart');
    if (productsCtx) {
      new Chart(productsCtx, {
        type: 'bar',
        data: {
          labels: ['Chanel No.5', 'Dior Sauvage', 'Jo Malone', 'Tom Ford', 'YSL Libre'],
          datasets: [{
            label: 'Units Sold',
            data: [85, 72, 58, 49, 36],
            backgroundColor: [
              'rgba(0,0,0,0.7)',
              'rgba(0,0,0,0.6)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.4)',
              'rgba(0,0,0,0.3)'
            ],
            borderColor: '#000',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0,0,0,0.05)'
              }
            }
          }
        }
      });
    }
  }
  
  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', initCharts);


  // Add this to your admin.js file

document.addEventListener('DOMContentLoaded', function() {
    // 1. Launch Campaign Button
    const promoBtn = document.querySelector('.promo-btn');
    
    if (promoBtn) {
      promoBtn.addEventListener('click', function() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'promo-modal';
        modal.innerHTML = `
          <div class="modal-content">
            <h3>Confirm Spring Campaign</h3>
            <p>This will:</p>
            <ul>
              <li>Create a "Spring Blossom" collection page</li>
              <li>Send email to 1,239 subscribers</li>
              <li>Add homepage banner</li>
            </ul>
            <div class="modal-actions">
              <button class="modal-cancel">Cancel</button>
              <button class="modal-confirm">Launch Now</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
  
        // Modal handlers
        document.querySelector('.modal-cancel').addEventListener('click', () => {
          modal.remove();
        });
  
        document.querySelector('.modal-confirm').addEventListener('click', () => {
          // Simulate API call
          console.log('Campaign launched!');
          
          // Show success message
          const successMsg = document.createElement('div');
          successMsg.className = 'promo-success';
          successMsg.textContent = 'Spring campaign launched successfully!';
          document.querySelector('.seasonal-highlight').appendChild(successMsg);
          
          // Disable button
          promoBtn.disabled = true;
          promoBtn.textContent = 'Campaign Active';
          modal.remove();
          
          // Remove success message after 3sec
          setTimeout(() => successMsg.remove(), 3000);
        });
      });
    }
  });


  // Add Note Functionality
document.querySelectorAll('.btn-add-note').forEach(btn => {
    btn.addEventListener('click', function() {
        const noteText = prompt("Enter customer note:");
        if (noteText) {
            const notesList = this.closest('.user-notes').querySelector('.notes-list');
            const newNote = document.createElement('div');
            newNote.className = 'note';
            newNote.innerHTML = `
                <p>"${noteText}"</p>
                <span class="note-date">Added ${new Date().toLocaleDateString()}</span>
            `;
            notesList.appendChild(newNote);
        }
    });
});


