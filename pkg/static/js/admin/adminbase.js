"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Set current date in the welcome section
  const dateElement = document.getElementById("current-date");
  const now = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  dateElement.textContent = now.toLocaleDateString("en-US", options);

  // Counter animation for stats
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // Animation duration in milliseconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  });

  // Add click event for navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Responsive sidebar toggle for mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Notification dropdown (for future functionality)
  const notification = document.querySelector(".notification");

  if (notification) {
    notification.addEventListener("click", function () {
      // Functionality for showing notifications dropdown
      console.log("Notifications clicked");
    });
  }

  // Settings dropdown (for future functionality)
  const settings = document.querySelector(".settings");

  if (settings) {
    settings.addEventListener("click", function () {
      // Functionality for showing settings dropdown
      console.log("Settings clicked");
    });
  }

  // Add tooltips to elements (can be extended with a tooltip library)
  const addTooltips = () => {
    const tooltipElements = document.querySelectorAll("[data-tooltip]");

    tooltipElements.forEach((element) => {
      // Basic tooltip functionality
      element.addEventListener("mouseenter", function () {
        const tooltipText = this.getAttribute("data-tooltip");
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${
          rect.left + rect.width / 2 - tooltip.offsetWidth / 2
        }px`;
        tooltip.style.opacity = "1";
      });

      element.addEventListener("mouseleave", function () {
        const tooltip = document.querySelector(".tooltip");
        if (tooltip) {
          document.body.removeChild(tooltip);
        }
      });
    });
  };

  // Function to create dynamic sparklines (can be extended with chart libraries)
  const createSparklines = () => {
    // Placeholder for future sparkline chart implementation
    console.log("Sparklines would be initialized here");
    // Could use Chart.js, D3.js or other libraries for actual implementation
  };

  // Search functionality
  const searchInput = document.querySelector(".search-bar input");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      // Implement search functionality here
      console.log(`Searching for: ${searchTerm}`);
    });
  }

  // System status update simulation
  const updateSystemStatus = () => {
    const progressBars = document.querySelectorAll(".progress-bar");

    progressBars.forEach((bar) => {
      // Simulate fluctuations in system metrics
      setInterval(() => {
        const currentWidth = parseInt(bar.style.width);
        const fluctuation = Math.random() * 5 - 2.5; // Random value between -2.5 and 2.5
        let newWidth = currentWidth + fluctuation;

        // Keep within reasonable bounds
        if (newWidth < 20) newWidth = 20;
        if (newWidth > 90) newWidth = 90;

        bar.style.width = `${newWidth}%`;
        bar.parentElement.nextElementSibling.textContent = `${Math.round(
          newWidth
        )}%`;
      }, 5000); // Update every 5 seconds
    });
  };

  // Initialize advanced features
  addTooltips();
  createSparklines();
  updateSystemStatus();

  // Theme switcher setup (can be expanded for light/dark mode)
  const setupThemeSwitcher = () => {
    // This is a placeholder for theme switching functionality
    console.log("Theme switcher would be initialized here");
    // Future implementation can toggle CSS variables for light/dark mode
  };

  setupThemeSwitcher();

  // Add subtle hover animation to cards
  const cards = document.querySelectorAll(".stat-card, .activity-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
      this.style.borderColor = "var(--accent-color)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
      this.style.borderColor = "";
    });
  });
});
