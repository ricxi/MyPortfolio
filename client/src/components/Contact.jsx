import { useNavigate } from 'react-router';
import Card from './Card';
import ContactForm from './ContactForm';

const Contact = ({ onSubmitContactForm }) => {
  let navigate = useNavigate();

  const onSubmit = (userInfo) => {
    // e.preventDefault();
    onSubmitContactForm(userInfo);
    navigate('/');
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
        <ContactForm onSubmit={onSubmit} />
      </Card>
    </>
  );
};

export default Contact;
