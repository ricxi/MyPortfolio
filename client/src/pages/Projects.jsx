import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { addProject, getProjectsById } from '../services/projects';
import ProjectsForm from '../components/ProjectsForm';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { hasError, data } = await getProjectsById();
    if (!hasError) {
      setProjects(data);
    }
  };

  const handleAdd = async (projectData) => {
    await addProject(projectData);
    fetchProjects();
  };

  const handleDelete = (qualificationId) => {
    console.log(qualificationId);
  };

  const handleUpdate = (updatedProject) => {
    console.log(updatedProject);
  };

  return (
    <>
      <h1>Projects Page</h1>
      <article>Here are three projects that I'm currently working on.</article>
      <section className='grid-wrapper'>
        <h2>Space Invaders Game</h2>
        <img
          src='/space_invader.svg'
          alt='image not found'
          className='img-project'
        />
        <p>
          In my game programming class, I am working with a team to build a 2D
          Space Invaders–style shooter game, designing and programming core
          gameplay systems—player movement, enemy waves, collision detection,
          sprite animation, and escalating difficulty—while keeping the code
          clean and modular. I am responsible for controls and the collision
          system, and review code to maintain standards. The current build is
          still in development.
        </p>
      </section>

      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}

      <section>
        <Card>
          <h2>Add a New Project</h2>
          <ProjectsForm
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            className='form'
          />
        </Card>
      </section>
    </>
  );
};

export default Projects;
