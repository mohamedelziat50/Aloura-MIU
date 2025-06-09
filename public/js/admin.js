document.addEventListener("DOMContentLoaded", () => {
  const buttons = {
    dashboard: document.getElementById("btn-dashboard"),
    products: document.getElementById("btn-products"),
    orders: document.getElementById("btn-orders"),
    users: document.getElementById("btn-users"),
    reviews: document.getElementById("btn-reviews"),
    settings: document.getElementById("btn-settings"),
    logout: document.getElementById("btn-logout"),
  };

  const sections = {
    dashboard: document.getElementById("section-dashboard"),
    products: document.getElementById("section-products"),
    orders: document.getElementById("section-orders"),
    users: document.getElementById("section-users"),
    reviews: document.getElementById("section-reviews"),
    settings: document.getElementById("section-settings"),
  };

  function showSection(name) {
    for (let key in sections) {
      sections[key].style.display = "none";
    }
    sections[name].style.display = "block";
  }

  // Initial display
  showSection("dashboard");

  buttons.dashboard.onclick = () => showSection("dashboard");
  buttons.products.onclick = () => showSection("products");
  buttons.orders.onclick = () => showSection("orders");
  buttons.users.onclick = () => showSection("users");
  buttons.reviews.onclick = () => showSection("reviews");
  buttons.settings.onclick = () => showSection("settings");

  buttons.logout.onclick = () => {
    window.location.href = "/";
  };
});

document.addEventListener("DOMContentLoaded", () => {
  // ... your existing button and section declarations ...

  // Add this for Settings Tab functionality
  const settingsTabs = {
    general: document.getElementById("general-tab"),
    appearance: document.getElementById("appearance-tab"),
    seo: document.getElementById("seo-tab"),
    social: document.getElementById("social-tab"),
  };

  const settingsTabButtons = {
    general: document.querySelector('[data-tab="general"]'),
    appearance: document.querySelector('[data-tab="appearance"]'),
    seo: document.querySelector('[data-tab="seo"]'),
    social: document.querySelector('[data-tab="social"]'),
  };

  function showSettingsTab(name) {
    for (let key in settingsTabs) {
      settingsTabs[key].classList.remove("active");
      settingsTabButtons[key].classList.remove("active");
    }
    settingsTabs[name].classList.add("active");
    settingsTabButtons[name].classList.add("active");
  }

  // Initialize first tab as active
  if (settingsTabButtons.general) {
    showSettingsTab("general");

    // Add click handlers for settings tabs
    settingsTabButtons.general.onclick = () => showSettingsTab("general");
    settingsTabButtons.appearance.onclick = () => showSettingsTab("appearance");
    settingsTabButtons.seo.onclick = () => showSettingsTab("seo");
    settingsTabButtons.social.onclick = () => showSettingsTab("social");
  }
});

// Sales Chart Data
function initCharts() {
  // Monthly Sales Chart
  const salesCtx = document.getElementById("salesChart");
  if (salesCtx) {
    new Chart(salesCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales ($)",
            data: [1250, 1900, 2100, 1800, 2400, 1950],
            borderColor: "#000000",
            backgroundColor: "rgba(0,0,0,0.05)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0,0,0,0.05)",
            },
          },
        },
      },
    });
  }

  // Top Fragrances Chart
  const productsCtx = document.getElementById("productsChart");
  if (productsCtx) {
    new Chart(productsCtx, {
      type: "bar",
      data: {
        labels: [
          "Chanel No.5",
          "Dior Sauvage",
          "Jo Malone",
          "Tom Ford",
          "YSL Libre",
        ],
        datasets: [
          {
            label: "Units Sold",
            data: [85, 72, 58, 49, 36],
            backgroundColor: [
              "rgba(0,0,0,0.7)",
              "rgba(0,0,0,0.6)",
              "rgba(0,0,0,0.5)",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.3)",
            ],
            borderColor: "#000",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0,0,0,0.05)",
            },
          },
        },
      },
    });
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initCharts);

// Add this to your admin.js file

