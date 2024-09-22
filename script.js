// Select elements
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const clearChatButton = document.getElementById('clear-chat-button');
const recoverChatButton = document.getElementById('recover-chat-button');

// Load chat history from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  loadChatHistory();
});

// Handle sending a message
sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== '') {
    // Append user message
    appendMessage('user', message);

    // Bot response (echoing user's message)
    const botResponse = `You said: ${message}`;
    setTimeout(() => {
      appendMessage('bot', botResponse);
    }, 500);

    // Clear the input field
    messageInput.value = '';
  }
}

function appendMessage(sender, text) {
  const messageElement = document.createElement('div');
  messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
  messageElement.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Bot'}:</strong> ${text}`;
  chatWindow.appendChild(messageElement);

  // Scroll to the bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Update chat history in localStorage
  updateLocalStorage(sender, text);
}

function updateLocalStorage(sender, text) {
  let chatHistory = localStorage.getItem('chatHistory');
  chatHistory = chatHistory ? JSON.parse(chatHistory) : [];
  chatHistory.push({ sender, text });
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function loadChatHistory() {
  const storedChatHistory = localStorage.getItem('chatHistory');
  if (storedChatHistory) {
    chatWindow.innerHTML = JSON.parse(storedChatHistory).map(chat => {
      return `<div class="${chat.sender === 'user' ? 'user-message' : 'bot-message'}"><strong>${chat.sender === 'user' ? 'You' : 'Bot'}:</strong> ${chat.text}</div>`;
    }).join('');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}

// Clear Chat button functionality
clearChatButton.addEventListener('click', () => {
  const chatHistory = localStorage.getItem('chatHistory');
  if (chatHistory) {
    localStorage.setItem('chatBackup', chatHistory); // Backup chat history before clearing
  }
  chatWindow.innerHTML = '';  // Clear chat window
  localStorage.removeItem('chatHistory');  // Remove chat from localStorage
});

// Recover Chat button functionality
recoverChatButton.addEventListener('click', () => {
  const backupChat = localStorage.getItem('chatBackup');
  if (backupChat) {
    localStorage.setItem('chatHistory', backupChat); // Restore chat from backup
    loadChatHistory(); // Reload chat history to display it in the chat window
  }
});
function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== '') {
    // Append user message
    appendMessage('user', message);

    // Bot response (basic keyword-based response)
    const botResponse = getBotResponse(message);
    setTimeout(() => {
      appendMessage('bot', botResponse);
    }, 500);

    // Clear the input field
    messageInput.value = '';
  }
}

function getBotResponse(message) {
  const responses = {
    hello: 'Hi there! How can I assist you today?',
    help: 'I’m here to help! What do you need assistance with?',
    bye: 'Goodbye! Have a great day!',
  };

  // Find a response based on the keyword in the message
  for (let keyword in responses) {
    if (message.toLowerCase().includes(keyword)) {
      return responses[keyword];
    }
  }
  
  // Default response if no keywords match
  return "I'm not sure how to respond to that.";
}
