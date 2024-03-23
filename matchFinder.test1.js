// matchFinder.test.js
const MatchFinder = require('./MatchFinder');

describe('MatchFinder functionality', () => {
  let matchFinder;

  beforeEach(() => {
    matchFinder = new MatchFinder();
  });

  describe('addUser', () => {
    it('should add a new user: <as simple object> // noile hobe na', () => {
      const newUser = { id: '1', name: 'John Doe' };
      matchFinder.addUser(newUser);
      expect(Object.keys(matchFinder.users)).toContain(newUser.id);
    });

    it('should not add a user if the user already exists', () => {
      const newUser = { id: '1', name: 'John Doe' };
      matchFinder.addUser(newUser);
      expect(Object.keys(matchFinder.users).length).toBe(1);
      // add the same user again
      matchFinder.addUser(newUser);

      // User Count Same Thakbe
      expect(Object.keys(matchFinder.users).length).toBe(1);
      /**
       * add user method does not add anything to db
       * it loads user via match finding contructor
       * so that it can generate matches
       * ekhane test korlam
       * user add hoche kina + 
       * eki user bar bar add jeno na hoy
       */
    });
  });

  describe('findMatches', () => {
    beforeEach(() => {
      // Setting up some users 
      matchFinder.addUser({ id: '1', name: 'John Doe', interest: 'music, sports' });
      matchFinder.addUser({ id: '2', name: 'Jane Doe', interest: 'music, art' });
      matchFinder.addUser({ id: '3', name: 'Jim Bean', interest: 'cooking, cricket' });
    });
    // here, we are going to test using one field interest.
    // field name ta interests dite hoto, but ekbar interest die
    // case hoye geche 
    it('should find matches based on interest', () => {
        const matchesForJohn = matchFinder.findMatchesForUser('1');
        const matchUserIds = matchesForJohn.map(match => match.userId); // Extracting userIds from the match objects
        expect(matchUserIds).toContain('2'); // Checks if the array of userIds contains '2'
        expect(matchUserIds).not.toContain('3');
      });
      
    it('should return an empty array if no matches are found', () => {
     
      matchFinder.addUser({ id: '4', name: 'Unique User', interest: 'unique' });
      const matchesForUnique = matchFinder.findMatchesForUser('4');
      expect(matchesForUnique).toEqual([]);

      // eta edge case, user register korar por, first go tei kono 
      // match nei
      // sad 
    });
  });

  
describe('calculateMatchScorePerPreferences', () => {
    let matchFinder;

    beforeEach(() => {
       
        matchFinder = new MatchFinder();

        // Add test users
        matchFinder.addUser({ 
            id: '1', 
            name: 'Alice', 
            interest: 'music,reading', 
            education: 'University', 
            religion: 'None',
            zodiac: 'Aquarius',
            gender: 'Female',
            covidVaccineStatus: 'Vaccinated',
            bloodGroup: 'O+',
            liveIn: 'CityA',
            aboutMe: 'Loves music and reading',
            languageKnown: 'English,Spanish',
            communicationStyle: 'Direct',
            loveStyle: 'Quality Time',
            relationshipGoal: 'Long-term'
        });
        matchFinder.addUser({ 
            id: '2', 
            name: 'Bob', 
            interest: 'music,sports', 
            education: 'University', 
            religion: 'None',
            zodiac: 'Virgo',
            gender: 'Male',
            covidVaccineStatus: 'Vaccinated',
            bloodGroup: 'A+',
            liveIn: 'CityB',
            aboutMe: 'Sports enthusiast',
            languageKnown: 'English,French',
            communicationStyle: 'Open',
            loveStyle: 'Acts of Service',
            relationshipGoal: 'Short-term'
        });
    });

    it('should calculate correct match score based on specified preferences', () => {
        const preferences = {
            interest: true,
            education: true,
            religion: true,
            zodiac: true,
            gender: true,
            covidVaccineStatus: true,
            bloodGroup: true,
            live_in: true,
            about_me: true,
            languageKnown: true,
            communicationStyle: true,
            loveStyle: true,
            relationshipGoal: true
        };

        const score = matchFinder.calculateMatchScorePerPreferences(matchFinder.users['1'], matchFinder.users['2'], preferences);

        // manually calculate, jibon andhokar ... !
        // egulo satyi POC level e kora jay na
        let expectedScore = 0;
        expectedScore += 10; // interests match partially
        expectedScore += 15; // education match
        expectedScore += 10; // religion match
      
        expectedScore += 10; // covidVaccineStatus match
      
        expectedScore += 10; // languageKnown partially matches
      

        expect(score).toEqual(expectedScore);
    });

   
});

describe('findMatchesForUserPerPreferences', () => {
    let matchFinder;

    beforeEach(() => {
       
        matchFinder = new MatchFinder();

        
        matchFinder.addUser({
            id: '1',
            name: 'Alice',
            interest: 'music, reading',
           
        });
        matchFinder.addUser({
            id: '2',
            name: 'Bob',
            interest: 'music, sports',
           
        });
        matchFinder.addUser({
            id: '3',
            name: 'Charlie',
            interest: 'art, sports',
            
        });
       
    });

    it('should find matches based on interest preference only', () => {
        // payload
        const preferences = {
            interest: true,
           // ekhaneo ekta field
           // POC 
        };
        
        
        const matches = matchFinder.findMatchesForUserPerPreferences('1', preferences);
        
       // Bob asbe, Bob match
        expect(matches).toEqual(expect.arrayContaining([
            expect.objectContaining({ userId: '2' }) // Expect Bob to be a match
        ]));

        // Charlie Thakbe na, Charlie nay
        expect(matches).not.toEqual(expect.arrayContaining([
            expect.objectContaining({ userId: '3' }) // Expect Charlie to not be a match
        ]));

        // sobtai on the basis of preferences. done
    });

    
});



});
