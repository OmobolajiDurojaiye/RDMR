"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Filter buttons functionality
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Get the time period
      const period = this.dataset.period;
      // Here you would typically fetch new data based on the period
      fetchLeaderboardData(period);
    });
  });

  // Populate rankings table with dummy data (replace with actual data fetch)
  function populateRankingsTable(data) {
    const tbody = document.getElementById("rankings-body");
    tbody.innerHTML = "";

    // Start from rank 4 since top 3 are in podium
    for (let i = 4; i <= 10; i++) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${i}</td>
                <td>User ${i}</td>
                <td>${Math.floor(Math.random() * 100)} points</td>
                <td>${Math.floor(Math.random() * 50)} gems</td>
            `;
      tbody.appendChild(tr);
    }
  }

  // Function to fetch leaderboard data (to be implemented)
  function fetchLeaderboardData(period) {
    // This would typically be an API call
    console.log(`Fetching data for ${period}`);
    // For now, just populate with dummy data
    populateRankingsTable();
  }

  // Initialize with dummy data
  populateRankingsTable();

  function populateRankingsTable(data) {
    const tbody = document.getElementById("rankings-body");
    tbody.innerHTML = "";

    // Start from rank 4 since top 3 are in podium
    for (let i = 4; i <= 10; i++) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${i}</td>
            <td>User ${i}</td>
            <td>
                <div class="points-cell">
                    <i class="fas fa-star"></i>
                    <span>${Math.floor(Math.random() * 100)}</span>
                </div>
            </td>
            <td>
                <div class="gems-cell">
                    <i class="fas fa-gem"></i>
                    <span>${Math.floor(Math.random() * 50)}</span>
                </div>
            </td>
        `;
      tbody.appendChild(tr);
    }
  }
});
