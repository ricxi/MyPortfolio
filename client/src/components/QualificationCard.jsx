import { useState } from 'react';
import Card from './Card';
import QualificationEditForm from '../components/QualificationEditForm';

const QualificationCard = ({ qualification, handleUpdate, handleDelete }) => {
  const { _id, title, completion, description } = qualification;

  const [showEditForm, setShowEditForm] = useState(false);

  const onUpdate = (updatedQualification) => {
    handleUpdate(_id, updatedQualification);
  };

  const onDelete = (e) => {
    e.preventDefault();
    handleDelete(_id);
  };

  return (
    <section>
      <h2>
        {title} ({completion ? new Date(completion).getFullYear() : 'N/A'})
      </h2>
      <ul>
        <li>{description}</li>
      </ul>
      {showEditForm ? (
        <button className='btn-red' onClick={() => setShowEditForm(false)}>
          Cancel
        </button>
      ) : (
        <button className='btn-basic' onClick={() => setShowEditForm(true)}>
          Edit
        </button>
      )}
      <button className='btn-hv-red' onClick={onDelete}>
        delete
      </button>
      {showEditForm ? (
        <Card style={{ width: '50%' }}>
          <QualificationEditForm
            qualification={qualification}
            onSubmitUpdate={onUpdate}
            className='form'
          />
        </Card>
      ) : (
        <></>
      )}
    </section>
  );
};

export default QualificationCard;
