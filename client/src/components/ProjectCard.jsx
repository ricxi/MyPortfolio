import { useState } from 'react';
import Card from './Card';
import ProjectEditForm from './ProjectEditForm';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../helpers/dateFormatters';

const ProjectCard = ({ project, handleUpdate, handleDelete }) => {
  const { _id, title, firstName, lastName, email, completion, description } =
    project;

  const { isAdmin } = useAuth();

  const [showEditForm, setShowEditForm] = useState(false);

  const onUpdate = (updatedProject) => {
    handleUpdate(_id, updatedProject);
  };

  const onDelete = (e) => {
    e.preventDefault();
    handleDelete(_id);
  };

  return (
    <section className='grid-wrapper'>
      <h2>
        {title} ({completion ? new Date(completion).getFullYear() : 'N/A'})
      </h2>
      <img
        src='/space_invader.svg'
        alt='image not found'
        className='img-project'
      />
      <p>{description}</p>
      <div className='under-img'>
        {completion ? `Completed on ${formatDate(completion)}` : 'Created'}
        {firstName ? ` by ${firstName}` : ''}
        {lastName ? ` ${lastName}` : ''}
        {email ? ` (${email})` : ''}.{' '}
      </div>
      {isAdmin && (
        <>
          <div className='btn-toggles'>
            <button className='btn-hv-red' onClick={onDelete}>
              Delete
            </button>
            {showEditForm ? (
              <button
                className='btn-red'
                onClick={() => setShowEditForm(false)}
              >
                Close
              </button>
            ) : (
              <button
                className='btn-basic'
                onClick={() => setShowEditForm(true)}
              >
                Edit
              </button>
            )}
          </div>
          {showEditForm ? (
            <Card className='grid-form' style={{ width: '50%' }}>
              <ProjectEditForm
                project={project}
                onSubmitUpdate={onUpdate}
                className='form'
              />
            </Card>
          ) : (
            <></>
          )}
        </>
      )}
    </section>
  );
};

export default ProjectCard;
