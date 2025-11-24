import { useEffect, useState } from 'react';
import { formatDateForInput } from '../helpers/dateFormatters';

const QualificationEditForm = ({ qualification, onUpdate, className }) => {
  const [qualificationTitle, setQualificationTitle] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  useEffect(() => {
    setQualificationTitle(qualification.title || '');
    setDescription(qualification.description || '');
    setFirstName(qualification.firstName || '');
    setLastName(qualification.lastName || '');
    setEmail(qualification.email || '');
    if (qualification.completion) {
      setCompletionDate(formatDateForInput(qualification.completion));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedQualification = {
      title: qualificationTitle,
      description,
      firstname: firstName,
      lastname: lastName,
      email,
      completion: completionDate,
    };

    onUpdate(updatedQualification);
  };

  return (
    <>
      <form className={className} onSubmit={handleSubmit}>
        <label htmlFor='qualificationTitle'>Title</label>
        <input
          type='text'
          id='qualificationTitle'
          name='qualificationTitle'
          placeholder='Title'
          required
          value={qualificationTitle}
          onChange={({ target: { value } }) => setQualificationTitle(value)}
        />

        <label htmlFor='description'>Description</label>
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
    </>
  );
};

export default QualificationEditForm;
