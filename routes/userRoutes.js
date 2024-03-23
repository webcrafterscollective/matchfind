// routes/userRoutes.js

const express = require('express');
const User = require('../User');
const MatchFinder = require('../MatchFinder'); 
const UserConnectionManager = require('../UserConnectionManager'); 
const router = express.Router();

const matchFinder = new MatchFinder();
const connectionManager = new UserConnectionManager();

router.post('/addUser', async (req, res) => {
    try {
        const newUser = new User(req.body);
        matchFinder.addUser(newUser);
        return res.status(201).json({ message: 'User added successfully.' });
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ message: 'Failed to add user due to an error.' });
    }
});

router.get('/findMatches/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const matches = matchFinder.findMatchesForUser(userId);
        return res.status(200).json(matches);
    } catch (error) {
        console.error('Error finding matches for user:', error);
        return res.status(500).json({ message: 'Failed to find matches due to an error.' });
    }
});

router.post('/findMatchesPerPreferences', async (req, res) => {
    try {
        const { userId, preferences } = req.body;
        const allUsers = Object.values(matchFinder.users);
        const matches = matchFinder.findMatchesForUserPerPreferences(userId, allUsers, preferences);
        return res.status(200).json(matches);
    } catch (error) {
        console.error('Error finding matches per preferences:', error);
        return res.status(500).json({ message: 'Failed to find matches per preferences due to an error.' });
    }
});

router.post('/calculateMatchScore', async (req, res) => {
    try {
        const { user1, user2 } = req.body;
        const score = matchFinder.calculateMatchScore(user1, user2);
        return res.status(200).json({ score });
    } catch (error) {
        console.error('Error calculating match score:', error);
        return res.status(500).json({ message: 'Failed to calculate match score due to an error.' });
    }
});

router.post('/calculateMatchScorePerPreferences', async (req, res) => {
    try {
        const { user1, user2, preferences } = req.body;
        const score = matchFinder.calculateMatchScorePerPreferences(user1, user2, preferences);
        return res.status(200).json({ score });
    } catch (error) {
        console.error('Error calculating match score per preferences:', error);
        return res.status(500).json({ message: 'Failed to calculate match score per preferences due to an error.' });
    }
});

router.post('/addConnection', async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        if (!userId || !friendId) {
            return res.status(400).json({ message: 'Both userId and friendId are required.' });
        }

        connectionManager.addConnection(userId, friendId);
        return res.status(200).json({ message: `Connection added between ${userId} and ${friendId}.` });
    } catch (error) {
        console.error('Error adding connection:', error);
        return res.status(500).json({ message: 'Failed to add connection due to an error.' });
    }
});

module.exports = router;
