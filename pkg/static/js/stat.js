"use strict";
// Animation and interactive elements for the blog stats page

document.addEventListener("DOMContentLoaded", function () {
  // Animate the bars when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all the elements that should be animated
  document.querySelectorAll(".bar, .month-bar").forEach((element) => {
    observer.observe(element);
  });

  // Add hover effects to cards
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 30px rgba(84, 114, 228, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    });
  });

  // Initialize the month bars with their heights
  initializeMonthBars();

  // Setup share buttons
  setupShareButtons();
});

function animateElement(element) {
  // Add animation class
  element.classList.add("animated");

  // If it's a bar element
  if (element.classList.contains("bar")) {
    const width = element
      .getAttribute("style")
      .split("width: ")[1]
      .split(";")[0];
    element.style.width = "0%";

    setTimeout(() => {
      element.style.width = width;
    }, 100);
  }

  // If it's a month bar
  if (element.classList.contains("month-bar")) {
    const parent = element.parentElement;
    const value = parent.getAttribute("data-value");
    element.style.height = "0%";

    setTimeout(() => {
      element.style.height = value + "%";
    }, 100);
  }
}

function initializeMonthBars() {
  const months = document.querySelectorAll(".month");

  months.forEach((month) => {
    const value = month.getAttribute("data-value");
    const bar = month.querySelector(".month-bar");

    // Set initial height to 0
    bar.style.height = "0%";

    // Animate to the actual height after a short delay
    setTimeout(() => {
      bar.style.height = value + "%";
    }, 500);
  });
}

function setupShareButtons() {
  // Twitter share
  document
    .querySelector(".share-btn.twitter")
    .addEventListener("click", function () {
      const text = "Check out my 2025 Blog Wrapped! #BlogWrapped";
      const url = window.location.href;

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    });

  // Facebook share
  document
    .querySelector(".share-btn.facebook")
    .addEventListener("click", function () {
      const url = window.location.href;

      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    });

  // LinkedIn share
  document
    .querySelector(".share-btn.linkedin")
    .addEventListener("click", function () {
      const url = window.location.href;
      const title = "My 2025 Blog Wrapped";

      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`,
        "_blank"
      );
    });
}
