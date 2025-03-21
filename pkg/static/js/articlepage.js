"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Toggle play/pause for podcast player
  const playBtn = document.querySelector(".play-btn");
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      const icon = this.querySelector("svg");
      if (icon.innerHTML.includes('polygon points="5 3 19 12 5 21 5 3"')) {
        // Change to pause icon
        icon.innerHTML =
          '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      } else {
        // Change to play icon
        icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
      }
    });
  }

  // Like button interaction
  const likeBtn = document.querySelector(".like-btn");
  if (likeBtn) {
    likeBtn.addEventListener("click", function () {
      const likeCount = this.querySelector(".like-count");
      const icon = this.querySelector("svg");

      if (!this.classList.contains("liked")) {
        this.classList.add("liked");
        icon.setAttribute("fill", "#ff6b6b");
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
      } else {
        this.classList.remove("liked");
        icon.setAttribute("fill", "none");
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
      }
    });
  }

  // Bookmark button interaction
  const bookmarkBtn = document.querySelector(".bookmark-btn");
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", function () {
      const icon = this.querySelector("svg");

      if (!this.classList.contains("bookmarked")) {
        this.classList.add("bookmarked");
        icon.setAttribute("fill", "#5472e4");
        // Show a notification
        showNotification("Article bookmarked successfully");
      } else {
        this.classList.remove("bookmarked");
        icon.setAttribute("fill", "none");
        showNotification("Article removed from bookmarks");
      }
    });
  }

  // Video placeholder click
  const videoPlaceholder = document.querySelector(".video-placeholder");
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener("click", function () {
      // In a real implementation, this would load and play the video
      showNotification("Video player will be implemented with backend");
    });
  }

  // Progress bar interaction (simulated)
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    progressBar.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;

      document.querySelector(".progress-filled").style.width = `${percent}%`;

      // Update time display (simulated)
      const totalSeconds = 23 * 60 + 45; // 23:45 in seconds
      const currentSeconds = Math.floor(totalSeconds * (percent / 100));
      const minutes = Math.floor(currentSeconds / 60);
      const seconds = currentSeconds % 60;

      document.querySelector(
        ".progress-time span:first-child"
      ).textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    });
  }

  // Share button functionality
  const shareBtn = document.querySelector(".share-btn");
  if (shareBtn) {
    // If Web Share API is available
    if (navigator.share) {
      shareBtn.addEventListener("click", async () => {
        try {
          await navigator.share({
            title: document.querySelector(".article-title").textContent,
            text: "Check out this article about DeFi on Rēadmire",
            url: window.location.href,
          });
        } catch (err) {
          console.error("Share failed:", err);
        }
      });
    }
  }

  // Function to show notifications
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    // Style the notification
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "rgba(84, 114, 228, 0.9)";
    notification.style.color = "white";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "8px";
    notification.style.zIndex = "1000";
    notification.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
    notification.style.transition = "all 0.3s ease";
    notification.style.transform = "translateY(100px)";
    notification.style.opacity = "0";

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateY(0)";
      notification.style.opacity = "1";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateY(100px)";
      notification.style.opacity = "0";

      // Remove from DOM after animation completes
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Enable dropdowns on mobile
  const dropdownButtons = document.querySelectorAll(".share-btn, .comment-btn");
  dropdownButtons.forEach((button) => {
    let isOpen = false;

    button.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = this.closest(
          ".share-dropdown, .comment-dropdown"
        ).querySelector(".share-content, .comment-preview");

        if (isOpen) {
          dropdown.style.display = "none";
          isOpen = false;
        } else {
          dropdown.style.display = "flex";
          isOpen = true;
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      const dropdowns = document.querySelectorAll(
        ".share-content, .comment-preview"
      );
      dropdowns.forEach((dropdown) => {
        const button = dropdown.parentElement.querySelector(".action-button");
        if (!dropdown.contains(e.target) && !button.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });
    }
  });
});
