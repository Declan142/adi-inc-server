const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Adi Inc Chat Server is running!',
        endpoints: {
            health: '/api/health',
            messages: '/api/messages',
            chat: 'POST /api/chat'
        }
    });
});

// Store messages
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Initialize messages file
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
}

// Get all messages
app.get('/api/messages', (req, res) => {
    try {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read messages' });
    }
});

// Send new message
app.post('/api/chat', (req, res) => {
    try {
        const { message, user = 'anonymous' } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message required' });
        }

        // Read existing messages
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        
        // Add new message
        const newMessage = {
            id: Date.now(),
            user,
            message,
            timestamp: new Date().toISOString(),
            read: false
        };
        
        messages.push(newMessage);
        
        // Save (keep last 100 messages)
        if (messages.length > 100) {
            messages.shift();
        }
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
        
        // Log to console (for debugging)
        console.log(`[${new Date().toLocaleTimeString()}] ${user}: ${message}`);
        
        res.json({ 
            success: true, 
            id: newMessage.id,
            reply: "Message received! I'll get back to you soon."
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Chat server running on port ${PORT}`);
    console.log(`📁 Messages stored in: ${MESSAGES_FILE}`);
});
