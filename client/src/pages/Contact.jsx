import { useNavigate } from 'react-router';
import Card from '../components/Card';
import ContactForm from '../components/ContactForm';
import { addContact } from '../services/contacts';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = async (contactData) => {
    const { hasError, message } = await addContact(contactData);

    if (hasError)
      navigate('/error', {
        state: {
          hasError,
          message: message,
        },
      });

    if (!hasError) {
      navigate('/success', {
        state: { message: 'Your contact information has been sent.' },
      });
    }
  };

  return (
    <>
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
    </>
  );
};

export default Contact;
