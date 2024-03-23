// MatchFinder.js

class MatchFinder {
    constructor() {
        this.users = {}; // key: userId, value: User instance
        this.edges = {}; // key: userId, value: array of {userId, score} pairs
    }

    /**
     * Adds a new user to the MatchFinder instance.
     * @param {Object} user - The user object to be added, must contain an 'id' property.
     */
    addUser(user) {
        if (this.users[user.id]) return;
        this.users[user.id] = user;
        this.edges[user.id] = [];
    }

    /**
     * Calculates the match score between two users based on multiple criteria.
     * @param {Object} user1 - The first user object.
     * @param {Object} user2 - The second user object.
     * @returns {number} The match score between the two users.
     */
    calculateMatchScore(user1, user2) {
        let score = 0;
        // Defined fields and their corresponding weights
        const fieldsWithWeights = {
            'interest': 10,
            'languageKnown': 10,
            'communicationStyle': 5,
            'loveStyle': 5,
            'education': 15,
            'relationshipGoal': 15,
        };

        // Calculate score based on common fields
        for (const [field, weight] of Object.entries(fieldsWithWeights)) {
            score += this.calculateFieldScore(user1, user2, field, weight);
        }


        score += this.calculateAgeDifferenceScore(user1, user2, 'age', 20, 5);
        score += this.calculateSimpleEqualityScore(user1, user2, ['religion', 'zodiac', 'liveIn', 'gender', 'covidVaccineStatus', 'bloodGroup'], [10, 5, 20, 10, 10, 5]);
        score += this.calculateAboutMeScore(user1, user2, 'aboutMe', 10);

        return score;
    }

    /**
     * Finds matches for a user and calculates the match scores.
     * @param {string} userId - The ID of the user for whom to find matches.
     * @returns {Array} An array of objects containing the user ID and match score.
     */
    findMatchesForUser(userId) {
        const matches = [];
        const user = this.users[userId];
        if (!user) return matches;

        Object.entries(this.users).forEach(([otherUserId, otherUser]) => {
            if (userId === otherUserId) return;
            const score = this.calculateMatchScore(user, otherUser);
            if (score > 0) {
                this.edges[userId].push({ userId: otherUserId, score });
                matches.push({ userId: otherUserId, score });
            }
        });

        return matches.sort((a, b) => b.score - a.score);
    }


    /**
 * Calculates the match score between two users based on the given preferences.
 * The score is computed by evaluating specified fields (interests, education, etc.) in the preferences object.
 * Fields that match between the two users contribute to the total score, with some fields weighted differently.
 * 
 * @param {Object} user1 - The first user object.
 * @param {Object} user2 - The second user object.
 * @param {Object} preferences - The preferences object indicating which fields to consider and their importance.
 * @returns {number} The total match score based on the preferences.
 */
    calculateMatchScorePerPreferences(user1, user2, preferences) {
        let score = 0;

        const fieldsWithWeights = {
            'interest': 10,
            'languageKnown': 10,
            'communicationStyle': 5,
            'loveStyle': 5,
            'education': 15,
            'relationshipGoal': 15,
        };

        // Dynamically checks each preference and adjusts the score based on a matching condition.
        Object.keys(preferences).forEach(prefKey => {
            switch (prefKey) {
                case 'interest':
                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    score += this.calculateFieldScore(user1, user2, prefKey, fieldsWithWeights[prefKey]);
                    break;
                case 'education':
                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    score += this.calculateFieldScore(user1, user2, prefKey, fieldsWithWeights[prefKey]);
                    break;
                case 'religion':
                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    if (user1[prefKey] === user2[prefKey]) score += this.getFixedScoreForPreference(prefKey);
                    break;
                case 'zodiac':
                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    if (user1[prefKey] === user2[prefKey]) score += this.getFixedScoreForPreference(prefKey);
                    break;
                case 'gender':
                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    if (user1[prefKey] === user2[prefKey]) score += this.getFixedScoreForPreference(prefKey);
                    break;
                case 'covidVaccineStatus':
                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    if (user1[prefKey] === user2[prefKey]) score += this.getFixedScoreForPreference(prefKey);
                    break;
                case 'bloodGroup':

                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    if (user1[prefKey] === user2[prefKey]) score += this.getFixedScoreForPreference(prefKey);
                    break;
                case 'live_in':
                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    if (user1[prefKey] === user2[prefKey]) score += this.getFixedScoreForPreference(prefKey);
                    break;
                case 'about_me':
                    if (!MatchFinder.doesFieldExist(user1, user1, prefKey)) break;
                    score += this.calculateAboutMeScore(user1, user2, 'aboutMe', 10);
                    break;
                case 'languageKnown':
                    score += this.calculateFieldScore(user1, user2, prefKey, fieldsWithWeights[prefKey]);
                    break;
                case 'communicationStyle':
                    score += this.calculateFieldScore(user1, user2, prefKey, fieldsWithWeights[prefKey]);
                    break;
                case 'loveStyle':
                    score += this.calculateFieldScore(user1, user2, prefKey, fieldsWithWeights[prefKey]);
                    break;
                case 'relationshipGoal':
                    score += this.calculateFieldScore(user1, user2, prefKey, this.getWeightForPreference(prefKey));
                    break;
            }
        });

        return score;
    }

