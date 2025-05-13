let bookings = []; // This will be populated with API data

async function fetchBookings() {
  try {
    const response = await fetch("http://localhost:5000/api/bookings/all");
    const data = await response.json();
    bookings = data.bookings; // Store fetched data
    renderBookings();
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
}
async function updateBookingStatus(id, status) {
  try {
    await fetch(`http://localhost:5000/api/bookings/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchBookings(); // Refresh table after update
  } catch (error) {
    console.error("Error updating booking:", error);
  }
}

function approveBooking(id) {
  updateBookingStatus(id, "confirmed");
}

function renderBookings(filteredBookings = bookings) {
  const tableBody = document.getElementById("bookings-table");
  tableBody.innerHTML = "";

  if (filteredBookings.length === 0) {
    tableBody.innerHTML = `<tr><td class="p-2 border text-center" colspan="7">No bookings found</td></tr>`;
    return;
  }

  filteredBookings.forEach((booking) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="p-2 border text-center">${booking.name}</td>
        <td class="p-2 border text-center">${booking.date}</td>
        <td class="p-2 border text-center">${booking.startTime}</td>
        <td class="p-2 border text-center">${booking.endTime}</td>
        <td class="p-2 border text-center">${booking.numberOfPeople}</td>
        <td class="p-2 border text-center">${booking.status}</td>
        <td class="p-2 border text-center">
          <button onclick="approveBooking('${booking._id}')" class="bg-green-500 text-white px-2 py-1 rounded">✅ Approve</button>
        </td>
      `;
    tableBody.appendChild(row);
  });
}

function filterBookings() {
  const selectedDate = document.getElementById("filter-date").value;
  const selectedStatus = document.getElementById("filter-status").value;
  const searchValue = document
    .getElementById("search-booking")
    .value.toLowerCase();

  const filtered = bookings.filter(
    (b) =>
      (selectedDate === "" || b.date === selectedDate) &&
      (selectedStatus === "" || b.status === selectedStatus) &&
      (b.name.toLowerCase().includes(searchValue) ||
        b.date.includes(searchValue) ||
        (b.phoneNumber && b.phoneNumber.includes(searchValue)))
  );

  renderBookings(filtered);
}

// Debounce function to optimize filtering
function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

// Attach event listeners with debounce
document
  .getElementById("filter-date")
  .addEventListener("change", filterBookings);
document
  .getElementById("filter-status")
  .addEventListener("change", filterBookings);
document
  .getElementById("search-booking")
  .addEventListener("input", debounce(filterBookings, 300));

fetchBookings();
