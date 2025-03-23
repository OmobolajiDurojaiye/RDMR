"use strict";

// Platform Analytics JS

document.addEventListener("DOMContentLoaded", function () {
  // Date Filter Buttons
  const dateButtons = document.querySelectorAll(".date-btn");
  dateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      dateButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      // Here you would typically fetch data for the selected period
    });
  });

  // Chart Tabs
  const chartTabs = document.querySelectorAll(".chart-tab");
  chartTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabsContainer = this.closest(".chart-tabs");
      tabsContainer
        .querySelectorAll(".chart-tab")
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      // Here you would typically update the chart based on the selected tab
    });
  });

  // Add hover effect to metric cards
  const metricCards = document.querySelectorAll(".metric-card");
  metricCards.forEach((card) => {
    card.addEventListener("mouseover", function () {
      this.style.borderColor = "var(--accent-color)";
    });

    card.addEventListener("mouseout", function () {
      this.style.borderColor = "var(--border-color)";
    });
  });

  // Add hover effect to article items
  const articleItems = document.querySelectorAll(".article-item");
  articleItems.forEach((item) => {
    item.addEventListener("mouseover", function () {
      const rank = this.querySelector(".article-rank");
      if (rank) {
        rank.style.backgroundColor = "var(--accent-color)";
        rank.style.color = "var(--text-color)";
      }
    });

    item.addEventListener("mouseout", function () {
      const rank = this.querySelector(".article-rank");
      if (rank) {
        rank.style.backgroundColor = "var(--accent-bg)";
        rank.style.color = "var(--accent-color)";
      }
    });
  });

  // View All buttons functionality
  const viewAllButtons = document.querySelectorAll(".view-all-btn");
  viewAllButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cardTitle =
        this.closest(".card-header").querySelector("h3").textContent;
      console.log(`View all clicked for: ${cardTitle}`);
      // Here you would typically navigate to a detailed view page
    });
  });

  // This is just a placeholder for actual chart initialization
  // This would be replaced with actual chart library code when backend is ready
  function initChartPlaceholders() {
    console.log("Chart placeholders initialized");
    // This function would be replaced with actual chart initialization code
  }

  initChartPlaceholders();
});
