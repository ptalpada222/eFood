let customers = [];

// Create notification system
function createNotificationSystem() {
  const notificationContainer = document.createElement('div');
  notificationContainer.id = 'notification-container';
  notificationContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
  `;
  document.body.appendChild(notificationContainer);
}

function showNotification(message, type = 'success') {
  const notificationContainer = document.getElementById('notification-container') || createNotificationSystem();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    background-color: ${type === 'success' ? '#4CAF50' : '#F44336'};
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateX(120%);
    transition: all 0.3s ease-out;
    word-wrap: break-word;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  
  // Add icon based on type
  const icon = document.createElement('span');
  icon.innerHTML = type === 'success' ? '✓' : '⚠';
  icon.style.marginRight = '10px';
  icon.style.fontWeight = 'bold';
  
  const messageSpan = document.createElement('span');
  messageSpan.textContent = message;
  messageSpan.style.flex = '1';
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.background = 'transparent';
  closeBtn.style.border = 'none';
  closeBtn.style.color = 'white';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.marginLeft = '10px';
  closeBtn.style.fontSize = '18px';
  closeBtn.onclick = () => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => notification.remove(), 300);
  };
  
  notification.appendChild(icon);
  notification.appendChild(messageSpan);
  notification.appendChild(closeBtn);
  notificationContainer.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  }, 10);

  // Auto-remove after delay
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

async function fetchCustomers() {
  try {
    // Add loading state
    const tableBody = document.getElementById('customers-table');
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="p-4 border text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span class="ml-2">Loading messages...</span>
        </td>
      </tr>
    `;
    
    const response = await fetch('http://localhost:5000/api/contact/messages');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch messages');
    }
    
    customers = data;
    renderCustomers();
  } catch (error) {
    console.error('Error fetching customers:', error);
    showNotification(error.message || 'Failed to load customer messages', 'error');
    renderCustomers(); // Will show "no messages" state
  }
}

function renderCustomers(filteredCustomers = customers) {
  const tableBody = document.getElementById('customers-table');
  tableBody.innerHTML = '';

  if (filteredCustomers.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td class="p-4 border text-center" colspan="5">
          <div class="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No customer messages found
          </div>
        </td>
      </tr>
    `;
    return;
  }

  filteredCustomers.forEach((customer) => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50 transition-colors';

    row.innerHTML = `
      <td class="p-3 border text-center">${customer.name}</td>
      <td class="p-3 border text-center">
        <a href="mailto:${customer.email}" class="text-blue-600 hover:underline">${customer.email}</a>
      </td>
      <td class="p-3 border text-center">${customer.subject}</td>
      <td class="p-3 border text-center max-w-xs truncate" title="${customer.message}">${customer.message}</td>
      <td class="p-3 border text-center">
        <button onclick="deleteCustomer('${customer._id}')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition-colors flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function deleteCustomer(id) {
  if (!confirm('Are you sure you want to delete this message?')) return;

  try {
    // Add loading state to the button
    const button = document.querySelector(`button[onclick="deleteCustomer('${id}')"]`);
    const originalContent = button.innerHTML;
    button.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Deleting...
    `;
    button.disabled = true;

    const res = await fetch(
      `http://localhost:5000/api/contact/messages/${id}`,
      { method: 'DELETE' }
    );

    const data = await res.json();

    if (res.ok) {
      showNotification(data.message || 'Message deleted successfully', 'success');
      customers = customers.filter((c) => c._id !== id);
      renderCustomers();
    } else {
      throw new Error(data.error || 'Failed to delete message');
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    showNotification(error.message || 'An error occurred while deleting the message', 'error');
  }
}

function filterCustomers() {
  const searchValue = document
    .getElementById('search-customer')
    .value.toLowerCase();

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchValue) ||
      c.email.toLowerCase().includes(searchValue) ||
      (c.subject && c.subject.toLowerCase().includes(searchValue)) ||
      (c.message && c.message.toLowerCase().includes(searchValue))
  );

  renderCustomers(filtered);
}

document
  .getElementById('search-customer')
  .addEventListener('input', debounce(filterCustomers, 300));

function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

// Initialize notification system
createNotificationSystem();
fetchCustomers(); // Initial fetch