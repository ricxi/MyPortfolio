import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import WarningModal from '../components/WarningModal';
import QualificationsForm from '../components/QualificationsForm';
import QualificationCard from '../components/QualificationCard';
import {
  addQualification,
  getAllQualifications,
  updateQualificationById,
  deleteQualificationById,
} from '../services/qualifications';

const Qualifications = () => {
  const navigate = useNavigate();
  const { isSignedIn, jwtToken } = useAuth();

  const [qualifications, setQualifications] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    if (isSignedIn) fetchQualifications();
  }, [jwtToken, isSignedIn]);

  const fetchQualifications = async () => {
    const result = await getAllQualifications(jwtToken);
    if (result.hasError) {
      navigate('/error', {
        state: { hasError: result.hasError, message: result.message },
      });
      return;
    }
    setQualifications(result.data);
  };

  const handleAdd = async (qualificationData) => {
    const result = await addQualification(jwtToken, qualificationData);
    if (result && !result.hasError) fetchQualifications();
    else setWarningMessage(result.message);
  };

  const handleDelete = async (qualificationId) => {
    const result = await deleteQualificationById(jwtToken, qualificationId);
    if (result && !result.hasError) fetchQualifications();
    else setWarningMessage(result.message);
  };

  const handleUpdate = async (qualificationId, updatedQualification) => {
    const result = await updateQualificationById(
      jwtToken,
      qualificationId,
      updatedQualification,
    );
    if (result && !result.hasError) fetchQualifications();
    else setWarningMessage(result.message);
  };

  return (
    <>
      {warningMessage.length !== 0 && (
        <WarningModal message={warningMessage} setMessage={setWarningMessage} />
      )}
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
