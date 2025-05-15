document.addEventListener("DOMContentLoaded", () => {
  const chatButton = document.querySelector(".chat-button");
  const chatInterface = document.querySelector(".chat-interface");
  const closeChat = document.querySelector(".close-chat");
  const chatMessages = document.querySelector(".chat-messages");
  const chatInput = document.querySelector(".chat-input input");
  const sendButton = document.querySelector(".send-button");

  let greeted = false; // ⬅️ Declared once per session (reset on refresh)

  // Toggle chat visibility
  chatButton.addEventListener("click", () => {
    chatInterface.classList.toggle("active");

    if (chatInterface.classList.contains("active") && !greeted) {
      addMessage(
        "bot",
        "Hello! I'm your Aloura Assistant. How can I help you today?"
      );
      greeted = true;
    }
  });

  closeChat.addEventListener("click", () => {
    chatInterface.classList.remove("active");
  });

  // Send message handler
  const sendMessage = async () => {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    chatInput.value = "";
    showTypingIndicator();

    try {
      const response = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      removeTypingIndicator();
      addMessage("bot", data.reply);
    } catch (error) {
      removeTypingIndicator();
      addMessage("bot", "Something went wrong. Please try again later.");
    }
  };

  // Event listeners for send
  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Add message to chat
  const addMessage = (type, text) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${type}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Show typing dots
  const showTypingIndicator = () => {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("typing-indicator");
    typingDiv.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Remove typing dots
  const removeTypingIndicator = () => {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) typingIndicator.remove();
  };
});
