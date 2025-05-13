document.addEventListener("DOMContentLoaded", async () => {
  // Add these near your socket initialization
  let socket;

  function connectSocket() {
    socket = io("http://localhost:5000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
      // Optionally show a notification to the user
      showWarningModal("Connection Issue", "Realtime updates may be delayed");
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from WebSocket:", reason);
      if (reason === "io server disconnect") {
        // The server forcibly disconnected, you might need to manually reconnect
        socket.connect();
      }
    });

    // Your existing menu update handler
    socket.on("menuUpdated", loadMenu);
  }

  // Call this instead of directly initializing socket
  connectSocket();

  // Utility functions for showing modals
  function showSuccessModal(title, message) {
    document.getElementById("successModalTitle").textContent = title;
    document.getElementById("successModalMessage").textContent = message;
    const modal = new bootstrap.Modal(document.getElementById("successModal"));
    modal.show();
  }

  function showErrorModal(title, message) {
    document.getElementById("errorModalTitle").textContent = title;
    document.getElementById("errorModalMessage").textContent = message;
    const modal = new bootstrap.Modal(document.getElementById("errorModal"));
    modal.show();
  }

  function showWarningModal(title, message) {
    document.getElementById("warningModalTitle").textContent = title;
    document.getElementById("warningModalMessage").textContent = message;
    const modal = new bootstrap.Modal(document.getElementById("warningModal"));
    modal.show();
  }

  // cart added Notification
  function showCartNotification(message, type = "success") {
    const notification = document.getElementById("cartNotification");
    const notificationText = document.getElementById("cartNotificationText");

    // Set notification content and style
    notificationText.textContent = message;
    notification.className = "cart-notification";

    // Set color based on type
    if (type === "success") {
      notification.style.backgroundColor = "#28a745";
      notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    } else if (type === "remove") {
      notification.style.backgroundColor = "#dc3545";
      notification.innerHTML = `<i class="fas fa-times-circle"></i> ${message}`;
    } else if (type === "update") {
      notification.style.backgroundColor = "#17a2b8";
      notification.innerHTML = `<i class="fas fa-sync-alt"></i> ${message}`;
    }

    // Show notification
    notification.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  const elements = {
    menuContainer: document.getElementById("menuContainer"),
    searchBox: document.getElementById("searchBox"),
    filterCategory: document.getElementById("filterCategory"),
    cartButton: document.getElementById("cartButton"),
    cartModal: document.getElementById("cartModal"),
    cartList: document.getElementById("cartList"),
    closeCart: document.getElementById("closeCart"),
    cartCount: document.getElementById("cartCount"),
    scrollUpBtn: document.getElementById("scrollUpBtn"),
    orderNowBtn: document.getElementById("orderNowBtn"),
    checkoutModal: document.getElementById("checkoutModal"),
    confirmOrderBtn: document.getElementById("confirmOrderBtn"),
    shippingAddress: document.getElementById("shippingAddress"),
  };

  let menuItems = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Initial Load
  await loadMenu();
  updateCart();

  // Real-time menu update via socket
  socket.on("menuUpdated", loadMenu);

  // Load menu from server
  async function loadMenu() {
    try {
      const res = await fetch("http://localhost:5000/api/menu");
      if (!res.ok) throw new Error("Failed to fetch menu");
      menuItems = await res.json();
      renderMenu(menuItems);
    } catch (err) {
      console.error("Menu Load Error:", err);
      elements.menuContainer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 39vh; width:100%"> 
          <div class="col-12 text-center py-5">
            <i class="fas fa-exclamation-triangle text-warning mb-3" style="font-size: 3rem;"></i>
            <h4 class="text-danger">Failed to load menu</h4>
            <p>Please try again later or refresh the page.</p>
            <button class="btn btn-primary" onclick="location.reload()">
              <i class="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
          </div>
        `;
    }
  }

  // Render menu
  function renderMenu(items) {
    elements.menuContainer.innerHTML = items
      .map(
        (item) => `
        <div class="col">
          <div class="card h-100 shadow-sm">
            <img src="${item.image}" alt="${
          item.dish_name
        }" class="card-img-top" style="height: 200px; object-fit: cover;">
            <div class="card-body text-center">
              <h5 class="card-title">${item.dish_name}</h5>
              <p class="text-muted">${item.variety.replace("-", " ")}</p>
              <p class="text-success fw-bold">₹${item.price}</p>
              <button class="btn btn-danger w-100 add-to-cart" data-id="${
                item._id
              }">➕ Add to Cart</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  // Search with debounce
  let debounceTimer;
  elements.searchBox.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const val = e.target.value.toLowerCase();
      const filtered = menuItems.filter((item) =>
        item.dish_name.toLowerCase().includes(val)
      );
      renderMenu(filtered);
    }, 300);
  });

  // Filter category
  elements.filterCategory.addEventListener("change", (e) => {
    const val = e.target.value;
    const filtered =
      val === "all"
        ? menuItems
        : menuItems.filter((item) => item.variety === val);
    renderMenu(filtered);
  });

  // Add to cart
  elements.menuContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = e.target.dataset.id;
      const item = menuItems.find((i) => i._id === id);
      if (!item) return;

      const existing = cart.find((i) => i._id === id);
      existing ? existing.quantity++ : cart.push({ ...item, quantity: 1 });
      updateCart();
    }
  });

  // Update cart UI
  function updateCart() {
    cart = cart.filter((item) => item && item._id);
    cart = cart.filter((item) => item && item._id);

    if (cart.length === 0) {
      elements.cartList.innerHTML = `
        <li class="list-group-item text-center py-4">
          <i class="fas fa-shopping-cart text-muted mb-3" style="font-size: 2rem;"></i>
          <p class="text-muted">Your cart is empty</p>
          
        </li>
      `;
      elements.cartCount.textContent = "0";
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }

    let total = 0;

    elements.cartList.innerHTML =
      cart
        .map((item) => {
          const price = item.quantity * parseFloat(item.price);
          total += price;

          return `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item.dish_name} (x${item.quantity}) - ₹${price.toFixed(
            2
          )}</span>
            <div>
              <button class="btn btn-sm btn-secondary decrease-qty mx-2" data-id="${
                item._id
              }">➖</button>
              <button class="btn btn-sm btn-danger remove-from-cart" data-id="${
                item._id
              }">❌</button>
            </div>
          </li>`;
        })
        .join("") +
      `<li class="list-group-item fw-bold text-end mt-2">Total: ₹${total.toFixed(
        2
      )}</li>`;

    elements.cartCount.textContent = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Cart actions
  elements.cartList.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains("decrease-qty")) {
      const item = cart.find((i) => i._id === id);
      if (item) {
        item.quantity--;
        if (item.quantity === 0) cart = cart.filter((i) => i._id !== id);
        updateCart();
      }
    }
    if (e.target.classList.contains("remove-from-cart")) {
      cart = cart.filter((i) => i._id !== id);
      updateCart();
    }
  });

  // Modal interactions
  elements.cartButton.onclick = () =>
    (elements.cartModal.style.display = "flex");
  elements.closeCart.onclick = () =>
    (elements.cartModal.style.display = "none");

  elements.orderNowBtn.onclick = () => {
    if (!cart.length) {
      showWarningModal(
        "Empty Cart",
        "Your cart is empty. Please add items before ordering."
      );
      return;
    }
    const modal = new bootstrap.Modal(elements.checkoutModal);
    modal.show();
    document.querySelector(".modal-backdrop")?.remove();
  };

  // Validate user session
  async function validateUser() {
    const userData = localStorage.getItem("user_details");
    if (!userData) {
      showWarningModal(
        "Login Required",
        "Please login first to place an order."
      );
      window.location.href = "../Login&SignUp/login.html";
      return null;
    }

    try {
      const { userId } = JSON.parse(userData);
      if (!userId) throw new Error("Invalid user ID");

      const res = await fetch(`http://localhost:5000/api/auth/user/${userId}`);
      if (!res.ok) throw new Error("User not found");

      return await res.json();
    } catch (err) {
      console.error("User validation failed:", err);
      localStorage.removeItem("user_details");
      return (window.location.href = "../Login&SignUp/login.html");
    }
  }

  // Confirm order
  document
    .getElementById("checkoutForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent default form submission

      const address = elements.shippingAddress.value.trim();
      const paymentMethod = document.querySelector(
        'input[name="paymentMethod"]:checked'
      )?.value;

      if (!address) {
        showWarningModal(
          "Missing Information",
          "Please enter shipping address."
        );
        return;
      }

      if (!paymentMethod) {
        showWarningModal("Payment Required", "Please select a payment method.");
        return;
      }

      if (!cart.length) {
        showWarningModal(
          "Empty Cart",
          "Your cart is empty. Please add items before ordering."
        );
        return;
      }

      // Rest of your order processing code...
      const user = await validateUser();
      if (!user?.user?._id) return;

      const order = {
        customer_id: user.user._id,
        items: cart.map(({ _id, dish_name, quantity, price }) => ({
          product_id: _id,
          product_name: dish_name,
          quantity,
          unit_price: parseFloat(price),
        })),
        shipping_address: address,
        payment_method: paymentMethod,
      };

      try {
        const res = await fetch("http://localhost:5000/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Order failed");

        showSuccessModal(
          "Order Successful",
          "Your order has been placed successfully!"
        );
        localStorage.removeItem("cart");

        // Close all modals and reload after a delay
        setTimeout(() => {
          bootstrap.Modal.getInstance(elements.checkoutModal)?.hide();
          window.location.reload();
        }, 2000);
      } catch (err) {
        console.error("Order Error:", err);
        showErrorModal(
          "Order Failed",
          err.message || "Failed to place order. Please try again."
        );
      }
    });

  // Scroll to top
  window.onscroll = () => {
    elements.scrollUpBtn.classList.toggle(
      "show",
      document.documentElement.scrollTop > 200
    );
  };

  elements.scrollUpBtn.onclick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });
});
