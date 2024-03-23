const request = require('supertest');
const app = require('./server');

describe('MatchFinder API', () => {
    describe('POST /addUser', () => {
        it('should add a new user and return a success message', async () => {
            const newUser = {
                id: '1',
                name: 'Alice',
                interest: 'music, reading',
            };
            
            const response = await request(app)
                .post('/addUser')
                .send(newUser)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toEqual({ message: 'User added successfully' });
        });
    });

    describe('GET /findMatches/:userId', () => {
        it('should return matches for the specified user', async () => {
            const userId = '1'; 
            const response = await request(app)
                .get(`/findMatches/${userId}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /findMatchesPerPreferences', () => {
        it('should return matches based on specified preferences', async () => {
            const requestBody = {
                userId: '1',
                preferences: {
                    interest: true
                    
                }
            };
            const response = await request(app)
                .post('/findMatchesPerPreferences')
                .send(requestBody)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
        });
    });

   
});

