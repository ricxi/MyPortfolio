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
  const { isSignedIn, isAdmin, jwtToken } = useAuth();

  const [qualifications, setQualifications] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    if (isSignedIn) fetchQualifications();
  }, [jwtToken, isSignedIn, isAdmin]);

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
      {isSignedIn &&
        qualifications &&
        qualifications.length > 0 &&
        qualifications.map((qualification) => (
          <QualificationCard
            key={qualification._id}
            qualification={qualification}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      {isSignedIn && isAdmin && (
        <section>
          <Card>
            <h2>Add Qualification</h2>
            <QualificationsForm className='form' handleAdd={handleAdd} />
          </Card>
        </section>
      )}
    </>
  );
};

export default Qualifications;
