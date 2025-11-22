import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import QualificationsForm from '../components/QualificationsForm';
import QualificationCard from '../components/QualificationCard';
import {
  addQualification,
  getQualificationsById,
} from '../services/qualifications';

const Qualifications = () => {
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    const { hasError, data } = await getQualificationsById();
    if (!hasError) {
      setQualifications(data);
    }
  };

  const handleAdd = async (qualificationData) => {
    await addQualification(qualificationData);
    fetchQualifications();
  };

  const handleDelete = (qualificationId) => {
    console.log(qualificationId);
  };

  const handleShowEdit = () => {
    console.log('EDIT ME');
  };

  return (
    <>
      <h1>Education &amp; Qualifications</h1>
      <section>
        <h2>University of Ottawa (2017)</h2>
        <ul>
          <li>Honours Bachelor of Science</li>
          <li>Computer Science</li>
        </ul>
      </section>
      <section>
        <h2>Centennial College (2025 - present)</h2>
        <ul>
          <li>Ontario College Advanced Diploma</li>
          <li>Game Programming (Fast Track)</li>
        </ul>
      </section>

      {qualifications.map((qualificationPayload) => (
        <QualificationCard
          key={qualificationPayload._id}
          qualification={qualificationPayload}
          handleShowEdit={handleShowEdit}
          handleDelete={handleDelete}
        />
      ))}

      <section>
        <Card>
          <h2>Add Qualification</h2>
          <QualificationsForm
            className='form'
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleShowEdit={handleShowEdit}
          />
        </Card>
      </section>
    </>
  );
};

export default Qualifications;
