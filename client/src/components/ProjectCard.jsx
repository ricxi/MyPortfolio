import { useState } from 'react';
import Card from './Card';
import ProjectEditForm from './ProjectEditForm';

const ProjectCard = ({ project, handleUpdate, handleDelete }) => {
  const { _id, title, completion, description } = project;

  const [showEditForm, setShowEditForm] = useState(false);

  const onUpdate = (updatedProject) => {
    handleUpdate({ _id, ...updatedProject });
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
      <p>{description}</p>
      {showEditForm ? (
        <button className='btn-red' onClick={() => setShowEditForm(false)}>
          Cancel
        </button>
      ) : (
        <button className='btn-basic' onClick={() => setShowEditForm(true)}>
          edit
        </button>
      )}
      <button className='btn-hv-red' onClick={onDelete}>
        delete
      </button>
      {showEditForm ? (
        <Card style={{ width: '50%' }}>
          <ProjectEditForm
            project={project}
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

export default ProjectCard;