document.addEventListener("DOMContentLoaded", function () {
  // 1. Launch Campaign Button
  const promoBtn = document.querySelector(".promo-btn");

  if (promoBtn) {
    promoBtn.addEventListener("click", function () {
      // Create modal
      const modal = document.createElement("div");
      modal.className = "promo-modal";
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
      document.querySelector(".modal-cancel").addEventListener("click", () => {
        modal.remove();
      });

      document.querySelector(".modal-confirm").addEventListener("click", () => {
        // Simulate API call
        console.log("Campaign launched!");

        // Show success message
        const successMsg = document.createElement("div");
        successMsg.className = "promo-success";
        successMsg.textContent = "Spring campaign launched successfully!";
        document.querySelector(".seasonal-highlight").appendChild(successMsg);

        // Disable button
        promoBtn.disabled = true;
        promoBtn.textContent = "Campaign Active";
        modal.remove();

        // Remove success message after 3sec
        setTimeout(() => successMsg.remove(), 3000);
      });
    });
  }
});

// Add Note Functionality
document.querySelectorAll(".btn-add-note").forEach((btn) => {
  btn.addEventListener("click", function () {
    const noteText = prompt("Enter customer note:");
    if (noteText) {
      const notesList =
        this.closest(".user-notes").querySelector(".notes-list");
      const newNote = document.createElement("div");
      newNote.className = "note";
      newNote.innerHTML = `
                <p>"${noteText}"</p>
                <span class="note-date">Added ${new Date().toLocaleDateString()}</span>
            `;
      notesList.appendChild(newNote);
    }
  });
});

import showFunToast from "/js/toast.js";
window.addEventListener("DOMContentLoaded", () => {
  window.deleteProduct = (btn) => {
    const fragrance_id = btn.getAttribute("data-fragrance-id");

    fetch(`http://localhost:3000/api/fragrances/${fragrance_id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          showFunToast(
            data.message || "✅ Fragrance deleted successfully!",
            "green"
          );
          setTimeout(() => {
            window.location.href = "/admin/:id";
          }, 1000);
        } else {
          showFunToast(data.message || "❗ An error occurred.", "red");
        }
      })
      .catch((error) => {
        console.log(error);
        showFunToast(error.message || "❗ An error occurred.", "red");
      });
  };
});

window.addEventListener("DOMContentLoaded", () => {
  window.deleteUser = (btn) => {
    const user_id = btn.getAttribute("data-user-id");

    fetch(`http://localhost:3000/api/users/${user_id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          showFunToast(
            data.message || "✅ User deleted successfully!",
            "green"
          );
          setTimeout(() => {
            window.location.href = "/admin/:id";
          }, 1000);
        } else {
          showFunToast(data.message || "❗ An error occurred.", "red");
        }
      })
      .catch((error) => {
        console.log(error);
        showFunToast(error.message || "❗ An error occurred.", "red");
      });
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("profile-picture");
  const preview = document.getElementById("profile-picture-preview");

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      preview.src = URL.createObjectURL(file);
    }
  });
});

addUserForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form from submitting

  const name = document.getElementById("adduser-name").value.trim();
  const email = document.getElementById("adduser-email").value.trim();
  const phone = document.getElementById("adduser-phone").value.trim();
  const password = document.getElementById("adduser-password").value;
  const confirmPassword = document.getElementById(
    "adduser-confirm-password"
  ).value;
  const profilePicture = document.getElementById("profile-picture").files[0];

  // Validation
  if (name === "") {
    showFunToast("❗ Please enter your name.", "red");
    return;
  }

  if (name.length < 3) {
    showFunToast("👶 Too tiny! Username needs 3+ characters.", "red");
    return;
  }
  if (name.length > 50) {
    showFunToast(
      "📏 Whoa! Username's way too long. Keep it under 50 characters!",
      "red"
    );
    return;
  }

  if (email === "" || !validateEmail(email)) {
    showFunToast("📧 Please enter a valid email address.", "red");
    return;
  }

  if (phone === "" || !validatePhone(phone)) {
    showFunToast("📱 Please enter a valid phone number.", "red");
    return;
  }

  if (password.length < 6) {
    showFunToast("🔒 Password must be at least 6 characters long.", "red");
    return;
  }

  if (password !== confirmPassword) {
    showFunToast("🔒 Passwords do not match.", "red");
    return;
  }

  const formData = new FormData(); // <-- This is special, different than {}
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("password", password);

  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        showFunToast(data.message || "✅ User Created successfully!", "green");
        setTimeout(() => {
          window.location.href = `/admin/${window.currentAdminId}`; // Redirect to the user's page
        }, 1000);
      } else {
        showFunToast(data.message || "❗ An error occurred.", "red");
      }
    })
    .catch((error) => {
      showFunToast(error.message || "❗ An error occurred.", "red");
    });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const setupPasswordToggle = (inputId, iconId) => {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (!input || !icon) return;

    icon.parentElement.addEventListener("click", () => {
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";

      icon.classList.toggle("fa-lock", !isPassword);
      icon.classList.toggle("fa-lock-open", isPassword);
    });
  };

  setupPasswordToggle("adduser-password", "addUserPasswordIcon");
  setupPasswordToggle("adduser-confirm-password", "addUserConfirmPasswordIcon");
});

