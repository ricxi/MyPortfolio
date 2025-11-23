const API_URL = '/api/qualifications';

export const addQualification = async (token, qualificationData) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(qualificationData),
    });

    const data = await res.json();

    if (res.status !== 201 && res.status !== 200) {
      throw new Error('A problem occurred while adding a qualification');
    }

    return { hasError: false, data };
  } catch (error) {
    return {
      hasError: true,
      message: 'A serious error has occurred. Please try again.',
    };
  }
};

export const getAllQualifications = async (token) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      console.error(data);
      throw new Error('A problem occurred while retreiving all qualifications');
    }

    return { hasError: false, data };
  } catch (error) {
    return {
      hasError: true,
      message: error.message,
    };
  }
};

export const updateQualificationById = async (
  token,
  qualificationId,
  updatedQualification,
) => {
  try {
    const res = await fetch(`${API_URL}/${qualificationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedQualification),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(
        `A problem occured while updating qualification with the id: ${qualificationId}.`,
      );
    }

    return { hasError: false, data };
  } catch (error) {
    return {
      hasError: true,
      message: error.message,
    };
  }
};

export const deleteQualificationById = async (token, qualificationId) => {
  try {
    const res = await fetch(`${API_URL}/${qualificationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(
        `A problem occured while deleting qualification with the id: ${qualificationId}.`,
      );
    }

    return { hasError: false, data };
  } catch (error) {
    return {
      hasError: true,
      message: error.message,
    };
  }
};
