"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Sample data for demonstration
  const bookmarkData = [
    {
      id: 1,
      title: "Zero-Knowledge Proofs: The Future of Blockchain Privacy",
      excerpt:
        "An in-depth exploration of zk-SNARKs and how they're revolutionizing transaction privacy on public blockchains.",
      image: "{{ url_for('static', filename='images/ai.jpg') }}",
      category: "technical",
      date: "Mar 15, 2025",
      url: "/article/zero-knowledge-proofs",
    },
    {
      id: 2,
      title:
        "Saving the Amazon: Blockchain Solutions for Conservation Tracking",
      excerpt:
        "How distributed ledger technology is creating transparent accountability in rainforest conservation efforts.",
      image: "{{ url_for('static', filename='images/ai.jpg') }}",
      category: "conservation",
      date: "Mar 10, 2025",
      url: "/article/blockchain-conservation",
    },
    {
      id: 3,
      title: "Medical Records on the Blockchain: Security and Privacy Concerns",
      excerpt:
        "Analyzing the potential and challenges of storing sensitive medical data on distributed ledgers.",
      image: "{{ url_for('static', filename='images/ai.jpg') }}",
      category: "health",
      date: "Mar 5, 2025",
      url: "/article/medical-blockchain",
    },
    {
      id: 4,
      title: "The Environmental Impact of Proof-of-Stake vs Proof-of-Work",
      excerpt:
        "A comprehensive comparison of energy consumption between different consensus mechanisms.",
      image: "{{ url_for('static', filename='images/ai.jpg') }}",
      category: "cryptocurrency",
      date: "Feb 28, 2025",
      url: "/article/pos-vs-pow",
    },
    {
      id: 5,
      title: "Digital Identity in the Age of Web3: Ownership and Control",
      excerpt:
        "How decentralized identity solutions are changing the way we think about personal data online.",
      image: "{{ url_for('static', filename='images/ai.jpg') }}",
      category: "general",
      date: "Feb 25, 2025",
      url: "/article/web3-identity",
    },
    {
      id: 6,
      title: "The Rise of Decentralized Finance: Beyond Speculation",
      excerpt:
        "Exploring real-world applications of DeFi beyond trading and yield farming.",
      image: "{{ url_for('static', filename='images/ai.jpg') }}",
      category: "cryptocurrency",
      date: "Feb 20, 2025",
      url: "/article/defi-applications",
    },
  ];

  // DOM Elements
  const bookmarksContainer = document.getElementById("bookmarks-container");
  const bookmarkTemplate = document.getElementById("bookmark-template");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("search-bookmarks");
  const emptyState = document.getElementById("empty-bookmarks");

  // Current filter and search state
  let currentFilter = "all";
  let searchQuery = "";

  // Render all bookmarks initially
  renderBookmarks();

  // Filter button event listeners
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Update current filter
      currentFilter = this.getAttribute("data-filter");

      // Re-render bookmarks
      renderBookmarks();
    });
  });

  // Search input event listener
  searchInput.addEventListener("input", function () {
    searchQuery = this.value.toLowerCase();
    renderBookmarks();
  });

  // Function to render bookmarks based on current filter and search
  function renderBookmarks() {
    // Clear container
    bookmarksContainer.innerHTML = "";

    // Filter and search bookmarks
    const filteredBookmarks = bookmarkData.filter((bookmark) => {
      // Filter by category
      const categoryMatch =
        currentFilter === "all" || bookmark.category === currentFilter;

      // Filter by search query
      const searchMatch =
        bookmark.title.toLowerCase().includes(searchQuery) ||
        bookmark.excerpt.toLowerCase().includes(searchQuery) ||
        bookmark.category.toLowerCase().includes(searchQuery);

      return categoryMatch && searchMatch;
    });

    // Show/hide empty state
    if (filteredBookmarks.length === 0) {
      emptyState.style.display = "flex";
      return;
    } else {
      emptyState.style.display = "none";
    }

    // Render each bookmark
    filteredBookmarks.forEach((bookmark) => {
      const bookmarkElement = bookmarkTemplate.content.cloneNode(true);

      // Set bookmark data
      bookmarkElement.querySelector(".bookmark-image img").src = bookmark.image;
      bookmarkElement.querySelector(".bookmark-date").textContent =
        bookmark.date;

      const categoryElement =
        bookmarkElement.querySelector(".bookmark-category");
      categoryElement.textContent =
        bookmark.category.charAt(0).toUpperCase() + bookmark.category.slice(1);
      categoryElement.setAttribute("data-category", bookmark.category);

      bookmarkElement.querySelector(".bookmark-title").textContent =
        bookmark.title;
      bookmarkElement.querySelector(".bookmark-excerpt").textContent =
        bookmark.excerpt;
      bookmarkElement.querySelector(".read-more").href = bookmark.url;

      // Add event listeners for bookmark actions
      const removeBtn = bookmarkElement.querySelector(".remove-bookmark");
      const shareBtn = bookmarkElement.querySelector(".share-bookmark");

      removeBtn.addEventListener("click", () => removeBookmark(bookmark.id));
      shareBtn.addEventListener("click", () => shareBookmark(bookmark));

      // Append to container
      bookmarksContainer.appendChild(bookmarkElement);
    });

    // Add animation effects to newly rendered cards
    animateCards();
  }

  // Function to animate cards when they appear
  function animateCards() {
    const cards = document.querySelectorAll(".bookmark-card");

    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";

      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  // Function to remove a bookmark
  function removeBookmark(id) {
    // Animation for removal
    const bookmarkElement = document.querySelector(
      `.bookmark-card[data-id="${id}"]`
    );
    if (bookmarkElement) {
      bookmarkElement.style.transition = "opacity 0.3s, transform 0.3s";
      bookmarkElement.style.opacity = "0";
      bookmarkElement.style.transform = "scale(0.8)";

      setTimeout(() => {
        // In a real application, you would make an API call here
        // For demo purposes, just filter the array
        const index = bookmarkData.findIndex((bookmark) => bookmark.id === id);
        if (index !== -1) {
          bookmarkData.splice(index, 1);
          renderBookmarks();
        }
      }, 300);
    }
  }

  // Function to share a bookmark
  function shareBookmark(bookmark) {
    // Create a share modal - simplified for demo
    const shareUrl = `${window.location.origin}${bookmark.url}`;

    // In a real app, you might use the Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: bookmark.title,
          text: bookmark.excerpt,
          url: shareUrl,
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          // Show toast notification
          showToast("Link copied to clipboard");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    }
  }

  // Function to show toast notification
  function showToast(message) {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;

    // Add to document
    document.body.appendChild(toast);

    // Show with animation
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    }, 10);

    // Remove after timeout
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-20px)";

      // Remove from DOM after animation
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Add necessary styles for toast notifications
  const toastStyles = document.createElement("style");
  toastStyles.textContent = `
      .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s, transform 0.3s;
      }
    `;
  document.head.appendChild(toastStyles);

  // Add futuristic hover effects and interactions
  const hoverEffects = document.createElement("style");
  hoverEffects.textContent = `
      .bookmark-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(125deg, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%);
        background-size: 200% 200%;
        animation: shine 3s infinite linear;
        pointer-events: none;
      }
      
      @keyframes shine {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `;
  document.head.appendChild(hoverEffects);
});
