import { useState } from 'react';
import Card from './Card';
import ProjectEditForm from './ProjectEditForm';

const ProjectCard = ({ project, onHandleUpdate, handleDelete }) => {
  const { _id, title, completion, description } = project;

  const [showEditForm, setShowEditForm] = useState(false);

  const onShowEdit = (e) => {
    e.preventDefault();
    setShowEditForm(true);
  };

  const onDelete = (e) => {
    e.preventDefault();
    handleDelete(_id);
  };

  const onUpdate = (updatedProject) => {
    onHandleUpdate(updatedProject);
  };

  return (
    <section>
      <h2>
        {title} ({completion ? new Date(completion).getFullYear() : 'N/A'})
      </h2>
      <p>{description}</p>
      {showEditForm ? (
        <></>
      ) : (
        <button className='btn-basic' onClick={onShowEdit}>
          edit
        </button>
      )}
      <button className='btn-red' onClick={onDelete}>
        delete
      </button>
      {showEditForm ? (
        <Card style={{ width: '50%' }}>
          <ProjectEditForm
            project={project}
            onHideEditForm={setShowEditForm}
            onSubmitUpdate={onUpdate}
          />
        </Card>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ProjectCard;
