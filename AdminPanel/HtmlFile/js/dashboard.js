document.addEventListener("DOMContentLoaded", async function () {
  const totalBookingsEl = document.getElementById("totalBookings");
  const totalRevenueEl = document.getElementById("totalRevenue");
  const totalOrdersEl = document.getElementById("totalOrders");
  const bookingsTableEl = document.getElementById("bookingsTable");

  const ordersApi = "http://localhost:5000/api/orders";
  const bookingsApi = "http://localhost:5000/api/bookings/all";
  const totalTables = 8; // Total number of tables in the restaurant

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error("Error fetching data from", url, error);
      return null;
    }
  }

  async function updateDashboard() {
    const [ordersData, bookingsData] = await Promise.all([
      fetchData(ordersApi),
      fetchData(bookingsApi),
    ]);

    if (ordersData) {
      totalOrdersEl.textContent = ordersData.length;
      totalRevenueEl.textContent = `₹${ordersData
        .reduce((sum, order) => sum + (order.total_amount || 0), 0)
        .toLocaleString()}`;
    }

    if (bookingsData && bookingsData.bookings) {
      const today = new Date().toISOString().split("T")[0];

      const todayBookings = bookingsData.bookings.filter(
        (b) => b.date === today && b.status === "reserved"
      );

      totalBookingsEl.textContent = todayBookings.length;

      // Update recent bookings table
      bookingsTableEl.innerHTML = bookingsData.bookings
        .slice(0, 5)
        .map(
          (booking) => `
            <tr class="border-b">
              <td class="p-3">${booking.name}</td>
              <td class="p-3">${booking.date}</td>
              <td class="p-3">${booking.startTime}</td>
              <td class="p-3">${booking.numberOfPeople}</td>
              <td class="p-3 ${
                booking.status === "completed"
                  ? "text-green-500"
                  : "text-red-500"
              }">
                ${
                  booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)
                }
              </td>
            </tr>
          `
        )
        .join("");

      updateTableOccupancy(bookingsData.bookings);
    }
  }

  function updateTableOccupancy(bookings) {
    const occupiedTables = bookings.filter(
      (b) => b.status === "reserved"
    ).length;
    const availableTables = totalTables - occupiedTables;

    const ctx = document.getElementById("tableChart").getContext("2d");
    if (window.tableChartInstance) window.tableChartInstance.destroy();

    window.tableChartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Occupied", "Available"],
        datasets: [
          {
            data: [occupiedTables, availableTables],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
      },
    });
  }

  function initializeCharts(orders) {
    const dailyOrders = orders.reduce((acc, order) => {
      const date = new Date(order.order_date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    new Chart(document.getElementById("ordersChart"), {
      type: "bar",
      data: {
        labels: Object.keys(dailyOrders),
        datasets: [
          {
            label: "Daily Orders",
            data: Object.values(dailyOrders),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
        ],
      },
    });
  }

  // Fetch data and update UI
  const ordersData = await fetchData(ordersApi);
  if (ordersData) initializeCharts(ordersData);

  await updateDashboard();
});
