console.log(localStorage.getItem("token"));
console.log(localStorage.getItem("user_details"));

// Function to check if the user exists in the database
async function checkUserExistence() {
  const userDetails = localStorage.getItem("user_details");

  if (!userDetails) return; // No user stored, no need to check

  try {
    const user = JSON.parse(userDetails);
    const userId = user.userId; // Extract user ID from stored object

    if (!userId) {
      console.error("User ID not found in localStorage");
      localStorage.removeItem("user_details"); // Remove invalid data
      return;
    }

    // Call API to verify if the user exists
    const response = await fetch(
      `http://localhost:5000/api/auth/user/${userId}`
    );

    if (!response.ok) {
      console.warn("User not found. Removing from localStorage...");
      localStorage.removeItem("user_details"); // Remove user data if not found
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    localStorage.removeItem("user_details"); // Remove corrupted data
  }
}

// Call the function when the page loads
checkUserExistence();
