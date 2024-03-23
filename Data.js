const User = require('./User');
const users = [
   new User({
        user: "1",
        username: "AlexDoe",
        age: 29,
        height: 175,
        weight: 70,
        dob: "1994-05-16",
        gender: "male",
        relationship_goal: "long-term",
        find_matches_nearby: true,
        discover_like_minded_people: true,
        nickname: "Alex",
        jobtitle: "Software Engineer",
        company: "Tech Solutions Inc.",
        school: "State University",
        live_in: "New York",
        about_me: "A tech enthusiast who loves to explore new places.",
        interest: "Hiking, coding, reading",
        facebook_link: "",
        insta_link: "https://instagram.com/alexd",
        tiktok_link: "",
        linkedin_link: "https://linkedin.com/in/alexd",
        language_known: "English",
        religion: "Non-religious",
        zodiac: "Taurus",
        education: "Bachelor's",
        family_plan: "Wants kids",
        covid_vaccine_status: "Vaccinated",
        communication_style: "Direct",
        love_style: "Words of affirmation",
        blood_group: "O+",
    }),
    new User({
        user: "2",
        username: "EvaGreen",
        age: 27,
        height: 165,
        weight: 55,
        dob: "1996-02-24",
        gender: "female",
        relationship_goal: "long-term",
        find_matches_nearby: true,
        discover_like_minded_people: true,
        nickname: "Eva",
        jobtitle: "Graphic Designer",
        company: "Creative Minds LLC",
        school: "Design Institute",
        live_in: "New York",
        about_me: "Passionate about art, design, and environmental advocacy.",
        interest: "Art, environmentalism, yoga, reading",
        facebook_link: "",
        insta_link: "https://instagram.com/evagreen",
        tiktok_link: "",
        linkedin_link: "https://linkedin.com/in/evagreen",
        language_known: "English, French",
        religion: "Buddhist",
        zodiac: "Pisces",
        education: "Bachelor's",
        family_plan: "Undecided",
        covid_vaccine_status: "Vaccinated",
        communication_style: "Thoughtful",
        love_style: "Quality time",
        blood_group: "A+",
    }),
    new User({
        user: "3",
        username: "JohnSmith",
        age: 31,
        height: 182,
        weight: 80,
        dob: "1992-08-10",
        gender: "male",
        relationship_goal: "long-term",
        find_matches_nearby: true,
        discover_like_minded_people: true,
        nickname: "John",
        jobtitle: "Marketing Specialist",
        company: "Global Ads Inc.",
        school: "Metropolitan College",
        live_in: "New York",
        about_me: "I love marketing, networking, and mountain biking.",
        interest: "Biking, traveling, music, reading",
        facebook_link: "",
        insta_link: "https://instagram.com/johns",
        tiktok_link: "",
        linkedin_link: "https://linkedin.com/in/johnsmith",
        language_known: "English, Spanish",
        religion: "Christian",
        zodiac: "Leo",
        education: "Master's",
        family_plan: "Wants kids",
        covid_vaccine_status: "Vaccinated",
        communication_style: "Open",
        love_style: "Acts of service",
        blood_group: "B+",
    }),
    new User({
        user: "4",
        username: "SaraLime",
        age: 25,
        height: 160,
        weight: 50,
        dob: "1998-11-30",
        gender: "female",
        relationship_goal: "short-term",
        find_matches_nearby: true,
        discover_like_minded_people: true,
        nickname: "Sara",
        jobtitle: "Content Creator",
        company: "Freelancer",
        school: "City College",
        live_in: "Los Angeles",
        about_me: "Digital nomad exploring the world and sharing my adventures.",
        interest: "Traveling, vlogging, surfing",
        facebook_link: "",
        insta_link: "https://instagram.com/saralime",
        tiktok_link: "https://tiktok.com/@saralime",
        linkedin_link: "",
        language_known: "English",
        religion: "Agnostic",
        zodiac: "Sagittarius",
        education: "Bachelor's",
        family_plan: "Does not want kids",
        covid_vaccine_status: "Vaccinated",
        communication_style: "Casual",
        love_style: "Receiving gifts",
        blood_group: "AB+",
    }),
    new User({
        user: "5",
        username: "NoMatchUser",
        age: 40,
        height: 170,
        weight: 75,
        dob: "1983-04-01",
        gender: "male",
        relationship_goal: "friendship",
        find_matches_nearby: false,
        discover_like_minded_people: false,
        nickname: "NMUser",
        jobtitle: "Data Analyst",
        company: "Insight Data Inc.",
        school: "Tech University",
        live_in: "San Francisco",
        about_me: "Analytical mind, passionate about data and a lover of classical music.",
        interest: "Classical music, chess, data science",
        facebook_link: "",
        insta_link: "",
        tiktok_link: "",
        linkedin_link: "https://linkedin.com/in/nomatchuser",
        language_known: "English",
        religion: "Non-religious",
        zodiac: "Aries",
        education: "Ph.D.",
        family_plan: "Does not want kids",
        covid_vaccine_status: "Not Vaccinated",
        communication_style: "Analytical",
        love_style: "Words of affirmation",
        blood_group: "O-",
    })
];

module.exports = users;
