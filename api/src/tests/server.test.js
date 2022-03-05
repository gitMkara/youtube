const request = require('supertest');
const database = require('../database/database.mongodb');
const app = require('../app');

const fakeUser = {username: 'fake', password: '123'};
const testUser = {username: 'admin', password: '123'};
let tokens = {};

describe('Test API', () => {
  beforeAll(async () => {
    await database.connect();
  }, 10000);
  afterAll(async () => {
    tokens = null;
    await database.disconnect();
  }, 10000);

  describe('User CRUD Test', () => {
    test('Should Register an User', async () => {
      const response = await testRegister();

      if (
        response.error.text &&
        JSON.parse(response.error.text).code == 11000
      ) {
        expect(response.statusCode).toEqual(400);
      } else {
        expect(response.statusCode).toEqual(201);
      }
    });

    describe('Authentication Test', () => {
      test('Should User Login', async () => {
        const response = await testLogin();

        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
        expect(response.statusCode).toEqual(200);
      });

      test('Should token is being refreshed', async () => {
        await new Promise((res) => setTimeout(res, 5000));
        const response = await testTokenRefresh();
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
        expect(response.statusCode).toEqual(200);
      }, 10000);

      test('Should User Logout', async () => {
        const response = await testLogout();
        expect(response.statusCode).toEqual(200);
      });
    });

    test('Should Read Used', async () => {
      const response = await testReadUsers();
      expect(response.statusCode).toEqual(200);
    });

    test('Should Update Used', async () => {
      const response = await testUpdateUser();
      expect(response.statusCode).toEqual(201);
    });
    test('Should Delete Used', async () => {
      const response = await testDeleteUser();
      expect(response.statusCode).toEqual(204);
    });
  });
});

//-- Test Functions --
const testRegister = () => {
  return request(app)
    .post('/api/user/register')
    .set('Accept', 'application/json')
    .send({username: fakeUser.username, password: fakeUser.password});
};

const testLogin = async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .set('Accept', 'application/json')
    .send({username: testUser.username, password: testUser.password});
  tokens.accessToken = response.body.accessToken;
  tokens.refreshToken = response.body.refreshToken;
  return response;
};

const testTokenRefresh = async () => {
  const response = await request(app)
    .post('/api/auth/refresh')
    .set('Accept', 'application/json')
    .send({refreshToken: tokens.refreshToken});

  tokens.accessToken = response.body.accessToken;
  tokens.refreshToken = response.body.refreshToken;

  return response;
};

const testLogout = () => {
  return request(app)
    .post('/api/auth/logout')
    .set('Accept', 'application/json');
};

const testReadUsers = () => {
  return request(app)
    .get('/api/user/')
    .set({auth: tokens.accessToken})
    .set('Accept', 'application/json');
};

const testUpdateUser = () => {
  return request(app)
    .put(`/api/user/${fakeUser.username}`)
    .set({auth: tokens.accessToken})
    .set('Accept', 'application/json')
    .send({password: '0000'});
};

const testDeleteUser = () => {
  return request(app)
    .delete(`/api/user/${fakeUser.username}`)
    .set({auth: tokens.accessToken});
};
