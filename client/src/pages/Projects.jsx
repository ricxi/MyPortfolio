import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Card from '../components/Card';
import WarningModal from '../components/WarningModal';
import {
  addProject,
  getAllProjects,
  getProjectsById,
  deleteProjectById,
  updateProjectById,
} from '../services/projects';
import ProjectsForm from '../components/ProjectsForm';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../contexts/AuthContext';

const Projects = () => {
  const navigate = useNavigate();
  const { jwtToken, isSignedIn, isAdmin } = useAuth();

  const [projects, setProjects] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    if (isSignedIn) fetchProjects();
  }, [jwtToken, isSignedIn, isAdmin]);

  const fetchProjectById = async () => {
    const result = await getProjectsById();
    if (!result.hasError) {
      setProjects(result.data);
    }
  };

  const fetchProjects = async () => {
    const result = await getAllProjects(jwtToken);
    if (result.hasError) {
      navigate('/error', {
        state: { hasError: result.hasError, message: result.message },
      });
      return;
    }
    setProjects(result.data);
  };

  const handleAdd = async (projectData) => {
    const result = await addProject(jwtToken, projectData);
    if (result && !result.hasError) fetchProjects();
    else setWarningMessage(result.message);
  };

  const handleDelete = async (projectId) => {
    const result = await deleteProjectById(jwtToken, projectId);
    if (result && !result.hasError) fetchProjects();
    else setWarningMessage(result.message);
  };

  const handleUpdate = async (projectId, updatedProject) => {
    const result = await updateProjectById(jwtToken, projectId, updatedProject);
    if (result && !result.hasError) fetchProjects();
    else setWarningMessage(result.message);
  };

  return (
    <>
      {warningMessage.length !== 0 && (
        <WarningModal message={warningMessage} setMessage={setWarningMessage} />
      )}
      <h1>Projects Page</h1>
      <article>Here are some projects that I'm currently working on.</article>

      {isSignedIn &&
        projects &&
        projects.length > 0 &&
        projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}

      <section className='grid-wrapper'>
        <h2>Space Invaders Game</h2>
        <img
          src='/space_invader.svg'
          alt='image not found'
          className='img-project'
        />
        <p>
          In my game programming class, I am working with a team to build a 2D
          Space Invaders&ndash;style shooter game, designing and programming
          core gameplay systems—player movement, enemy waves, collision
          detection, sprite animation, and escalating difficulty—while keeping
          the code clean and modular. I am responsible for controls and the
          collision system, and review code to maintain standards. The current
          build is still in development.
        </p>
      </section>
      {isSignedIn && isAdmin && (
        <section>
          <Card>
            <h2>Add a New Project</h2>
            <ProjectsForm handleAdd={handleAdd} className='form' />
          </Card>
        </section>
      )}
    </>
  );
};

export default Projects;
