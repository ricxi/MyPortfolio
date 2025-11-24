import { useEffect, useState } from 'react';
import { formatDateForInput } from '../helpers/dateFormatters';

const ProjectEditForm = ({ project, onSubmitUpdate, className }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    setProjectTitle(project.title || '');
    setDescription(project.description || '');
    setEmail(project.email || '');
    setFirstName(project.firstName || '');
    setLastName(project.lastName || '');
    if (project.completion) {
      setCompletionDate(formatDateForInput(project.completion));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProject = {
      title: projectTitle,
      description,
      email,
      firstname: firstName,
      lastname: lastName,
      completion: completionDate,
    };

    onSubmitUpdate(updatedProject);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <label htmlFor='projectTitle'>Title</label>
      <input
        type='text'
        id='projectTitle'
        name='projectTitle'
        placeholder='Title'
        required
        value={projectTitle}
        onChange={({ target: { value } }) => setProjectTitle(value)}
      />

      <label htmlFor='description'>Description</label>

      <textarea
        id='description'
        name='description'
        rows='8'
        placeholder='Description'
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
      ></textarea>

      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Email'
        required
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />

      <input
        type='text'
        id='firstName'
        name='firstName'
        placeholder='First Name'
        required
        value={firstName}
        onChange={({ target: { value } }) => setFirstName(value)}
      />

      <input
        type='text'
        id='lastName'
        name='lastName'
        placeholder='Last Name'
        required
        value={lastName}
        onChange={({ target: { value } }) => setLastName(value)}
      />

      <label htmlFor='completion'>Completion Date</label>
      <input
        type='date'
        id='completion'
        name='completion'
        required
        value={completionDate}
        onChange={(e) => setCompletionDate(e.target.value)}
      />
      <button className='btn-basic' type='submit'>
        Update
      </button>
    </form>
  );
};

export default ProjectEditForm;
