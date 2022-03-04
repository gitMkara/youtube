const request = require('supertest');
const database = require('../database/database.mongodb');
const app = require('../app');

const fakeUser = {username: 'fake', password: '123'};

describe('Test API', () => {
  beforeAll(async () => {
    await database.connect();
  }, 10000);
  afterAll(async () => {
    await database.disconnect();
  });

  describe('User CRUD Test', () => {
    test('Should Register an User', async () => {
      const response = await request(app)
        .post('/api/user/register')
        .set('Accept', 'application/json')
        .send({username: fakeUser.username, password: fakeUser.password});

      if (
        response.error.text &&
        JSON.parse(response.error.text).code == 11000
      ) {
        expect(response.statusCode).toEqual(400);
      } else {
        expect(response.statusCode).toEqual(201);
      }
    });

    test('Should Read Used', async () => {
      const response = await request(app)
        .get('/api/user/')
        .set('Accept', 'application/json');
      expect(response.statusCode).toEqual(200);
    });

    test('Should Update Used', async () => {
      const response = await request(app)
        .put(`/api/user/${fakeUser.username}`)
        .set('Accept', 'application/json')
        .send({password: '0000'});
      expect(response.statusCode).toEqual(201);
    });

    test('Should Delete Used', async () => {
      const response = await request(app).delete(
        `/api/user/${fakeUser.username}`
      );
      expect(response.statusCode).toEqual(204);
    });
  });

  describe('Authentication Test', () => {
    test.todo('Should User Login')
    test.todo("Should User Logout")
  });
});
