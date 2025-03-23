"use strict";
// Scroll to Top functionality
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTop");

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