    /**
     * Returns a fixed score value for a given preference based on its importance.
     * This is a helper method used within the preference scoring switch statement.
     * 
     * @param {string} preferenceKey - The preference key (e.g., 'religion', 'zodiac').
     * @returns {number} The fixed score assigned to the preference.
     */
    getFixedScoreForPreference(preferenceKey) {
        const scoreMapping = {
            religion: 10,
            zodiac: 5,
            gender: 10,
            covidVaccineStatus: 10,
            bloodGroup: 5,
            liveIn: 20,
        };
        return scoreMapping[preferenceKey] || 0;
    }

    /**
     * Returns the weight value for calculating scores of certain preferences.
     * This is used for preferences where calculating the score involves more than a direct comparison.
     * 
     * @param {string} preferenceKey - The preference key (e.g., 'languageKnown', 'communicationStyle').
     * @returns {number} The weight used in the score calculation for the preference.
     */
    getWeightForPreference(preferenceKey) {
        const weightMapping = {
            languageKnown: 10,
            communicationStyle: 5,
            loveStyle: 5,
            relationshipGoal: 15,
            // Other preferences can be added here as necessary.
        };
        return weightMapping[preferenceKey] || 0;
    }

    /**
   * Finds matches for a user based on their preferences, considering the entire user base.
   * @param {string} userId - The ID of the user for whom to find matches.
   * @param {Object} preferences - The user's preferences for matching.
   * @returns {Array} An array of objects containing the user ID and match score of potential matches.
   */
    findMatchesForUserPerPreferences(userId, preferences) {
        const currentUser = this.users[userId];
        if (!currentUser) {
            console.warn(`User with ID ${userId} not found.`);
            return [];
        }

        let matches = Object.values(this.users)
            .filter(user => user.id !== userId)
            .map(potentialMatch => {
                const score = this.calculateMatchScorePerPreferences(currentUser, potentialMatch, preferences);
                return { userId: potentialMatch.id, score };
            })
            .filter(match => match.score > 0)
            .sort((a, b) => b.score - a.score);

        return matches;
    }

    /**
    * Calculates the number of common elements between two comma-separated strings.
    * This is a helper method used in calculateFieldScore.
    * @param {string} str1 - The first comma-separated string.
    * @param {string} str2 - The second comma-separated string.
    * @returns {Array} An array containing the common elements found in both strings.
    */
    static findCommonElementsFromCommaSeparatedStrings(str1, str2) {
        const arr1 = str1?.split(',').map(item => item.trim()).filter(item => item) || [];
        const arr2 = str2?.split(',').map(item => item.trim()).filter(item => item) || [];
        return arr1.filter(item => arr2.includes(item));
    }

