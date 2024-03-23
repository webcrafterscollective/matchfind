// ChatManager.js

const WebSocket = require('ws');

/**
 * Manages chat connections and messaging for users over WebSocket.
 */
class ChatManager {
    /**
     * Initializes the chat manager with a server, user manager, and connection manager.
     * 
     * @param {Object} server - The server on which the WebSocket server will be based.
     * @param {Object} userManager - Manages user data and operations.
     * @param {Object} connectionManager - Manages user connections.
     */
    constructor(server, userManager, connectionManager) {
        this.wss = new WebSocket.Server({ server });
        this.userManager = userManager;
        this.connectionManager = connectionManager;

        this.wss.on('connection', (ws, req) => this.handleNewConnection(ws, req));
    }

    /**
     * Handles new WebSocket connections.
     * 
     * @param {Object} ws - The WebSocket connection instance.
     * @param {Object} req - The request object.
     */
    handleNewConnection(ws, req) {
        const userId = this.getUserIdFromRequest(req);
        const user = this.userManager.getUserById(userId);

        if (!user) {
            ws.close(); // Close connection if user is not found
            return;
        }

        user.socketId = ws;
        this.setUpConnectionHandlers(ws, user);
    }

    /**
     * Sets up message and close event handlers for a WebSocket connection.
     * 
     * @param {Object} ws - The WebSocket connection instance.
     * @param {Object} user - The user associated with the connection.
     */
    setUpConnectionHandlers(ws, user) {
        ws.on('message', (message) => this.handleMessage(user.id, message));
        ws.on('close', () => this.handleClose(user.id));
        ws.send(JSON.stringify({ message: 'Welcome to the chat!' }));
        // Handle WebRTC signaling messages
        ws.on('message', (message) => this.handleSignalingMessage(user.id, message));
    }

    /**
     * Handles incoming messages from a user.
     * 
     * @param {string} userId - The ID of the user sending the message.
     * @param {string} message - The message payload.
     */
    handleMessage(userId, message) {
        const { receiverId, message: messageText } = JSON.parse(message);
        const sender = this.userManager.getUserById(userId);
        const receiver = this.userManager.getUserById(receiverId);

        if (!sender || !receiver) {
            console.error('Invalid sender or receiver.');
            return;
        }

        if (!this.connectionManager.isConnected(userId, receiverId)) {
            sender.socketId.send(JSON.stringify({ error: 'You can only chat with connected users.' }));
            return;
        }

        if (!receiver.socketId || receiver.socketId.readyState !== WebSocket.OPEN) {
            console.error('Receiver socket is not open.');
            return;
        }

        receiver.socketId.send(JSON.stringify({ senderId: userId, message: messageText }));
    }

     /**
     * Handles WebRTC signaling messages.
     * 
     * @param {string} userId - The ID of the sender.
     * @param {string} message - The signaling message payload.
     */
     handleSignalingMessage(userId, message) {
        try {
            const signal = JSON.parse(message);
            if (signal.type !== 'signaling') {
                return; // Not a signaling message, ignore it
            }

            const { targetId, data } = signal;
            const targetUser = this.userManager.getUserById(targetId);

            // Verify that both the sender and receiver are connected
            if (!targetUser || !this.connectionManager.isConnected(userId, targetId)) {
                console.error('Signaling failed: users not connected or target user not found.');
                return;
            }

            // Relay the signaling message to the target user
            if (targetUser.socketId && targetUser.socketId.readyState === WebSocket.OPEN) {
                targetUser.socketId.send(JSON.stringify({ senderId: userId, type: 'signaling', data: data }));
            } else {
                console.error('Target user socket is not open.');
            }
        } catch (error) {
            console.error('Failed to handle signaling message:', error);
        }
    }

    /**
     * Cleans up after a WebSocket connection is closed.
     * 
     * @param {string} userId - The ID of the user whose connection was closed.
     */
    handleClose(userId) {
        const user = this.userManager.getUserById(userId);
        if (user) {
            user.socketId = null;
            console.log(`User ${userId} disconnected.`);
        }
    }

    /**
     * Extracts the user ID from the request headers.
     * 
     * @param {Object} req - The request object.
     * @returns {string|null} The user ID or null if not found.
     */
    getUserIdFromRequest(req) {
        return req.headers['x-user-id'] || null;
    }
}

module.exports = ChatManager;
