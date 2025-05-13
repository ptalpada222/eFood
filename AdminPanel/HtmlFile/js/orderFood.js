async function fetchOrders() {
  try {
    const response = await fetch("http://localhost:5000/api/orders");
    if (!response.ok) throw new Error("Failed to fetch orders");

    const orders = await response.json();
    renderOrders(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

function renderOrders(orders) {
  const tableBody = document.getElementById("orders-table");
  tableBody.innerHTML = "";

  let totalOrders = orders.length;
  let pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  let completedOrders = totalOrders - pendingOrders;

  document.getElementById("total-orders").textContent = totalOrders;
  document.getElementById("pending-orders").textContent = pendingOrders;
  document.getElementById("completed-orders").textContent = completedOrders;

  orders.forEach((order) => {
    const customerName = order.customer_id?.name || "Unknown";

    const row = document.createElement("tr");
    row.classList.add("order-row"); // Add class for search filtering

    let actionButtons = `
          <button class="bg-green-500 text-white px-3 py-1 rounded view-items" data-id="${order._id}">📄 View</button>
        `;

    if (order.status === "Pending") {
      actionButtons += `
            <button class="bg-blue-500 text-white px-3 py-1 rounded complete-order" data-id="${order._id}">✔ Complete</button>
          `;
    }

    row.innerHTML = `
          <td class="p-2 border text-center">${order._id}</td>
          <td class="p-2 border text-center">${customerName}</td>
          <td class="p-2 border text-center">₹${order.total_amount}</td>
          <td class="p-2 border text-center">${new Date(
            order.order_date
          ).toLocaleDateString()}</td>
          <td class="p-2 border text-center">${order.status}</td>
          <td class="p-2 border text-center">${order.payment_method}</td>
          <td class="p-2 border text-center flex justify-center gap-2">
            ${actionButtons}
          </td>
        `;

    tableBody.appendChild(row);
  });
}

// Event listener for "View Items" and "Complete Order" buttons
document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("view-items")) {
    const orderId = event.target.getAttribute("data-id");

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/item/${orderId}`
      );
      if (!response.ok) throw new Error("Failed to fetch order details");

      const order = await response.json();
      displayOrderDetails(order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }

  if (event.target.classList.contains("complete-order")) {
    const orderId = event.target.getAttribute("data-id");

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Completed" }),
        }
      );

      if (!response.ok) throw new Error("Failed to update order status");

      alert("Order marked as completed!");
      fetchOrders(); // Refresh the order list
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }
});

function displayOrderDetails(order) {
  const modalTable = document.getElementById("order-items-table");
  modalTable.innerHTML = "";

  if (!order.items || order.items.length === 0) {
    modalTable.innerHTML = `<tr><td colspan="4" class="p-2 border text-center">No items found</td></tr>`;
    return;
  }

  order.items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td class="p-2 border text-center">${item.product_name}</td>
          <td class="p-2 border text-center">${item.quantity}</td>
          <td class="p-2 border text-center">₹${item.unit_price}</td>
          <td class="p-2 border text-center">₹${item.total_price}</td>
        `;
    modalTable.appendChild(row);
  });

  document.getElementById("order-items-modal").classList.remove("hidden");
}

// Close modal
document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("order-items-modal").classList.add("hidden");
});

// 🔍 Search Filter
document.getElementById("search-order").addEventListener("input", function () {
  const searchText = this.value.trim().toLowerCase();
  const tableRows = document.querySelectorAll(".order-row");

  tableRows.forEach((row) => {
    const orderId = row.cells[0]?.textContent.trim().toLowerCase();
    const customerName = row.cells[1]?.textContent.trim().toLowerCase();
    const status = row.cells[4]?.textContent.trim().toLowerCase();

    if (
      orderId.includes(searchText) ||
      customerName.includes(searchText) ||
      status.includes(searchText)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Fetch orders on page load
fetchOrders();
