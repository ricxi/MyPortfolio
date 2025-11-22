import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import QualificationsForm from '../components/QualificationsForm';
import QualificationCard from '../components/QualificationCard';
import {
  addQualification,
  getQualificationsById,
  deleteQualificationById,
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

  const handleDelete = async (qualificationId) => {
    const data = await deleteQualificationById(qualificationId);

    if (data && !data.hasError) fetchQualifications();
    else console.error(data);
  };

  const handleUpdate = (updatedQualification) => {
    console.log(updatedQualification);
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
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}

      <section>
        <Card>
          <h2>Add Qualification</h2>
          <QualificationsForm className='form' handleAdd={handleAdd} />
        </Card>
      </section>
    </>
  );
};

export default Qualifications;
