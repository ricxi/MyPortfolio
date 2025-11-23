import { useEffect, useState } from 'react';

const ContactEditForm = ({ contact, onUpdate, className }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFirstName(contact.firstName || '');
    setLastName(contact.lastName || '');
    setContactNumber(contact.contactNumber || '');
    setEmail(contact.email || '');
    setMessage(contact.message || '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedContact = {
      firstname: firstName,
      lastname: lastName,
      phone: contactNumber,
      email,
      message,
    };

    onUpdate(updatedContact);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <label htmlFor='firstName'>First Name</label>
      <input
        type='text'
        id='firstName'
        name='firstName'
        placeholder='First Name'
        required
        value={firstName}
        onChange={({ target: { value } }) => setFirstName(value)}
      />

      <label htmlFor='lastName'>Last Name</label>
      <input
        type='text'
        id='lastName'
        name='lastName'
        placeholder='Last Name'
        required
        value={lastName}
        onChange={({ target: { value } }) => setLastName(value)}
      />

      <label htmlFor='contactNumber'>Contact Number</label>
      <input
        type='tel'
        id='contactNumber'
        name='contactNumber'
        placeholder='Contact Number'
        required
        value={contactNumber}
        onChange={({ target: { value } }) => setContactNumber(value)}
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

      <label htmlFor='message'>Message</label>
      <textarea
        id='message'
        name='message'
        rows='8'
        placeholder='Leave a message'
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
      ></textarea>

      <div></div>
      <button className='btn-basic' type='submit'>
        Update
      </button>
    </form>
  );
};

export default ContactEditForm;
