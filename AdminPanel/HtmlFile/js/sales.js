async function fetchOrders() {
  try {
    const response = await fetch("http://localhost:5000/api/orders"); // Replace with actual API URL
    if (!response.ok) throw new Error("Failed to fetch orders");

    const orders = await response.json();
    calculateSalesData(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

function calculateSalesData(orders) {
  const today = new Date().toISOString().split("T")[0]; // Today's date
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    let d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  let salesToday = 0;
  let salesWeek = 0;
  let salesMonth = 0;
  let dayCount = {}; // Track order count per day

  orders.forEach((order) => {
    if (order.status !== "Completed") return; // Ignore incomplete orders

    const orderDate = new Date(order.order_date).toISOString().split("T")[0];
    const amount = order.total_amount || 0;

    if (orderDate === today) salesToday += amount;
    if (last7Days.includes(orderDate)) salesWeek += amount;
    if (orderDate.startsWith(today.slice(0, 7))) salesMonth += amount;

    dayCount[orderDate] = (dayCount[orderDate] || 0) + 1;
  });

  // Determine peak sales days
  let peakSalesDays = Object.entries(dayCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([date]) =>
      new Date(date).toLocaleDateString("en-US", { weekday: "long" })
    );

  // Update UI
  document.getElementById("sales-today").textContent = `₹${salesToday}`;
  document.getElementById("sales-week").textContent = `₹${salesWeek}`;
  document.getElementById("sales-month").textContent = `₹${salesMonth}`;

  const peakSalesDaysList = document.getElementById("peak-sales-days");
  peakSalesDaysList.innerHTML = "";
  peakSalesDays.forEach((day) => {
    const li = document.createElement("li");
    li.textContent = `🔥 ${day}`;
    peakSalesDaysList.appendChild(li);
  });
}

// Fetch orders & compute sales on page load
fetchOrders();    
