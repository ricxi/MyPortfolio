const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../express.js');
const ProjectModel = require('../models/project.model.js');

const { initializeDB, stopDB, cleanupDB } = require('./setup.js');

describe('POST /api/projects (create a new project)', () => {
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

  it('201: should create a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Accept', 'application/json')
      .send({
        title: 'Find Replicant',
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard@lapd.com',
        completion: new Date(2049, 0, 17),
        description: 'find clues and use them to track down replicants',
      });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      message: 'Project has been created.',
    });
  });

  it('400: no fields provided', async () => {
    const res = await request(app).post('/api/projects').send({});
    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing first name', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Accept', 'application/json')
      .send({
        title: 'Find Replicant',
        lastname: 'Deckard',
        email: 'rickdeckard@lapd.com',
        completion: new Date(2049, 0, 17),
        description: 'find clues and use them to track down replicants',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing last name', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Accept', 'application/json')
      .send({
        title: 'Find Replicant',
        firstname: 'Rick',
        email: 'rickdeckard@lapd.com',
        completion: new Date(2049, 0, 17),
        description: 'find clues and use them to track down replicants',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return validation error for missing email', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Accept', 'application/json')
      .send({
        title: 'Find Replicant',
        firstname: 'Rick',
        lastname: 'Deckard',
        completion: new Date(2049, 0, 17),
        description: '400: find clues and use them to track down replicants',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return a validation error for invalid email', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Accept', 'application/json')
      .send({
        title: 'Find Replicant',
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard',
        completion: new Date(2049, 0, 17),
        description: 'find clues and use them to track down replicants',
      });

    expect(res.status).toBe(400);
  });

  it('400: should return a validation error for missing title', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Accept', 'application/json')
      .send({
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard@wallacecorp.com',
        completion: new Date(2049, 0, 17),
        description: 'find clues and use them to track down replicants',
      });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/projects (get all projects)', () => {
  beforeAll(async () => {
    await initializeDB();

    await ProjectModel.insertMany([
      {
        title: 'Find Replicant',
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard@wallacecorp.com',
        completion: new Date(2049, 0, 17),
        description: 'find clues and use them to track down replicants',
      },
      {
        title: 'Replicant Memory Project',
        firstname: 'Ana',
        lastname: 'Stelline',
        email: 'anastelline@wallacecorp.com',
        completion: new Date(2049, 11, 25),
        description: 'create fake memories and implant them into replicants',
      },
    ]);
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ProjectModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return all projects from collection', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);

    for (const body of res.body) {
      expect(body).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          firstname: expect.any(String),
          lastname: expect.any(String),
          email: expect.any(String),
          description: expect.any(String),
          completion: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T.*Z$/),
        })
      );
    }
  });
});

describe('GET /api/projects/:id (get a project by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ProjectModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return project by id url param', async () => {
    const project = await ProjectModel.create({
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: new Date(2049, 11, 25),
      description: 'create fake memories and implant them into replicants',
    });

    const res = await request(app).get(`/api/projects/${project._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: project._id.toString(),
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T.*Z$/),
      description: 'create fake memories and implant them into replicants',
    });
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).get(`/api/projects/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Project not found.' })
    );
  });
});

