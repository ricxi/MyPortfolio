const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../express.js');
const config = require('../../config/config.js');
const UserModel = require('../models/user.model.js');

const { initializeDB, stopDB, cleanupDB } = require('./setup.js');

describe('POST /auth/signin', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await cleanupDB();
  });

  it('200: returns token, sets cookie', async () => {
    const user = new UserModel({
      name: 'Rick Deckard',
      email: 'rickdeckard@lapd.com',
      password: 'Rachael',
    });
    await user.save();

    const res = await request(app)
      .post('/auth/signin')
      .send({ email: 'rickdeckard@lapd.com', password: 'Rachael' })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          _id: expect.any(String),
          name: 'Rick Deckard',
          email: 'rickdeckard@lapd.com',
        }),
      })
    );

    const setCookie = res.header['set-cookie'];
    expect(setCookie).toBeDefined();
    // expect(Array.isArray(setCookie)).toBe(true);
    // expect(setCookie.join(';')).toMatch(/t=/);

    const decoded = jwt.verify(res.body.token, config.jwtSecret);
    expect(decoded).toHaveProperty('_id', res.body.user._id);
    expect(decoded).toHaveProperty('_id', user._id.toString());
  });

  it('401: should deny access (wrong password)', async () => {
    const user = new UserModel({
      name: 'Rick Deckard',
      email: 'rickdeckard@lapd.com',
      password: 'Rachael',
    });
    await user.save();

    const res = await request(app)
      .post('/auth/signin')
      .send({ email: 'rickdeckard@lapd.com', password: 'xxxxxx' })
      .expect(401)
      .expect('Content-Type', /json/);

    expect(res.body).toEqual(
      expect.objectContaining({ error: "Email and password don't match." })
    );
  });

  it('401: should deny access (user does not exist because of wrong email)', async () => {
    const user = new UserModel({
      name: 'Rick Deckard',
      email: 'rickdeckard@lapd.com',
      password: 'Rachael',
    });
    await user.save();

    const res = await request(app)
      .post('/auth/signin')
      .send({ email: 'rickdeckard@la.com', password: 'Rachael' })
      .expect(401)
      .expect('Content-Type', /json/);

    expect(res.body).toEqual(
      expect.objectContaining({ error: 'User not found.' })
    );
  });
});
