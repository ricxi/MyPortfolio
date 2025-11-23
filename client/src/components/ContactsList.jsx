import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import WarningModal from '../components/WarningModal';
import ContactCard from './ContactCard';
import {
  getAllContacts,
  updateContactById,
  deleteContactById,
} from '../services/contacts';

const ContactsList = () => {
  const navigate = useNavigate();
  const { isSignedIn, jwtToken } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    if (isSignedIn) fetchContacts();
  }, [jwtToken, isSignedIn]);

  const fetchContacts = async () => {
    const result = await getAllContacts(jwtToken);
    if (result.hasError) {
      navigate('/error', {
        state: { hasError: result.hasError, message: result.message },
      });
      return;
    }
    setContacts(result.data);
  };

  const handleDelete = async (projectId) => {
    const result = await deleteContactById(jwtToken, projectId);
    if (result && !result.hasError) fetchContacts();
    else setWarningMessage(result.message);
  };

  const handleUpdate = async (contactId, updatedContact) => {
    const result = await updateContactById(jwtToken, contactId, updatedContact);
    if (result && !result.hasError) fetchContacts();
    else setWarningMessage(result.message);
  };

  return (
    <>
      {warningMessage.length !== 0 && (
        <WarningModal message={warningMessage} setMessage={setWarningMessage} />
      )}
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default ContactsList;