describe('PUT /api/projects/:id (update projects by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ProjectModel.deleteMany();
    await cleanupDB();
  });

  it('200: should return project with updated title (update by id url param)', async () => {
    const project = await ProjectModel.create({
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: new Date(2049, 11, 25),
      description: 'create fake memories and implant them into replicants',
    });

    const res = await request(app).put(`/api/projects/${project._id}`).send({
      title: 'Memory Project',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: project._id.toString(),
      title: 'Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T.*Z$/),
      description: 'create fake memories and implant them into replicants',
    });
  });

  it('200: should return project with updated last name (update by id url param)', async () => {
    const project = await ProjectModel.create({
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: new Date(2049, 11, 25),
      description: 'create fake memories and implant them into replicants',
    });

    const res = await request(app).put(`/api/projects/${project._id}`).send({
      lastname: 'Deckard',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: project._id.toString(),
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Deckard',
      email: 'anastelline@wallacecorp.com',
      completion: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T.*Z$/),
      description: 'create fake memories and implant them into replicants',
    });
  });

  it('200: should return project with updated first name (update by id url param)', async () => {
    const project = await ProjectModel.create({
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: new Date(2049, 11, 25),
      description: 'create fake memories and implant them into replicants',
    });

    const res = await request(app).put(`/api/projects/${project._id}`).send({
      firstname: 'Anna',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: project._id.toString(),
      title: 'Replicant Memory Project',
      firstname: 'Anna',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T.*Z$/),
      description: 'create fake memories and implant them into replicants',
    });
  });

  it('200: should return project with updated email (update by id url param)', async () => {
    const project = await ProjectModel.create({
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: new Date(2049, 11, 25),
      description: 'create fake memories and implant them into replicants',
      email: 'anastelline@wallacecorp.com',
    });

    const res = await request(app).put(`/api/projects/${project._id}`).send({
      email: 'ana@stelline.com',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: project._id.toString(),
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'ana@stelline.com',
      completion: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T.*Z$/),
      description: 'create fake memories and implant them into replicants',
    });
  });

  it('200: should return completely updated project (update by id url param)', async () => {
    const project = await ProjectModel.create({
      title: 'Replicant Memory Project',
      firstname: 'Ana',
      lastname: 'Stelline',
      email: 'anastelline@wallacecorp.com',
      completion: new Date(2049, 11, 25),
      description: 'create fake memories and implant them into replicants',
      email: 'anastelline@wallacecorp.com',
    });

    const res = await request(app)
      .put(`/api/projects/${project._id}`)
      .send({
        title: 'Find Replicant',
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard@wallacecorp.com',
        completion: new Date(2049, 0, 17),
        description: 'find clues and use them to track down replicants',
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: project._id.toString(),
      title: 'Find Replicant',
      firstname: 'Rick',
      lastname: 'Deckard',
      email: 'rickdeckard@wallacecorp.com',
      completion: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T.*Z$/),
      description: 'find clues and use them to track down replicants',
    });
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).put(`/api/projects/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Project not found.' })
    );
  });
});

describe('DELETE /api/projects/:id (delete project by id)', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ProjectModel.deleteMany();
    await cleanupDB();
  });

  it('200: should delete a project by id', async () => {
    const projects = await ProjectModel.insertMany([
      {
        title: 'Find Replicant',
        firstname: 'Rick',
        lastname: 'Deckard',
        email: 'rickdeckard@wallacecorp.com',
        completion: new Date(2049, 0, 17),
        description: 'find clues and use them to track down replicants',
      },
      {
        title: 'Replicant Memory Project',
        firstname: 'Ana',
        lastname: 'Stelline',
        email: 'anastelline@wallacecorp.com',
        completion: new Date(2049, 11, 25),
        description: 'create fake memories and implant them into replicants',
      },
      {
        title: 'File Organization',
        firstname: 'Tomas',
        lastname: 'Lemarquis',
        email: 'tomaslemarquis@wallacecorp.com',
        completion: new Date(2049, 7, 15),
        description: 'reorganize files and destroy key evidence',
      },
    ]);

    const id = projects[1]._id.toString();

    const res = await request(app).delete(`/api/projects/${id}`);
    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      _id: id,
      deleted: true,
    });

    const remainingProjects = await ProjectModel.find({}).lean();
    expect(remainingProjects).toHaveLength(2);

    await request(app).get(`/api/projects/${id}`).expect(404);
  });

  it('404: should return not found for a valid but non-existent id', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).delete(`/api/projects/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({ error: 'Project not found.' })
    );
  });
});

describe('DELETE /api/projects all (delete all projects)', () => {
  beforeAll(async () => {
    await initializeDB();

    await ProjectModel.insertMany([
      {
        title: 'Replicant Memory Project',
        firstname: 'Ana',
        lastname: 'Stelline',
        email: 'anastelline@wallacecorp.com',
        completion: new Date(2049, 11, 25),
        description: 'create fake memories and implant them into replicants',
      },
      {
        title: 'File Organization',
        firstname: 'Tomas',
        lastname: 'Lemarquis',
        email: 'tomaslemarquis@wallacecorp.com',
        completion: new Date(2049, 7, 15),
        description: 'reorganize files and destroy key evidence',
      },
    ]);
  });

  afterAll(async () => {
    await stopDB();
  });

  afterEach(async () => {
    await ProjectModel.deleteMany();
    await cleanupDB();
  });

  it('200: should delete all projects from collection', async () => {
    const res = await request(app).delete('/api/projects');
    expect(res.status).toBe(200);

    const remainingProjects = await ProjectModel.find({}).lean();
    expect(remainingProjects).toHaveLength(0);
  });
});
