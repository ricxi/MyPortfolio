const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../express.js');
const UserModel = require('../models/user.model.js');

const { initializeDB, stopDB, cleanupDB } = require('./setup.js');

const expectedDateRe = /^\d{4}-\d{2}-\d{2}T.*Z$/;

describe('POST /api/users (create a user)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await cleanupDB();
  });

  it('201: should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      message: 'Successfully signed up!',
    });
  });

  it('400: no fields provided', async () => {
    const res = await request(app).post('/api/users').send({});
    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing name field', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing email', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        name: 'Rick Deckard',
        password: 'Rachael',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return a validation error for invalid email', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd',
        password: 'Rachael',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return a validation error for missing password', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return a validation error for invalid password', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: '12345',
      });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/users (get all users)', () => {
  beforeAll(async () => {
    await initializeDB();

    await UserModel.insertMany([
      new UserModel({
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      }),
      new UserModel({
        name: 'Niander Wallace',
        email: 'niander@wallacecorp.com',
        password: 'niander',
      }),
      new UserModel({
        name: 'Ana Stelline',
        email: 'anastelline@wallacecorp.com',
        password: 'memories',
      }),
    ]);
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return all users from collection', async () => {
    const user = new UserModel({
      name: 'Officer K',
      email: 'officerk@lapd.com',
      password: 'joijoi',
    });
    await user.save();

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });

    const token = authRes.body.token;
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);

    for (const body of res.body) {
      expect(body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          created: expect.stringMatching(expectedDateRe),
          updated: expect.stringMatching(expectedDateRe),
        })
      );
    }
  });

  it('401: should return unauthorized', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: 'Failed to authenticate user',
      })
    );
  });
});

describe('GET /api/users/:id (get a user by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return user with id url param', async () => {
    const users = await UserModel.insertMany([
      new UserModel({
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      }),
      new UserModel({
        name: 'Niander Wallace',
        email: 'niander@wallacecorp.com',
        password: 'niander',
      }),
      new UserModel({
        name: 'Ana Stelline',
        email: 'anastelline@wallacecorp.com',
        password: 'memories',
      }),
    ]);

    const id = users[1]._id.toString();

    const user = new UserModel({
      name: 'Officer K',
      email: 'officerk@lapd.com',
      password: 'joijoi',
    });
    await user.save();

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });

    const token = authRes.body.token;

    const res = await request(app)
      .get(`/api/users/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      name: 'Niander Wallace',
      email: 'niander@wallacecorp.com',
      created: expect.stringMatching(expectedDateRe),
      updated: expect.stringMatching(expectedDateRe),
    });
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const user = new UserModel({
      name: 'Officer K',
      email: 'officerk@lapd.com',
      password: 'joijoi',
    });
    await user.save();

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });

    const token = authRes.body.token;

    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app)
      .get(`/api/users/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'User not found.' })
    );
  });

  // TODO: remove this
  it('401: should return not found for a invalid jwt token', async () => {
    const user = new UserModel({
      name: 'Officer K',
      email: 'officerk@lapd.com',
      password: 'joijoi',
    });
    await user.save();

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });

    const token = authRes.body.token;

    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app)
      .get(`/api/users/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}+x`); // added +x to invalidate token

    expect(res.status).toBe(401);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'invalid token' })
    );
  });
});

describe('PUT /api/users/:id (update a user by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return user with updated name (update by id url param)', async () => {
    const users = await UserModel.insertMany([
      {
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      },
      {
        name: 'Officer K',
        email: 'officerk@lapd.com',
        password: 'joijoi',
      },
    ]);

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });
    const token = authRes.body.token;

    const id = users[1]._id.toString();

    const res = await request(app)
      .put(`/api/users/${id}`)
      .send({
        name: 'John Doe',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      name: 'John Doe',
      email: 'officerk@lapd.com',
      created: expect.stringMatching(expectedDateRe),
      updated: expect.stringMatching(expectedDateRe),
    });
  });

  it('200: should return user with updated email (update by id url param)', async () => {
    const users = await UserModel.insertMany([
      {
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      },
      {
        name: 'Officer K',
        email: 'officerk@lapd.com',
        password: 'joijoi',
      },
    ]);

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });
    const token = authRes.body.token;

    const id = users[1]._id.toString();

    const res = await request(app)
      .put(`/api/users/${id}`)
      .send({
        email: 'officerk@toronto.ca',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      name: 'Officer K',
      email: 'officerk@toronto.ca',
      created: expect.stringMatching(expectedDateRe),
      updated: expect.stringMatching(expectedDateRe),
    });
  });

  it('403: should return unauthorized user', async () => {
    const users = await UserModel.insertMany([
      {
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      },
      {
        name: 'Officer K',
        email: 'officerk@lapd.com',
        password: 'joijoi',
      },
    ]);

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });
    const token = authRes.body.token;

    const id = users[0]._id.toString();

    const res = await request(app)
      .put(`/api/users/${id}`)
      .send({
        email: 'officerk@toronto.ca',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      error: 'User is not authorized',
    });
  });
});

describe('DELETE /api/users/:id (delete user by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await cleanupDB();
  });

  it('200: should delete a user by id', async () => {
    const users = await UserModel.insertMany([
      {
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      },
      {
        name: 'Officer K',
        email: 'officerk@lapd.com',
        password: 'joijoi',
      },
    ]);

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });
    const token = authRes.body.token;

    const id = users[1]._id.toString();
    const res = await request(app)
      .delete(`/api/users/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      _id: id,
      name: 'Officer K',
      email: 'officerk@lapd.com',
      deleted: true,
    });

    const remainingUsers = await UserModel.find({}).lean();
    expect(remainingUsers).toHaveLength(1);
  });

  it('403: should not be able to delete a user', async () => {
    const users = await UserModel.insertMany([
      {
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      },
      {
        name: 'Officer K',
        email: 'officerk@lapd.com',
        password: 'joijoi',
      },
    ]);

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });
    const token = authRes.body.token;

    const id = users[0]._id.toString();
    const res = await request(app)
      .delete(`/api/users/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);

    expect(res.body).toEqual({
      error: 'User is not authorized',
    });

    const remainingUsers = await UserModel.find({}).lean();
    expect(remainingUsers).toHaveLength(2);
  });

  // Edge case for next time: can't he authorized to delete a user that doesn't exist
  // it('404: should return not found for a valid but non-existent id', async () => {
  //   const nonExistentId = new mongoose.Types.ObjectId().toString();

  //   const authRes = await request(app)
  //     .post('/auth/signin')
  //     .send({ email: 'officerk@lapd.com', password: 'joijoi' });
  //   const token = authRes.body.token;

  //   const res = await request(app)
  //     .delete(`/api/users/${nonExistentId}`)
  //     .set('Authorization', `Bearer ${token}`);
  //   expect(res.status).toBe(404);
  //   expect(res.body).toEqual(
  //     expect.objectContaining({ error: 'User not found.' })
  //   );
  // });
});

describe('DELETE /api/users all (delete all users)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await cleanupDB();
  });

  it('200: should delete all users from collection', async () => {
    const users = await UserModel.insertMany([
      {
        name: 'Rick Deckard',
        email: 'rickdeckard@lapd.com',
        password: 'Rachael',
      },
      {
        name: 'Officer K',
        email: 'officerk@lapd.com',
        password: 'joijoi',
      },
    ]);

    const authRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'officerk@lapd.com', password: 'joijoi' });
    const token = authRes.body.token;

    const res = await request(app)
      .delete('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);

    const remainingUsers = await UserModel.find({}).lean();
    expect(remainingUsers).toHaveLength(0);
  });
});
