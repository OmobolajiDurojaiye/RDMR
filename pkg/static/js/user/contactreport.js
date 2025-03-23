"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // FAQ Functionality
  const faqToggle = document.querySelector(".faq-toggle");
  const faqContent = document.querySelector(".faq-content");
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqToggle.addEventListener("click", function () {
    faqContent.classList.toggle("show");
    const chevron = this.querySelector(".fa-chevron-down");
    chevron.style.transform = faqContent.classList.contains("show")
      ? "rotate(180deg)"
      : "rotate(0)";
  });

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector("i");

      // Close other open questions
      document.querySelectorAll(".faq-answer.show").forEach((item) => {
        if (item !== answer) {
          item.classList.remove("show");
          item.previousElementSibling.classList.remove("active");
          item.previousElementSibling.querySelector("i").style.transform =
            "rotate(0)";
        }
      });

      // Toggle current question
      this.classList.toggle("active");
      answer.classList.toggle("show");
      icon.style.transform = answer.classList.contains("show")
        ? "rotate(90deg)"
        : "rotate(0)";
    });
  });

  // Text Editor Functionality
  const editor = document.querySelector(".message-editor");
  const formatButtons = document.querySelectorAll(".format-btn");

  // Make editor focus show placeholder
  editor.addEventListener("focus", function () {
    if (this.innerHTML.trim() === "") {
      this.innerHTML = "";
    }
  });

  editor.addEventListener("blur", function () {
    if (this.innerHTML.trim() === "") {
      this.innerHTML = "";
    }
  });

  // Format buttons
  formatButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const format = this.dataset.format;
      const selection = window.getSelection();

      if (format === "image") {
        document.getElementById("imageUpload").click();
        return;
      }

      if (selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      // Apply formatting based on button clicked
      let formattedText = "";

      switch (format) {
        case "bold":
          formattedText = `<strong>${selectedText}</strong>`;
          break;
        case "italic":
          formattedText = `<em>${selectedText}</em>`;
          break;
        case "underline":
          formattedText = `<u>${selectedText}</u>`;
          break;
        case "bullet":
          formattedText = `<ul><li>${selectedText
            .split("\n")
            .join("</li><li>")}</li></ul>`;
          break;
        case "number":
          formattedText = `<ol><li>${selectedText
            .split("\n")
            .join("</li><li>")}</li></ol>`;
          break;
        case "code":
          formattedText = `<code>${selectedText}</code>`;
          break;
        default:
          formattedText = selectedText;
      }

      if (selectedText) {
        document.execCommand("insertHTML", false, formattedText);
      }

      editor.focus();
    });
  });

  // Handle image upload
  const imageUpload = document.getElementById("imageUpload");
  imageUpload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.style.maxWidth = "100%";
        img.style.borderRadius = "8px";
        img.style.margin = "8px 0";

        // Insert the image at cursor position
        document.execCommand("insertHTML", false, img.outerHTML);
      };
      reader.readAsDataURL(file);
    }
  });

  // Send message functionality
  const sendButton = document.querySelector(".send-btn");
  const messagesContainer = document.getElementById("messagesContainer");

  sendButton.addEventListener("click", function () {
    const messageText = editor.innerHTML.trim();
    if (messageText) {
      // Get selected report type
      const reportType = document.querySelector(
        'input[name="reportType"]:checked'
      ).value;
      const reportTypeText =
        reportType === "contact" ? "Contact" : "Bug Report";

      // Create message element
      const messageDiv = document.createElement("div");
      messageDiv.className = "message message-user";

      // Create message content
      const contentDiv = document.createElement("div");
      contentDiv.className = "message-content";
      contentDiv.innerHTML = messageText;

      // Create time element
      const timeDiv = document.createElement("div");
      timeDiv.className = "message-time";
      const now = new Date();
      timeDiv.textContent = `${reportTypeText} • ${now.getHours()}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      // Append elements
      contentDiv.appendChild(timeDiv);
      messageDiv.appendChild(contentDiv);
      messagesContainer.appendChild(messageDiv);

      // Clear editor
      editor.innerHTML = "";

      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Simulate response after a short delay
      setTimeout(() => {
        const responseDiv = document.createElement("div");
        responseDiv.className = "message message-system";

        const responseContent = document.createElement("div");
        responseContent.className = "message-content";

        if (reportType === "contact") {
          responseContent.innerHTML =
            "Thanks for reaching out! Our team will review your message and get back to you soon.";
        } else {
          responseContent.innerHTML =
            "Thank you for reporting this bug. Our development team has been notified and will investigate the issue. You can track the status of this report in your dashboard.";
        }

        const responseTime = document.createElement("div");
        responseTime.className = "message-time";
        const responseNow = new Date();
        responseTime.textContent = `System • ${responseNow.getHours()}:${String(
          responseNow.getMinutes()
        ).padStart(2, "0")}`;

        responseContent.appendChild(responseTime);
        responseDiv.appendChild(responseContent);
        messagesContainer.appendChild(responseDiv);

        // Scroll to bottom again
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 1000);
    }
  });

  // Allow send with Enter key (Shift+Enter for new line)
  editor.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendButton.click();
    }
  });
});
