import { useState } from 'react';
import Card from './Card';
import ContactEditForm from './ContactEditForm';
import { useAuth } from '../contexts/AuthContext';

const ContactCard = ({ contact, handleUpdate, handleDelete }) => {
  const { _id, firstName, lastName, contactNumber, email, message } = contact;

  const { isAdmin } = useAuth();

  const [showEditForm, setShowEditForm] = useState(false);

  const onUpdate = (updatedContact) => {
    handleUpdate(_id, updatedContact);
  };

  const onDelete = (e) => {
    e.preventDefault();
    handleDelete(_id);
  };

  return (
    <Card>
      <h3>
        {firstName} {lastName}
      </h3>
      <div className='grid-c-wrapper'>
        <p>Email: </p>
        <p>{email}</p>
        <p>Contact Number: </p>
        <p>{contactNumber}</p>
      </div>
      <p style={{ borderTop: '1px solid black' }}>Message:</p>
      <p style={{ borderBottom: '1px solid black' }}>{message}</p>
      {isAdmin && (
        <>
          <button className='btn-hv-red' onClick={onDelete}>
            Delete
          </button>
          {showEditForm ? (
            <button className='btn-red' onClick={() => setShowEditForm(false)}>
              Close
            </button>
          ) : (
            <button className='btn-basic' onClick={() => setShowEditForm(true)}>
              Edit
            </button>
          )}

          {showEditForm && (
            <Card style={{ width: '50%' }}>
              <ContactEditForm
                contact={contact}
                onUpdate={onUpdate}
                className='form'
              />
            </Card>
          )}
        </>
      )}
    </Card>
  );
};

export default ContactCard;
