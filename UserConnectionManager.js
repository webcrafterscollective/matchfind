// UserConnectionManager.js

class UserConnectionManager {
    constructor() {
        // In a real application, this would interface with a database
        this.connections = {}; // Key: User ID, Value: Array of connected User IDs
    }

    // Add a connection between two users
    addConnection(userId, friendId) {
        if (!this.connections[userId]) {
            this.connections[userId] = [];
        }
        if (!this.connections[userId].includes(friendId)) {
            this.connections[userId].push(friendId);
        }

        // Optionally, add the reverse connection as well
        if (!this.connections[friendId]) {
            this.connections[friendId] = [];
        }
        if (!this.connections[friendId].includes(userId)) {
            this.connections[friendId].push(userId);
        }
    }

    // Remove a connection between two users
    removeConnection(userId, friendId) {
        this.connections[userId] = this.connections[userId].filter(id => id !== friendId);
        this.connections[friendId] = this.connections[friendId].filter(id => id !== userId);
    }

    // Check if two users are connected
    isConnected(userId, friendId) {
        return this.connections[userId] && this.connections[userId].includes(friendId);
    }
}

module.exports = UserConnectionManager;
