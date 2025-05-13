document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleSidebar");
  const contentDiv = document.getElementById("content");
  const links = document.querySelectorAll("#sidebar a");

  function loadPage(page, addToHistory = true) {
    fetch(page)
      .then((response) => response.text())
      .then((html) => {
        contentDiv.innerHTML = html;

        // Load additional scripts if needed
        if (page === "dishManagement.html") {
          loadScript("./js/menu.js");
        } else if (page === "bookings.html") {
          loadScript("./js/booking.js");
        } else if (page === "messages.html") {
          loadScript("./js/message.js");
        } else if (page === "orderFood.html") {
          loadScript("./js/orderFood.js");
        } else if (page === "sales.html") {
          loadScript("./js/sales.js");
        } else if("dashboard.html")
        {
          loadScript("./js/dashboard.js")
        }

        // Close sidebar on mobile after page loads
        if (window.innerWidth < 768) {
          sidebar.classList.add("-translate-x-full");
        }

        // Update browser history
        if (addToHistory) {
          history.pushState({ page }, "", `#${page}`);
        }
      })
      .catch((error) => console.error("Error loading page:", error));
  }

  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.onload = callback || function () {};
    document.body.appendChild(script);
  }

  // 🔹 Check URL hash for saved page or load default page
  const pageToLoad = window.location.hash
    ? window.location.hash.substring(1)
    : "dishManagement.html";
  loadPage(pageToLoad, false);

  // 🔹 Load pages only when clicked
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = this.getAttribute("data-page");
      loadPage(page);
    });
  });

  // 🔹 Handle browser back/forward navigation
  window.addEventListener("popstate", function (event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page, false);
    }
  });

  // 🔹 Sidebar toggle for mobile
  toggleButton.addEventListener("click", function () {
    sidebar.classList.toggle("-translate-x-full");
  });
});
