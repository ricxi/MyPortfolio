import { useState } from 'react';

const QualificationsForm = ({ handleAdd, className }) => {
  const [qualificationTitle, setQualificationTitle] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const qualificationData = {
      title: qualificationTitle,
      description,
      firstname: firstName,
      lastname: lastName,
      email,
      completion: completionDate,
    };

    handleAdd(qualificationData);

    setQualificationTitle('');
    setDescription('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setCompletionDate('');
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

export default QualificationsForm;
