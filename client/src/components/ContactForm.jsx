import { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      firstName,
      lastName,
      contactNumber,
      email,
      message,
    });

    setFirstName('');
    setLastName('');
    setContactNumber('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='contact-form'>
        <input
          type='text'
          id='firstName'
          name='firstName'
          placeholder='First Name'
          required
          value={firstName}
          onChange={({ target }) => setFirstName(target.value)}
        />

        <input
          type='text'
          id='lastName'
          name='lastName'
          placeholder='Last Name'
          required
          value={lastName}
          onChange={({ target }) => setLastName(target.value)}
        />

        <input
          type='text'
          id='contactNumber'
          name='contactNumber'
          placeholder='Contact Number'
          required
          value={contactNumber}
          onChange={({ target }) => setContactNumber(target.value)}
        />

        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          required
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />

        <textarea
          id='message'
          name='message'
          rows='8'
          placeholder='Leave a message'
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        ></textarea>

        <button type='submit' className='form-button'>
          Submit
        </button>
      </form>
    </>
  );
};

export default ContactForm;
