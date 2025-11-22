import { useState } from 'react';
import { addProject } from '../services/projects';

const ProjectsForm = ({ handleAdd, className }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      title: projectTitle,
      description,
      email,
      completion: completionDate,
    };

    handleAdd(projectData);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input
        type='text'
        id='qualificationTitle'
        name='qualificationTitle'
        placeholder='Title'
        required
        value={projectTitle}
        onChange={({ target: { value } }) => setProjectTitle(value)}
      />

      <textarea
        id='description'
        name='description'
        rows='8'
        placeholder='Description'
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
      ></textarea>

      <input
        type='email'
        id='email'
        name='email'
        placeholder='Email'
        required
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />

      <label htmlFor='completion'>Completion</label>
      <input
        type='date'
        id='completion'
        name='completion'
        required
        value={completionDate}
        onChange={(e) => setCompletionDate(e.target.value)}
      />

      <button className='btn-basic' type='submit'>
        Add +
      </button>
    </form>
  );
};

export default ProjectsForm;
