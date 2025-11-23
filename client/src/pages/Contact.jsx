import { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '../components/Card';
import WarningModal from '../components/WarningModal';
import ContactForm from '../components/ContactForm';
import ContactsList from '../components/ContactsList';
import { addContact } from '../services/contacts';
import { useAuth } from '../contexts/AuthContext';

const Contact = () => {
  const navigate = useNavigate();
  const [warningMessage, setWarningMessage] = useState('');

  const { jwtToken, isSignedIn } = useAuth();

  const handleSubmit = async (contactData) => {
    const { hasError, message } = await addContact(jwtToken, contactData);

    if (hasError) setWarningMessage(message);

    if (!hasError) {
      navigate('/success', {
        state: { message: 'Your contact information has been sent.' },
      });
    }
  };

  return (
    <>
      {warningMessage.length !== 0 && (
        <WarningModal message={warningMessage} setMessage={setWarningMessage} />
      )}
      <Card>
        <h1>Contact Me</h1>
        <p>Richard Xiong</p>
        <p>rxiong3@my.centennialcollege.ca</p>
        <p>Ottawa, Ontario</p>
        <p>(613) XXX-XXXX</p>
      </Card>
      <Card>
        <p>Please leave a message with your contact information.</p>
        <ContactForm handleSubmit={handleSubmit} className='form' />
      </Card>
      {isSignedIn && (
        <h1 style={{ textAlign: 'center' }}>All Contacts Submitted</h1>
      )}
      {isSignedIn && <ContactsList />}
    </>
  );
};

export default Contact;