document.addEventListener("DOMContentLoaded", () => {
  const userSearchInput = document.getElementById("userSearchInput");
  const tableBody = document.querySelector("#section-users table tbody");

  let debounceTimer;

  userSearchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      const query = userSearchInput.value.trim();

      try {
        const res = await fetch(
          `/api/users/search?search=${encodeURIComponent(query)}`
        );
        const users = await res.json();

        tableBody.innerHTML = "";

        if (users.length === 0) {
          tableBody.innerHTML = `
              <tr>
                <td colspan="8" class="text-center">No users found for "${query}"</td>
              </tr>`;
          return;
        }

        users.forEach((user, index) => {
          const updatedAt = moment(user.updatedAt).fromNow();

          const row = `
              <tr>
                <th scope="row">${index + 1}</th>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${
                  user.subscriberList ? "Subscribed" : "Not Subscribed"
                }</td>
                <td>${user.isVerified ? "Verified" : "Not Verified"}</td>
                <td>${updatedAt}</td>
                <td>${user.role}</td>
                <td class="actionlist">
                  <a class="btn ButtonDicoration btn-sm" href="/editUser/${
                    user._id
                  }">
                    <i class="bi bi-pencil"></i>
                  </a>
                  <button class="btn btn-danger btn-sm" data-user-id="${
                    user._id
                  }">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>`;
          tableBody.insertAdjacentHTML("beforeend", row);
        });
      } catch (error) {
        console.error("Search error:", error);
        tableBody.innerHTML = `
            <tr>
              <td colspan="8" class="text-center text-danger">Error loading results</td>
            </tr>`;
      }
    }, 300); // ⏱ debounce delay in ms
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const orderSearchInput = document.getElementById("orderSearchInput");
  const orderTableBody = document.querySelector("#section-orders table tbody");

  let debounceTimer;

  orderSearchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      const query = orderSearchInput.value.trim();

      try {
        const res = await fetch(
          `/api/orders/search?search=${encodeURIComponent(query)}`
        );
        const orders = await res.json();

        orderTableBody.innerHTML = "";

        if (orders.length === 0) {
          orderTableBody.innerHTML = `
            <tr>
              <td colspan="9" class="text-center">No orders found for "${query}"</td>
            </tr>`;
          return;
        }

        orders.forEach((order) => {
          const products = order.items
            .map((item) => `${item.quantity} × ${item.fragrance.name}`)
            .join("<br>");

          const row = `
            <tr>
              <td>#${order.orderNumber}</td>
              <td>${order.user.name}</td>
              <td>${products}</td>
              <td>${moment(order.createdAt).format("D MMMM YYYY")}</td>
              <td><span class="status ${
                order.status === "Delivered"
                  ? "delivered"
                  : order.status === "Cancelled"
                  ? "cancelled"
                  : "pending"
              }">${order.status}</span></td>
              <td>${order.paid ? "Yes" : "No"}</td>
              <td>$${order.totalPrice}</td>
              <td>No</td>
              <td class="actionlist">
                <a class="btn ButtonDicoration btn-sm" href="/order/${
                  order._id
                }" title="View Order">
                  <i class="fa-solid fa-list"></i>
                </a>
                <button class="btn btn-success btn-sm" title="Mark as Delivered" onclick="markOrderStatus('${
                  order._id
                }', 'Delivered')">
                  <i class="fa-solid fa-circle-check"></i>
                </button>
                <button class="btn btn-danger btn-sm" title="Mark as Cancelled" onclick="markOrderStatus('${
                  order._id
                }', 'Cancelled')">
                  <i class="fa-solid fa-ban"></i>
                </button>
                <button class="btn btn-danger btn-sm" data-order-id="${
                  order._id
                }" onclick="deleteOrder(this)" title="Delete Order">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </td>
            </tr>`;

          orderTableBody.insertAdjacentHTML("beforeend", row);
        });
      } catch (error) {
        console.error("Order search error:", error);
        orderTableBody.innerHTML = `
          <tr>
            <td colspan="9" class="text-center text-danger">Error loading results</td>
          </tr>`;
      }
    }, 300); // Debounce delay
  });
});

