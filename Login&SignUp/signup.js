// Email validation function
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Phone number validation function
function validatePhoneNumber(phone) {
  const phoneRegex = /^\+?(\d[\-\s()]?)*(\d)$/;
  return phoneRegex.test(phone) && phone.replace(/[\-\s()]/g, "").length >= 10;
}

// Password validation
function validatePassword(password) {
  return password.length >= 6;
}

// Modern Notification System
function showNotification(message, type = 'error') {
  // Create notification container if it doesn't exist
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.right = '20px';
    container.style.zIndex = '1000';
    container.style.maxWidth = '350px';
    container.style.width = '100%';
    document.body.appendChild(container);
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.padding = '15px 20px';
  notification.style.marginBottom = '10px';
  notification.style.borderRadius = '8px';
  notification.style.color = 'white';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.style.transform = 'translateX(400px)';
  notification.style.opacity = '0';
  notification.style.transition = 'all 0.3s ease';

  // Set background color based on type
  const colors = {
    error: 'linear-gradient(135deg, #ff5e5e, #d32f2f)',
    success: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    warning: 'linear-gradient(135deg, #FF9800, #EF6C00)'
  };
  notification.style.background = colors[type] || colors.error;

  // Add icon based on type
  const icons = {
    error: '❌',
    success: '✅',
    warning: '⚠️'
  };
  notification.innerHTML = `
    <span style="margin-right: 10px; font-size: 20px;">${icons[type] || icons.error}</span>
    <span>${message}</span>
  `;

  container.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  }, 10);

  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  // Click to dismiss
  notification.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  });
}

// Form submission handler
document.getElementById("signupForm").addEventListener("click", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const password = document.getElementById("password").value.trim();

  // Reset any previous error highlights
  document.querySelectorAll('.input-error').forEach(el => {
    el.classList.remove('input-error');
  });

  // Validation checks
  if (!name) {
    document.getElementById("name").classList.add('input-error');
    showNotification("Please enter your name", "error");
    return;
  }
  
  if (!password) {
    document.getElementById("password").classList.add('input-error');
    showNotification("Please enter a password", "error");
    return;
  }

  if (!validateEmail(email)) {
    document.getElementById("email").classList.add('input-error');
    showNotification("Please enter a valid email address", "error");
    return;
  }

  if (!validatePhoneNumber(phoneNumber)) {
    document.getElementById("phoneNumber").classList.add('input-error');
    showNotification("Please enter a valid phone number", "error");
    return;
  }

  if (!validatePassword(password)) {
    document.getElementById("password").classList.add('input-error');
    showNotification("Password must be at least 6 characters", "error");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phoneNumber, password }),
    });

    const data = await response.json();
    if (response.ok) {
      showNotification("Signup successful! Redirecting to login...", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      showNotification(data.message || "Signup failed. Please try again.", "error");
    }
  } catch (error) {
    showNotification("Network error. Please try again later.", "error");
    console.error("Signup error:", error);
  }
});

// Add this CSS to your stylesheet
const style = document.createElement('style');
style.textContent = `
  .input-error {
    border: 2px solid #ff5e5e !important;
    animation: shake 0.5s;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);