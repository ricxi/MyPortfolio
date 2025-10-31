const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../express.js');
const ContactModel = require('../models/contact.model.js');

const { initializeDB, stopDB, cleanupDB } = require('./setup.js');
const { constant } = require('lodash');

// Create a new contact
// TODO: error message and test if contact already exists
describe('POST /api/contacts (create a new contact)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await cleanupDB();
  });

  it('201: should create a new contact and return message', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Accept', 'application/json')
      .send({
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard@lapd.com',
      });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      message: 'Contact has been created.',
    });
  });

  it('400: no fields provided', async () => {
    const res = await request(app).post('/api/contacts').send({});
    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing first name', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Accept', 'application/json')
      .send({
        lastname: 'Deckard',
        email: 'rickdeckard@lapd.com',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing last name', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Accept', 'application/json')
      .send({
        firstname: 'Rick',
        email: 'rickdeckard@lapd.com',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing email', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Accept', 'application/json')
      .send({
        firstname: 'Rick',
        lastname: 'Deckard',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return a validation error for invalid email', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Accept', 'application/json')
      .send({
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard',
      });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/contacts (get all contacts)', () => {
  beforeAll(async () => {
    await initializeDB();

    await ContactModel.insertMany([
      {
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard@lapd.com',
      },
      {
        firstname: 'Niander',
        lastname: 'Wallace',
        email: 'niander@wallacecorp.com',
      },
    ]);
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ContactModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return all contacts from collection', async () => {
    const res = await request(app).get('/api/contacts');
    expect(res.status).toBe(200);

    for (const body of res.body) {
      expect(body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          firstname: expect.any(String),
          lastname: expect.any(String),
          email: expect.any(String),
        })
      );
    }
  });
});

describe('GET /api/contacts (get a contact by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ContactModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return contact by id url parametre', async () => {
    const contact = await ContactModel.create({
      firstname: 'Rick',
      lastname: 'Deckard',
      email: 'rickdeckard@lapd.com',
    });

    const res = await request(app).get(`/api/contacts/${contact._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: contact._id.toString(),
      firstname: 'Rick',
      lastname: 'Deckard',
      email: 'rickdeckard@lapd.com',
    });
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).get(`/api/contacts/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Contact not found.' })
    );
  });
});

describe('PUT /api/contacts (update contact by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ContactModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return contact with updated last name (update by id url param)', async () => {
    const contact = await ContactModel.create({
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
    });

    const res = await request(app).put(`/api/contacts/${contact._id}`).send({
      lastname: 'Deckard',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: contact._id.toString(),
      firstname: 'Ana',
      lastname: 'Deckard',
      email: 'anastelline@wallacecorp.com',
    });
  });

  it('200: should return contact with updated first name (update by id url param)', async () => {
    const contact = await ContactModel.create({
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
    });

    const res = await request(app).put(`/api/contacts/${contact._id}`).send({
      firstname: 'Anna',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: contact._id.toString(),
      firstname: 'Anna',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
    });
  });

  it('200: should return contact with updated email (update by id url param)', async () => {
    const contact = await ContactModel.create({
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
    });

    const res = await request(app).put(`/api/contacts/${contact._id}`).send({
      email: 'ana@stelline.com',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: contact._id.toString(),
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'ana@stelline.com',
    });
  });

  it('200: should return completely updated contact (update by id url param)', async () => {
    const contact = await ContactModel.create({
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
    });

    const res = await request(app).put(`/api/contacts/${contact._id}`).send({
      firstname: 'Rick',
      lastname: 'Deckard',
      email: 'rickdeckard@lapd.com',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: contact._id.toString(),
      firstname: 'Rick',
      lastname: 'Deckard',
      email: 'rickdeckard@lapd.com',
    });
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).put(`/api/contacts/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Contact not found.' })
    );
  });
});

describe('DELETE /api/contacts (delete contact by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ContactModel.deleteMany();
    await cleanupDB();
  });

  it('200: should delete a contact by id', async () => {
    const [contactRick, contactNiander, contactAna] =
      await ContactModel.insertMany([
        {
          firstname: 'Rick',
          lastname: 'Deckard',
          email: 'rickdeckard@lapd.com',
        },
        {
          firstname: 'Niander',
          lastname: 'Wallace',
          email: 'niander@wallacecorp.com',
        },
        {
          firstname: 'Ana',
          lastname: 'Stelline',
          email: 'anastelline@wallacecorp.com',
        },
      ]);

    const id = contactRick._id.toString();
    const res = await request(app).delete(`/api/contacts/${id}`);
    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      _id: id,
      firstname: 'Rick',
      lastname: 'Deckard',
      email: 'rickdeckard@lapd.com',
      deleted: true,
    });

    const remainingContacts = await ContactModel.find({}).lean();
    expect(remainingContacts).toHaveLength(2);

    await request(app).get(`/api/contacts/${id}`).expect(404);
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).delete(`/api/contacts/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Contact not found.' })
    );
  });
});

describe('DELETE /api/contacts (delete all contacts)', () => {
  beforeAll(async () => {
    await initializeDB();

    await ContactModel.insertMany([
      {
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard@lapd.com',
      },
      {
        firstname: 'Niander',
        lastname: 'Wallace',
        email: 'niander@wallacecorp.com',
      },
    ]);
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ContactModel.deleteMany();
    await cleanupDB();
  });

  it('200: should delete all contacts from collection', async () => {
    const res = await request(app).delete('/api/contacts');
    expect(res.status).toBe(200);

    const remainingContacts = await ContactModel.find({}).lean();
    expect(remainingContacts).toHaveLength(0);
  });
});
