document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.querySelector("form");
  
  // Create notification system
  const notificationContainer = document.createElement("div");
  notificationContainer.id = "notification-container";
  notificationContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  document.body.appendChild(notificationContainer);

  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      background-color: ${type === "success" ? "#4CAF50" : "#F44336"};
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(120%);
      transition: all 0.3s ease-out;
      max-width: 300px;
      word-wrap: break-word;
      opacity: 0;
    `;
    notification.textContent = message;
    notificationContainer.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
      notification.style.opacity = "1";
    }, 10);

    // Auto-remove after delay
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(120%)";
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Add loading spinner
  function createSpinner() {
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    spinner.style.cssText = `
      border: 3px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top: 3px solid #fff;
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
      margin-right: 10px;
    `;
    return spinner;
  }

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Set loading state
    submitButton.disabled = true;
    const spinner = createSpinner();
    submitButton.innerHTML = "";
    submitButton.appendChild(spinner);
    submitButton.appendChild(document.createTextNode(" Processing..."));

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phone").value,
      numberOfPeople: parseInt(document.getElementById("adults").value),
      date: document.getElementById("booking-date").value,
      startTime: document.getElementById("startTime").value,
      endTime: document.getElementById("endTime").value,
      tableNumber: parseInt(document.getElementById("tableNumber").value),
    };

    try {
      // Check Table Availability
      const availabilityResponse = await fetch(
        "http://localhost:5000/api/bookings/check-availability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableNumber: formData.tableNumber,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
          }),
        }
      );

      const availabilityData = await availabilityResponse.json();

      if (!availabilityResponse.ok || !availabilityData.available) {
        showNotification(
          availabilityData.message || "Table is not available at this time.",
          "error"
        );
        return;
      }

      // Proceed with Booking
      const response = await fetch("http://localhost:5000/api/bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification("Table booked successfully!", "success");
        bookingForm.reset();
      } else {
        showNotification(result.message || "Failed to book the table.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("An error occurred while booking. Please try again.", "error");
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
});

// Add spinner animation to the page
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);