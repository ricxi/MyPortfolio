import { useEffect, useState } from 'react';

const QualificationEditForm = ({
  qualification,
  handleUpdate,
  handleHideEditForm,
  className,
}) => {
  const [qualificationTitle, setQualificationTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setQualificationTitle(qualification.title || '');
    setDescription(qualification.description || '');
    setEmail(qualification.email || '');
    if (qualification.completion) {
      const formattedCompletion = new Date(qualification.completion)
        .toISOString()
        .split('T')[0];
      setCompletionDate(formattedCompletion);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedQualification = {
      title: qualificationTitle,
      description,
      email,
      completion: completionDate,
    };

    // handleUpdate(updatedQualification);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input
        type='text'
        id='qualificationTitle'
        name='qualificationTitle'
        placeholder='Title'
        required
        value={qualificationTitle}
        onChange={({ target: { value } }) => setQualificationTitle(value)}
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
      <button className='btn-red' onClick={(e) => handleHideEditForm(false)}>
        Cancel
      </button>
    </form>
  );
};

export default QualificationEditForm;
