const API_URL = "http://localhost:5000/api/menu"; // Adjust API URL

// Notification system
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} z-50 transition-all duration-300 transform translate-x-0 opacity-100`;
  notification.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        ${type === 'success' ? 
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' : 
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'}
      </svg>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Confirmation dialog
async function showConfirmation(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const dialog = document.createElement('div');
    dialog.className = 'bg-white rounded-lg p-6 max-w-md w-full shadow-xl';
    dialog.innerHTML = `
      <div class="mb-4">
        <h3 class="text-lg font-medium text-gray-900">Confirm Action</h3>
        <p class="mt-2 text-sm text-gray-500">${message}</p>
      </div>
      <div class="flex justify-end space-x-3">
        <button id="confirm-cancel" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
        <button id="confirm-ok" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Confirm
        </button>
      </div>
    `;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    document.getElementById('confirm-cancel').addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    });
    
    document.getElementById('confirm-ok').addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });
  });
}

async function fetchDishes() {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) throw new Error('Failed to fetch dishes');
    const dishes = await response.json();
    renderDishes(dishes);
  } catch (error) {
    showNotification('Error loading dishes: ' + error.message, 'error');
    console.error('Fetch dishes error:', error);
  }
}

function renderDishes(dishes) {
  const tableBody = document.getElementById("dishes-table");
  tableBody.innerHTML =
    dishes.length === 0
      ? `<tr><td class="p-2 border text-center" colspan="5">No dishes available</td></tr>`
      : dishes
          .map(
            (dish, index) => `
        <tr>
          <td class="p-2 border text-center">
            <img src="${dish.image}" alt="Dish Image" class="w-12 h-12 md:w-16 md:h-16 object-cover rounded">
          </td>
          <td class="p-2 border text-sm md:text-base text-center">${dish.dish_name}</td> 
          <td class="p-2 border text-sm md:text-base text-center">${dish.variety}</td>
          <td class="p-2 border text-sm md:text-base text-center">₹${dish.price}</td>
          <td class="p-2 border text-center">
            <button onclick="deleteDish('${dish._id}')" 
              class="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm hover:bg-red-600 transition w-24">
              ❌ Delete
            </button>
          </td>
        </tr>
      `
          )
          .join("");
}

document
  .getElementById("dish-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dish_name", document.getElementById("dish-name").value);
    formData.append("variety", document.getElementById("variety").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("image", document.getElementById("dish-image").files[0]);

    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showNotification('Dish added successfully!');
        fetchDishes();
        document.getElementById("dish-form").reset();
      } else {
        const result = await response.json();
        showNotification(result.error || 'Error adding dish', 'error');
      }
    } catch (error) {
      showNotification('Network error: ' + error.message, 'error');
      console.error('Add dish error:', error);
    }
  });

async function deleteDish(id) {
  const isConfirmed = await showConfirmation("Are you sure you want to delete this dish?");
  if (!isConfirmed) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    
    if (response.ok) {
      showNotification('Dish deleted successfully!');
      fetchDishes();
    } else {
      const result = await response.json();
      showNotification(result.error || 'Error deleting dish', 'error');
    }
  } catch (error) {
    showNotification('Network error: ' + error.message, 'error');
    console.error('Delete dish error:', error);
  }
}

// Initialize
fetchDishes();