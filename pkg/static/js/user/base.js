"use strict";

const navItems = document.querySelectorAll(".nav-item");

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("categoryModal");
  const categoriesBtn = document.getElementById("categoriesBtn");
  const categoryBoxes = document.querySelectorAll(".category-box");
  const closeBtn = document.querySelector(".modal-close");
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const navbar = document.querySelector(".navbar");

  // Create the toggle button for navbar (initially hidden)
  const navToggle = document.createElement("button");
  navToggle.className = "nav-toggle";
  navToggle.innerHTML =
    '<img src="/static/icons/menu.png" alt="Show Menu" class="nav-toggle-icon">';
  document.body.appendChild(navToggle);

  // Create minimize button wrapper and add to navbar
  const minimizeBtn = document.createElement("button");
  minimizeBtn.className = "minimize-btn";
  minimizeBtn.innerHTML =
    '<img src="/static/icons/minimize.png" alt="Hide" class="minimize-icon">';

  // Create a container for the minimize button
  const minimizeContainer = document.createElement("div");
  minimizeContainer.className = "minimize-container";
  minimizeContainer.appendChild(minimizeBtn);
  navbar.appendChild(minimizeContainer);

  // Themes
  const themes = {
    blue: {
      bg: "#f5f8ff",
      accent: "#4a6fff",
      accentBg: "rgba(74, 111, 255, 0.1)",
    },
    green: {
      bg: "#f2fbf6",
      accent: "#34c77b",
      accentBg: "rgba(52, 199, 123, 0.1)",
    },
    red: {
      bg: "#fff5f5",
      accent: "#ff6b6b",
      accentBg: "rgba(255, 107, 107, 0.1)",
    },
    purple: {
      bg: "#f9f5ff",
      accent: "#845ef7",
      accentBg: "rgba(132, 94, 247, 0.1)",
    },
    orange: {
      bg: "#fff4e6",
      accent: "#ff922b",
      accentBg: "rgba(255, 146, 43, 0.1)",
    },
  };

  // Toggle navbar visibility
  function toggleNavbar() {
    if (navbar.classList.contains("hidden")) {
      // Show navbar
      navbar.classList.remove("hidden");
      navToggle.classList.remove("visible");
    } else {
      // Hide navbar
      navbar.classList.add("hidden");
      navToggle.classList.add("visible");
    }
  }

  // Add click event to minimize and toggle buttons
  minimizeBtn.addEventListener("click", toggleNavbar);
  navToggle.addEventListener("click", toggleNavbar);

  // Open modal
  categoriesBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      resetTheme();
    }
  });

  // close button handler
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    resetTheme();
  });

  // Handle category hover effects
  categoryBoxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      const theme = themes[box.dataset.theme];
      document.documentElement.style.setProperty(
        "--background-color",
        theme.bg
      );
      document.documentElement.style.setProperty(
        "--accent-color",
        theme.accent
      );
      document.documentElement.style.setProperty("--accent-bg", theme.accentBg);
    });

    box.addEventListener("mouseleave", resetTheme);
  });

  // Reset theme to original colors
  function resetTheme() {
    document.documentElement.style.setProperty("--background-color", "#0a0a0a");
    document.documentElement.style.setProperty("--accent-color", "#5472e4");
    document.documentElement.style.setProperty(
      "--accent-bg",
      "rgba(90, 170, 236, 0.15)"
    );
  }

  // Show/hide the button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // Smooth scroll to top when button is clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
