const ChatManager = require('./ChatManager');
const WebSocket = require('ws');


// Mocks
class MockWebSocket {
    constructor() {
        this.readyState = WebSocket.OPEN;
        this.send = jest.fn();
        this.close = jest.fn();
        // Adding event listeners map to store callbacks for different events
        this.eventListeners = {
            message: [],
            close: []
        };
    }

    // Mock 'on' method to register event listeners
    on(event, callback) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].push(callback);
        }
    }

    // Utility method to trigger registered event callbacks, useful for testing
    trigger(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => callback(data));
        }
    }
}


const mockServer = { on: jest.fn() };
const mockReq = { headers: { 'x-user-id': 'user1' } };
let mockSocket;
const userManagerMock = {
    getUserById: jest.fn()
};
const connectionManagerMock = {
    isConnected: jest.fn()
};

beforeEach(() => {
    mockSocket = new MockWebSocket();
    userManagerMock.getUserById.mockClear();
    connectionManagerMock.isConnected.mockClear();
    mockServer.on.mockClear();
});

describe('ChatManager - Chat Functionality', () => {
    it('should allow users to chat when they are connected', () => {
        userManagerMock.getUserById.mockImplementation((id) => {
            if (id === 'user1' || id === 'user2') {
                return { id, socketId: mockSocket };
            }
            return null;
        });
        connectionManagerMock.isConnected.mockReturnValue(true);

        const chatManager = new ChatManager(mockServer, userManagerMock, connectionManagerMock);
        chatManager.handleNewConnection(mockSocket, mockReq);

        const message = { receiverId: 'user2', message: 'Hello, User 2!' };
        chatManager.handleMessage('user1', JSON.stringify(message));

        expect(mockSocket.send).toHaveBeenCalledWith(JSON.stringify({ senderId: 'user1', message: 'Hello, User 2!' }));
    });

    it('should not allow users to chat when they are not connected', () => {
        userManagerMock.getUserById.mockImplementation((id) => {
            if (id === 'user1' || id === 'user3') {
                return { id, socketId: mockSocket };
            }
            return null;
        });
        connectionManagerMock.isConnected.mockReturnValue(false);

        const chatManager = new ChatManager(mockServer, userManagerMock, connectionManagerMock);
        chatManager.handleNewConnection(mockSocket, mockReq);

        const message = { receiverId: 'user3', message: 'Hello, User 3!' };
        chatManager.handleMessage('user1', JSON.stringify(message));

        expect(mockSocket.send).toHaveBeenCalledWith(JSON.stringify({ error: 'You can only chat with connected users.' }));
    });
});
