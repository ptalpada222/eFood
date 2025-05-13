// Email validation function
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Function to decode JWT Token
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
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
    warning: 'linear-gradient(135deg, #FF9800, #EF6C00)',
    info: 'linear-gradient(135deg, #2196F3, #1565C0)'
  };
  notification.style.background = colors[type] || colors.error;

  // Add icon based on type
  const icons = {
    error: '❌',
    success: '✅',
    warning: '⚠️',
    info: 'ℹ️'
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

// Add input error styling
function showInputError(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.classList.add('input-error');
    // Remove error class after animation completes
    setTimeout(() => input.classList.remove('input-error'), 500);
  }
}

// Add CSS for input errors
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

// Login event listener
document.getElementById("loginForm").addEventListener("click", async function (e) {
  e.preventDefault();
  const emailOrPhone = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!emailOrPhone || !password) {
    showNotification("Please fill in all fields", "error");
    if (!emailOrPhone) showInputError("email");
    if (!password) showInputError("password");
    return;
  }

  if (!validateEmail(emailOrPhone)) {
    showNotification("Please enter a valid email", "error");
    showInputError("email");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrPhone, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      showNotification(data.message || "Login failed. Try again.", "error");
      return;
    }

    localStorage.setItem("token", data.accessToken);

    const decodedToken = parseJwt(data.accessToken);
    console.log("Decoded Token:", decodedToken);

    if (decodedToken) {
      localStorage.setItem("user_details", JSON.stringify(decodedToken));
    } else {
      console.error("Failed to extract user details from token");
    }

    showNotification("Login successful! Redirecting...", "success");
    setTimeout(() => {
      window.location.href = "../HomePage/index.html";
    }, 1500);
  } catch (error) {
    console.error("Login error:", error);
    showNotification("An error occurred. Please try again.", "error");
  }
});

// Google login event listener
document.getElementById("googleLoginBtn").addEventListener("click", function () {
  window.location.href = "http://localhost:5000/auth/google";
});

// Password reset event listeners
document.getElementById("forgotPassword").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    showNotification("Please enter your email first", "warning");
    showInputError("email");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    showNotification(data.message, response.ok ? "success" : "error");

    if (response.ok) {
      document.getElementById("otp").style.display = "block";
      document.getElementById("checkOtp").style.display = "block";
      document.getElementById("loginForm").style.display = "none";
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    showNotification("Failed to send OTP. Please try again.", "error");
  }
});

document.getElementById("checkOtp").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const otp = document.getElementById("otp").value.trim();
  if (!otp) {
    showNotification("Please enter the OTP", "warning");
    showInputError("otp");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    showNotification(data.message, response.ok ? "success" : "error");

    if (response.ok) {
      document.getElementById("checkOtp").style.display = "none";
      document.getElementById("newPassword").style.display = "block";
      document.getElementById("update-password").style.display = "block";
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    showNotification("Failed to verify OTP. Please try again.", "error");
  }
});

document.getElementById("update-password").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  if (!newPassword) {
    showNotification("Please enter a new password", "warning");
    showInputError("newPassword");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();
    showNotification(data.message, response.ok ? "success" : "error");

    if (response.ok) {
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
  } catch (error) {
    console.error("Error updating password:", error);
    showNotification("Failed to update password. Please try again.", "error");
  }
});