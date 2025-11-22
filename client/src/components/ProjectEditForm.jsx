import { useEffect, useState } from 'react';

const ProjectEditForm = ({
  project,
  onSubmitUpdate,
  onHideEditForm,
  className,
}) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setProjectTitle(project.title || '');
    setDescription(project.description || '');
    setEmail(project.email || '');
    if (project.completion) {
      const formattedCompletion = new Date(project.completion)
        .toISOString()
        .split('T')[0];
      setCompletionDate(formattedCompletion);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProject = {
      title: projectTitle,
      description,
      email,
      completion: completionDate,
    };

    onSubmitUpdate(updatedProject);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input
        type='text'
        id='projectTitle'
        name='projectTitle'
        placeholder='Title'
        required
        value={projectTitle}
        onChange={({ target: { value } }) => setProjectTitle(value)}
      />

      <input
        type='text'
        id='description'
        name='description'
        placeholder='Description'
        required
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
      />

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
        Update
      </button>
      <button className='btn-red' onClick={(e) => onHideEditForm(false)}>
        Cancel
      </button>
    </form>
  );
};

export default ProjectEditForm;
