const request = require('supertest');
const app = require('../app');

let data = {
    "firstName": "test",
    "lastName": "test2",
    "email": "test@test.com",
    "password": "test123",
    "userType": "attendee"
}

test('should sign up for a user', async() => {
    await request(app)
        .post('/')
        .set('content-type', 'multipart/form-data')
        .send(JSON.stringify(data))
        .expect(201)
});