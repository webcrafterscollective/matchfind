// User.js

// eta holo User model..
class User {
    constructor(user) {
        this.id = user.user;
        this.username = user.username;
        this.age = user.age;
        this.height = user.height;
        this.weight = user.weight;
        this.dob = user.dob;
        this.gender = user.gender;
        this.relationshipGoal = user.relationship_goal; 
        this.findMatchesNearby = user.find_matches_nearby; 
        this.discoverLikeMindedPeople = user.discover_like_minded_people;
        this.nickname = user.nickname;
        this.jobTitle = user.jobtitle; 
        this.company = user.company;
        this.school = user.school;
        this.liveIn = user.live_in; 
        this.aboutMe = user.about_me; 
        this.interest = user.interest;
        this.socialLinks = {
            facebook: user.facebook_link, 
            instagram: user.insta_link,
            tiktok: user.tiktok_link,
            linkedin: user.linkedin_link
        };
        this.languageKnown = user.language_known; 
        this.religion = user.religion;
        this.zodiac = user.zodiac;
        this.education = user.education;
        this.familyPlan = user.family_plan; 
        this.covidVaccineStatus = user.covid_vaccine_status; 
        this.communicationStyle = user.communication_style; 
        this.loveStyle = user.love_style; 
        this.bloodGroup = user.blood_group; 
        this.status = user.status; // online, offline, away
        this.lastSeen = user.lastSeen;
        this.socketId = user.socketId; // To manage real-time connections
        this.connections = user.connections || []; 
    }
}

module.exports = User;
