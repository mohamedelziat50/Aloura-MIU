document.addEventListener("DOMContentLoaded", function () {
  const chatButton = document.querySelector(".chat-button");
  const chatInterface = document.querySelector(".chat-interface");
  const closeChat = document.querySelector(".close-chat");
  const chatMessages = document.querySelector(".chat-messages");
  const chatInput = document.querySelector(".chat-input input");
  const sendButton = document.querySelector(".send-button");

  // Toggle chat interface
  chatButton.addEventListener("click", () => {
    chatInterface.classList.toggle("active");
    if (chatInterface.classList.contains("active")) {
      addMessage(
        "bot",
        "Hello! I'm your Aloura Assistant. How can I help you today?"
      );
    }
  });

  closeChat.addEventListener("click", () => {
    chatInterface.classList.remove("active");
  });

  // Send message function
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Add user message to chat
      addMessage("user", message);
      chatInput.value = "";

      // Show typing indicator
      showTypingIndicator();

      // Simulate bot response
      setTimeout(() => {
        removeTypingIndicator();
        addMessage("bot", "I'm currently offline. Please try again later.");
      }, 1000);
    }
  }

  // Send message on button click or Enter key
  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Add message to chat
  function addMessage(type, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${type}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("typing-indicator");
    typingDiv.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
});
