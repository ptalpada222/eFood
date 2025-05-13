document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("form");
  
  // Create notification element
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.padding = "15px 20px";
  notification.style.borderRadius = "5px";
  notification.style.color = "white";
  notification.style.fontFamily = "Arial, sans-serif";
  notification.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
  notification.style.transition = "all 0.3s ease";
  notification.style.opacity = "0";
  notification.style.transform = "translateX(100%)";
  notification.style.zIndex = "1000";
  notification.style.maxWidth = "300px";
  document.body.appendChild(notification);

  function showNotification(message, isSuccess) {
    notification.textContent = message;
    notification.style.backgroundColor = isSuccess ? "#4CAF50" : "#F44336";
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
    
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100%)";
    }, 5000);
  }

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Add loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    const formData = {
      name: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
      subject: document.querySelector('input[name="subject"]').value,
      message: document.querySelector('textarea[name="message"]').value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification("Message sent successfully!", true);
        contactForm.reset(); // Clear form fields
      } else {
        showNotification(`Error: ${result.error || "Failed to send message"}`, false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showNotification("Failed to send message. Please try again later.", false);
    } finally {
      // Reset button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });
});