    /**
     * Dynamically calculates the score for a given field based on the common elements and their weight.
     * @param {Object} user1 - The first user object.
     * @param {Object} user2 - The second user object.
     * @param {string} fieldName - The name of the field to calculate the score for.
     * @param {number} weight - The weight assigned to each common element found.
     * @returns {number} The calculated score based on common elements in the specified field.
     */
    calculateFieldScore(user1, user2, fieldName, weight) {
        if (!MatchFinder.doesFieldExist(user1, user2, fieldName)) {
            return 0;
        }

        const commonElements = MatchFinder.findCommonElementsFromCommaSeparatedStrings(user1[fieldName], user2[fieldName]);
        return commonElements.length * weight;
    }

/**
 * Calculates a score based on the "about me" sections of two users.
 * The score encourages users to provide more detailed "about me" texts.
 * Note: This is a basic implementation. 
 * @param {string} user1.aboutMe - The "about me" section of the first user.
 * @param {string} user2.aboutMe - The "about me" section of the second user.
 * @param {number} maxScore - The maximum score to assign for perfectly matching texts.
 * @returns {number} The calculated score based on the "about me" text similarity.
 */
    calculateAboutMeScore(user1, user2, fieldName, maxScore) {
        if (!MatchFinder.doesFieldExist(user1, user2, fieldName)) {
            return 0;
        }
        if (!user1.aboutMe || !user2.aboutMe) return 0; // Return 0 if either user has no "about me" text

        // Normalize the texts: trim whitespace and convert to lower case for basic comparison
        const normalizedAboutMe1 = user1.aboutMe.trim().toLowerCase();
        const normalizedAboutMe2 = user2.aboutMe.trim().toLowerCase();

        // Calculate length similarity as a simple proxy for content similarity
        const lengthScore = Math.min(normalizedAboutMe1.length, normalizedAboutMe2.length) / Math.max(normalizedAboutMe1.length, normalizedAboutMe2.length);

        // Calculate final score (scaled by the maxScore parameter)
        const score = lengthScore * maxScore;

        return score;
    }
    /**
     * Helper method to calculate the match score based on the age difference.
     * @param {number} age1 - Age of the first user.
     * @param {number} age2 - Age of the second user.
     * @param {number} maxScore - The maximum score to assign if the condition is met.
     * @param {number} maxDiff - The maximum allowed age difference to receive the maxScore.
     * @returns {number} The calculated age difference score.
     */
    calculateAgeDifferenceScore(user1, user2, fieldName, maxScore, maxDiff) {
        if (!MatchFinder.doesFieldExist(user1, user2, fieldName)) {
            return 0;
        }
        const ageDifference = Math.abs(user1.age - user2.age);
        return ageDifference <= maxDiff ? maxScore : 0;
    }

/**
 * Calculates score based on simple equality checks for specified fields and their weighing factors.
 * @param {Object} user1 - The first user object.
 * @param {Object} user2 - The second user object.
 * @param {Array} fields - An array of strings representing the fields to be checked for equality.
 * @param {Array} weighingFactors - An array of numbers representing the weighing factors corresponding to each field.
 * @returns {number} The total score based on simple equality of specified fields, weighted by the specified factors.
 */
    calculateSimpleEqualityScore(user1, user2, fields, weighingFactors) {
        let totalScore = 0;

        for (let index = 0; index < fields.length; index++) {
            const field = fields[index];
            if (!MatchFinder.doesFieldExist(user1, user2, field)) {
                continue;
            }
            console.log(field);
            console.log(user1[field], user2[field]);
            const isMatch = user1[field] === user2[field];
            totalScore += isMatch ? weighingFactors[index] : 0;
        }

        return totalScore;
    }

    static doesFieldExist(user1, user2, field) {
        return user1.hasOwnProperty(field) || user2.hasOwnProperty(field);
    }



}

module.exports = MatchFinder;