// Delete Orders
window.addEventListener("DOMContentLoaded", () => {
  window.deleteOrder = async (btn) => {
    const order_id = btn.getAttribute("data-order-id");

    try {
      const response = await fetch(`/api/orders/delete/${order_id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        showFunToast(data.message || "✅ Order deleted successfully!", "green");
        setTimeout(() => {
          window.location.href = `/admin/${window.currentAdminId}`;
        }, 1000);
      } else {
        showFunToast(data.error || "❗ An error occurred.", "red");
      }
    } catch (error) {
      console.log(error);
      showFunToast(error.message || "❗ An error occurred.", "red");
    }
  };

  // Order status
  window.markOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`/api/orders/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, orderId }),
      });

      const data = await response.json();

      if (response.ok) {
        showFunToast(
          data.message || "✅ Order status updated successfully!",
          "green"
        );
        setTimeout(() => {
          window.location.href = `/admin/${window.currentAdminId}`;
        }, 1000);
      } else {
        showFunToast(data.error || "❗ Failed to update order status.", "red");
      }
    } catch (error) {
      showFunToast(error.message || "❗ An error occurred.", "red");
    }
  };
});

// Email Campaigns Management
document.addEventListener('DOMContentLoaded', function() {
    // Create Campaign Form Submission
    const createCampaignForm = document.getElementById('createCampaignForm');
    if (createCampaignForm) {
        createCampaignForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                title: document.getElementById('emailTitle').value,
                subject: document.getElementById('subjectLine').value,
                mailchimpId: document.getElementById('mailchimpId').value
            };
            
            // Here you would typically make an API call to save the campaign
            console.log('Creating campaign:', formData);
            
            // Close modal and reset form
            const modal = bootstrap.Modal.getInstance(document.getElementById('createCampaignModal'));
            modal.hide();
            createCampaignForm.reset();
            
            // Refresh campaigns list
            loadCampaigns();
        });
    }

    // Edit Campaign Form Submission
    const editCampaignForm = document.getElementById('editCampaignForm');
    if (editCampaignForm) {
        editCampaignForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                title: document.getElementById('editEmailTitle').value,
                subject: document.getElementById('editSubjectLine').value,
                mailchimpId: document.getElementById('editMailchimpId').value
            };
            
            // Here you would typically make an API call to update the campaign
            console.log('Updating campaign:', formData);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('editCampaignModal'));
            modal.hide();
            
            // Refresh campaigns list
            loadCampaigns();
        });
    }
});

