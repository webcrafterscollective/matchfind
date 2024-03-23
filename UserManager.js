class UserManager {
    constructor() {
        this.users = {}; // Key: User ID, Value: User object
    }

    // Add a new user or update an existing user
    addUser(user) {
        if (!user || !user.id) {
            throw new Error("Invalid user object or missing user ID.");
        }
        this.users[user.id] = user;
    }

    // Retrieve a user by their ID
    getUserById(userId) {
        return this.users[userId];
    }

    // Remove a user by their ID
    removeUser(userId) {
        if (this.users[userId]) {
            delete this.users[userId];
        } else {
            throw new Error("User not found.");
        }
    }

    // Update user data
    updateUser(userId, updates) {
        const user = this.users[userId];
        if (!user) {
            throw new Error("User not found.");
        }
        // Iterate over the keys of the updates object and update the user object
        Object.keys(updates).forEach(key => {
            user[key] = updates[key];
        });
    }

    // List all users (you might want to limit or paginate this in a real app)
    listUsers() {
        return Object.values(this.users);
    }
}

module.exports = UserManager;

