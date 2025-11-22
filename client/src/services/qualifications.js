const API_URL = '/api/qualifications';

// export const getQualificationsById = async (userId, token) => {
export const getQualificationsById = async () => {
  // const res = await fetch(`${API_URL}/${userId}`, {
  const res = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `$Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return {
      hasError: true,
      message: 'A problem has occured. Please try again.',
    };
  }

  const data = await res.json();
  return { hasError: false, data };
};

export const addQualification = async (qualificationData) => {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `$Bearer ${token}`,
    },
    body: JSON.stringify(qualificationData),
  });

  if (res.status !== 200) {
    return {
      hasError: true,
      message: 'A problem has occured. Please try again.',
    };
  }

  const data = await res.json();
  return { hasError: false, data };
};

export const deleteQualificationById = async (qualificationId) => {
  const res = await fetch(`${API_URL}/${qualificationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `$Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return {
      hasError: true,
      message: 'A problem has occured. Please try again.',
    };
  }

  const data = await res.json();
  return { hasError: false, data };
};