// Function to load campaigns into the view all modal
function loadCampaigns() {
    // Here you would typically make an API call to get the campaigns
    const campaigns = [
        // This is example data - replace with actual API call
        {
            id: 1,
            title: 'Welcome New Customers',
            subject: 'Welcome to our store!',
            mailchimpId: 'mc-xyz123'
        }
        // Add more campaigns as needed
    ];
    
    const campaignsList = document.querySelector('.campaigns-list');
    if (campaignsList) {
        campaignsList.innerHTML = campaigns.map(campaign => `
            <div class="campaign-item">
                <div class="campaign-info">
                    <h6>${campaign.title}</h6>
                    <p>Subject: ${campaign.subject}</p>
                    <small class="text-muted">ID: ${campaign.mailchimpId}</small>
                </div>
                <div class="campaign-actions">
                    <button class="btn ButtonDicoration btn-sm" onclick="editCampaign(${campaign.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCampaign(${campaign.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Function to edit a campaign
function editCampaign(id) {
    // Here you would typically make an API call to get the campaign details
    const campaign = {
        id: id,
        title: 'Welcome New Customers',
        subject: 'Welcome to our store!',
        mailchimpId: 'mc-xyz123'
    };
    
    // Populate edit form
    document.getElementById('editEmailTitle').value = campaign.title;
    document.getElementById('editSubjectLine').value = campaign.subject;
    document.getElementById('editMailchimpId').value = campaign.mailchimpId;
    
    // Close view all modal and open edit modal
    const viewModal = bootstrap.Modal.getInstance(document.getElementById('viewCampaignsModal'));
    viewModal.hide();
    
    const editModal = new bootstrap.Modal(document.getElementById('editCampaignModal'));
    editModal.show();
}

// Function to delete a campaign
function deleteCampaign(id) {
    if (confirm('Are you sure you want to delete this campaign?')) {
        // Here you would typically make an API call to delete the campaign
        console.log('Deleting campaign:', id);
        
        // Refresh campaigns list
        loadCampaigns();
    }
}

// Load campaigns when viewing all
document.getElementById('viewCampaignsModal')?.addEventListener('show.bs.modal', loadCampaigns);

document.addEventListener('DOMContentLoaded', function() {
    // Initial dummy data for campaigns
    let campaigns = [
        {
            id: 1,
            title: 'Welcome New Customers',
            subject: 'Welcome to our perfume family!',
            mailchimpId: 'mc-xyz123'
        },
        {
            id: 2,
            title: 'Summer Collection Launch',
            subject: 'Discover our new summer fragrances',
            mailchimpId: 'mc-abc456'
        }
    ];

    // Function to load campaigns into the view all modal
    function loadCampaigns() {
        const campaignsList = document.querySelector('.campaigns-list');
        if (!campaignsList) return;

        campaignsList.innerHTML = campaigns.map(campaign => `
            <div class="campaign-item" data-id="${campaign.id}">
                <div class="campaign-info">
                    <h6>${campaign.title}</h6>
                    <p>Subject: ${campaign.subject}</p>
                    <small class="text-muted">ID: ${campaign.mailchimpId}</small>
                </div>
                <div class="campaign-actions">
                    <button class="btn ButtonDicoration btn-sm edit-campaign-btn" onclick="editCampaign(${campaign.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCampaign(${campaign.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Function to handle edit campaign
    window.editCampaign = function(id) {
        const campaign = campaigns.find(c => c.id === id);
        if (!campaign) return;

        // Close view all modal
        const viewModal = bootstrap.Modal.getInstance(document.getElementById('viewCampaignsModal'));
        viewModal.hide();

        // Populate edit form
        document.getElementById('editEmailTitle').value = campaign.title;
        document.getElementById('editSubjectLine').value = campaign.subject;
        document.getElementById('editMailchimpId').value = campaign.mailchimpId;

        // Store campaign ID for saving
        document.getElementById('editCampaignForm').dataset.campaignId = campaign.id;

        // Show edit modal
        const editModal = new bootstrap.Modal(document.getElementById('editCampaignModal'));
        editModal.show();
    };

    // Handle edit form submission
    document.getElementById('editCampaignForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const id = parseInt(this.dataset.campaignId);
        const campaign = campaigns.find(c => c.id === id);
        
        if (campaign) {
            campaign.title = document.getElementById('editEmailTitle').value;
            campaign.subject = document.getElementById('editSubjectLine').value;
            
            // Close edit modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('editCampaignModal'));
            modal.hide();
            
            // Refresh campaigns list and show view all modal
            loadCampaigns();
            const viewModal = new bootstrap.Modal(document.getElementById('viewCampaignsModal'));
            viewModal.show();
        }
    });

    // Handle delete campaign
    window.deleteCampaign = function(id) {
        if (confirm('Are you sure you want to delete this campaign?')) {
            campaigns = campaigns.filter(c => c.id !== id);
            loadCampaigns();
        }
    };

    // Load campaigns when viewing all
    document.getElementById('viewCampaignsModal')?.addEventListener('show.bs.modal', loadCampaigns);
});
