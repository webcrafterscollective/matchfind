// index.js
const http = require('http'); 
const WebSocket = require('ws');
const app = require('./server'); 
const ChatManager = require('./ChatManager');
const UserManager = require('./UserManager');
const UserConnectionManager = require('./UserConnectionManager');

// Instantiate managers
const userManager = new UserManager();
const connectionManager = new UserConnectionManager();
const server = http.createServer(app);

// Create and setup the WebSocket server
const wss = new WebSocket.Server({ server });
wss.on('connection', function connection(ws) {
    console.log('A new client connected');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('Welcome!');
});

// Correctly instantiate ChatManager here
const chatManager = new ChatManager(wss, userManager, connectionManager); 

// Listen on the HTTP server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port}`);
});

