document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const newChatBtn = document.getElementById('new-chat-btn');
    const temperatureSlider = document.getElementById('temperature');
    const tempValue = document.getElementById('temp-value');
    const maxTokensSlider = document.getElementById('max-tokens');
    const tokenValue = document.getElementById('token-value');
    const messageCount = document.getElementById('message-count');
    const responseTime = document.getElementById('response-time');
    const tokenUsage = document.getElementById('token-usage');
    const authorName = document.getElementById('author-name');

    // Set your name
    authorName.textContent = 'Your Name';

    // Theme toggle
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            themeToggleBtn.classList.remove('fa-moon');
            themeToggleBtn.classList.add('fa-sun');
        } else {
            themeToggleBtn.classList.remove('fa-sun');
            themeToggleBtn.classList.add('fa-moon');
        }
    });

    // Update sliders values
    temperatureSlider.addEventListener('input', function() {
        tempValue.textContent = this.value;
    });

    maxTokensSlider.addEventListener('input', function() {
        tokenValue.textContent = this.value;
    });

    // New chat button
    newChatBtn.addEventListener('click', function() {
        clearChat();
    });

    // Send message on Enter key
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage('user', message);

        // Clear input
        userInput.value = '';

        // Update message count
        updateMessageCount();

        // Show loading indicator
        const loadingMessage = addMessage('assistant', 'Thinking...', true);

        // Start timer for response time calculation
        const startTime = Date.now();

        // Send message to backend
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                model: document.getElementById('model-select').value,
                temperature: parseFloat(temperatureSlider.value),
                max_tokens: parseInt(maxTokensSlider.value)
            })
        })
        .then(response => response.json())
        .then(data => {
            // Remove loading message
            loadingMessage.remove();

            // Add AI response to chat
            addMessage('assistant', data.response);

            // Update message count
            updateMessageCount();

            // Calculate and display response time
            const endTime = Date.now();
            responseTime.textContent = `${endTime - startTime} ms`;

            // Update token usage (would be provided by a real AI API)
            tokenUsage.textContent = `${message.length} / ${data.response.length}`;
        })
        .catch(error => {
            console.error('Error:', error);
            loadingMessage.remove();
            addMessage('system', 'Error: Failed to get a response. Please try again.');
        });
    }

    // Add message to chat
    function addMessage(role, content, isLoading = false) {
        const message = document.createElement('div');
        message.className = `message ${role}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const paragraph = document.createElement('p');
        paragraph.textContent = content;

        if (isLoading) {
            paragraph.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + content;
        }

        messageContent.appendChild(paragraph);

        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = getFormattedTime();

        message.appendChild(messageContent);
        message.appendChild(messageTime);

        chatMessages.appendChild(message);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return message;
    }

    // Clear chat
    function clearChat() {
        // Clear UI
        chatMessages.innerHTML = '';

        // Add welcome message
        addMessage('system', 'Welcome to Grand AI Interface! How can I assist you today?');

        // Reset stats
        messageCount.textContent = '1';
        responseTime.textContent = '0 ms';
        tokenUsage.textContent = '0 / 0';

        // Clear backend history
        fetch('/api/clear', {
            method: 'POST'
        });
    }

    // Update message count
    function updateMessageCount() {
        const count = document.querySelectorAll('.message').length;
        messageCount.textContent = count;
    }

    // Get formatted time
    function getFormattedTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
});