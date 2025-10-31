const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../express.js');
const QualificationModel = require('../models/qualification.model.js');

const { initializeDB, stopDB, cleanupDB } = require('./setup.js');

const expectedDateRe = /^\d{4}-\d{2}-\d{2}T.*Z$/;

describe('POST /api/qualifications (add a qualification)', () => {
  // TODO: Test for invalid completion date
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await cleanupDB();
  });

  it('201: should add a new qualification', async () => {
    const res = await request(app)
      .post('/api/qualifications')
      .set('Accept', 'application/json')
      .send({
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      message: 'Qualification has been added.',
    });
  });

  it('400: no fields provided', async () => {
    const res = await request(app).post('/api/qualifications').send({});
    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing first name', async () => {
    const res = await request(app)
      .post('/api/qualifications')
      .set('Accept', 'application/json')
      .send({
        title: 'Honours Bachelor of Science',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing last name', async () => {
    const res = await request(app)
      .post('/api/qualifications')
      .set('Accept', 'application/json')
      .send({
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing email', async () => {
    const res = await request(app)
      .post('/api/qualifications')
      .set('Accept', 'application/json')
      .send({
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return a validation error for invalid email', async () => {
    const res = await request(app)
      .post('/api/qualifications')
      .set('Accept', 'application/json')
      .send({
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return a validation error for missing title', async () => {
    const res = await request(app)
      .post('/api/qualifications')
      .set('Accept', 'application/json')
      .send({
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/qualifications (get all qualifications)', () => {
  beforeAll(async () => {
    await initializeDB();

    await QualificationModel.insertMany([
      {
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      },
      {
        title: 'Ontario Advanced College Diploma',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2027, 3, 30),
        description: 'Game Programming',
      },
    ]);
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await QualificationModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return all qualifications from collection', async () => {
    const res = await request(app).get('/api/qualifications');
    expect(res.status).toBe(200);

    for (const body of res.body) {
      expect(body).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          firstname: expect.any(String),
          lastname: expect.any(String),
          email: expect.any(String),
          description: expect.any(String),
          completion: expect.stringMatching(expectedDateRe),
        })
      );
    }
  });
});

describe('GET /api/qualifications/:id (get a qualification by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await QualificationModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return qualification with id url param', async () => {
    const qualifications = await QualificationModel.insertMany([
      {
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      },
      {
        title: 'Ontario Advanced College Diploma',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2027, 3, 30),
        description: 'Game Programming',
      },
    ]);

    const id = qualifications[0]._id.toString();

    const res = await request(app).get(`/api/qualifications/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      title: 'Honours Bachelor of Science',
      firstname: 'Richard',
      lastname: 'Xiong',
      email: 'rxiong3@my.centennialcollege.ca',
      completion: expect.stringMatching(expectedDateRe),
      description: 'Specialization in Computer Science',
    });
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).get(`/api/qualifications/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Qualification not found.' })
    );
  });
});

describe('PUT /api/qualifications/:id (update a qualification by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await QualificationModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return qualification with updated title (update by id url param)', async () => {
    const qualifications = await QualificationModel.insertMany([
      {
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      },
      {
        title: 'Ontario Advanced College Diploma',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2027, 3, 30),
        description: 'Game Programming',
      },
    ]);

    const id = qualifications[0]._id.toString();

    const res = await request(app).put(`/api/qualifications/${id}`).send({
      title: 'Honours Bachelor of Commerce',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      title: 'Honours Bachelor of Commerce',
      firstname: 'Richard',
      lastname: 'Xiong',
      email: 'rxiong3@my.centennialcollege.ca',
      completion: expect.stringMatching(expectedDateRe),
      description: 'Specialization in Computer Science',
    });
  });

  it('200: should return qualification with updated last name (update by id url param)', async () => {
    const qualifications = await QualificationModel.insertMany([
      {
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      },
      {
        title: 'Ontario Advanced College Diploma',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2027, 3, 30),
        description: 'Game Programming',
      },
    ]);

    const id = qualifications[0]._id.toString();

    const res = await request(app).put(`/api/qualifications/${id}`).send({
      lastname: 'Xio',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      title: 'Honours Bachelor of Science',
      firstname: 'Richard',
      lastname: 'Xio',
      email: 'rxiong3@my.centennialcollege.ca',
      completion: expect.stringMatching(expectedDateRe),
      description: 'Specialization in Computer Science',
    });
  });

  it('200: should return qualification with updated first name (update by id url param)', async () => {
    const qualification = await QualificationModel.create({
      title: 'Honours Bachelor of Science',
      firstname: 'Richard',
      lastname: 'Xiong',
      email: 'rxiong3@my.centennialcollege.ca',
      completion: new Date(2017, 3, 30),
      description: 'Specialization in Computer Science',
    });

    const id = qualification._id.toString();
    const res = await request(app).put(`/api/qualifications/${id}`).send({
      firstname: 'Ana',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      title: 'Honours Bachelor of Science',
      firstname: 'Ana',
      lastname: 'Xiong',
      email: 'rxiong3@my.centennialcollege.ca',
      completion: expect.stringMatching(expectedDateRe),
      description: 'Specialization in Computer Science',
    });
  });

  it('200: should return qualification with updated email (update by id url param)', async () => {
    const qualification = await QualificationModel.create({
      title: 'Honours Bachelor of Science',
      firstname: 'Richard',
      lastname: 'Xiong',
      email: 'rxiong3@my.centennialcollege.ca',
      completion: new Date(2017, 3, 30),
      description: 'Specialization in Computer Science',
    });

    const id = qualification._id.toString();

    const res = await request(app).put(`/api/qualifications/${id}`).send({
      email: 'ana@stelline.com',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      title: 'Honours Bachelor of Science',
      firstname: 'Richard',
      lastname: 'Xiong',
      email: 'ana@stelline.com',
      completion: expect.stringMatching(expectedDateRe),
      description: 'Specialization in Computer Science',
    });
  });

  it('200: should return completely updated qualification (update by id url param)', async () => {
    const qualification = await QualificationModel.create({
      title: 'Honours Bachelor of Science',
      firstname: 'Richard',
      lastname: 'Xiong',
      email: 'rxiong3@my.centennialcollege.ca',
      completion: new Date(2017, 3, 30),
      description: 'Specialization in Computer Science',
    });

    const id = qualification._id.toString();

    const res = await request(app)
      .put(`/api/qualifications/${id}`)
      .send({
        title: 'Honours Bachelor of Commerce',
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@my.centennialcollege.ca',
        completion: new Date(2020, 5, 20),
        description: 'Specialization in Finance',
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: id,
      title: 'Honours Bachelor of Commerce',
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@my.centennialcollege.ca',
      completion: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T.*Z$/),
      description: 'Specialization in Finance',
    });
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).put(`/api/qualifications/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Qualification not found.' })
    );
  });
});

describe('DELETE /api/qualifications all (delete all qualifications)', () => {
  beforeAll(async () => {
    await initializeDB();

    await QualificationModel.insertMany([
      {
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      },
      {
        title: 'Ontario Advanced College Diploma',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2027, 3, 30),
        description: 'Game Programming',
      },
    ]);
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await QualificationModel.deleteMany();
    await cleanupDB();
  });

  it('200: should delete all qualifications from collection', async () => {
    const res = await request(app).delete('/api/qualifications');
    expect(res.status).toBe(200);

    const remainingQualifications = await QualificationModel.find({}).lean();
    expect(remainingQualifications).toHaveLength(0);
  });
});

describe('DELETE /api/qualifications/:id (delete qualification by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await QualificationModel.deleteMany();
    await cleanupDB();
  });

  it('200: should delete a qualification by id', async () => {
    const qualifications = await QualificationModel.insertMany([
      {
        title: 'Honours Bachelor of Science',
        firstname: 'Richard',
        lastname: 'Xiong',
        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2017, 3, 30),
        description: 'Specialization in Computer Science',
      },
      {
        title: 'Ontario Advanced College Diploma',
        firstname: 'Richard',
        lastname: 'Xiong',

        email: 'rxiong3@my.centennialcollege.ca',
        completion: new Date(2027, 3, 30),
        description: 'Game Programming',
      },
    ]);

    const id = qualifications[1]._id.toString();

    const res = await request(app).delete(`/api/qualifications/${id}`);
    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      _id: id,
      deleted: true,
    });

    const remainingQualifications = await QualificationModel.find({}).lean();
    expect(remainingQualifications).toHaveLength(1);

    await request(app).get(`/api/qualifications/${id}`).expect(404);
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).delete(
      `/api/qualifications/${nonExistentId}`
    );
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Qualification not found.' })
    );
  });
});
