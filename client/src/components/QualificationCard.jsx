import { useState } from 'react';
import Card from './Card';
import QualificationEditForm from '../components/QualificationEditForm';

const QualificationCard = ({ qualification, handleDelete }) => {
  const { _id, title, completion, description } = qualification;

  const [showEditForm, setShowEditForm] = useState(false);

  const onShowEdit = (e) => {
    e.preventDefault();
    setShowEditForm(true);
  };

  const onDelete = (e) => {
    e.preventDefault();
    handleDelete(_id);
  };

  return (
    <section key={_id}>
      <h2>
        {title} ({completion ? new Date(completion).getFullYear() : 'N/A'})
      </h2>
      <ul>
        <li>{description}</li>
      </ul>
      {showEditForm ? (
        <></>
      ) : (
        <button className='btn-basic' onClick={onShowEdit}>
          Edit
        </button>
      )}
      <button className='btn-red' onClick={onDelete}>
        delete
      </button>
      {showEditForm ? (
        <Card style={{ width: '50%' }}>
          <QualificationEditForm
            qualification={qualification}
            handleHideEditForm={setShowEditForm}
          />
        </Card>
      ) : (
        <></>
      )}
    </section>
  );
};

export default QualificationCard;
