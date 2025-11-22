const API_URL = '/api/projects';

export const addProject = async (projectData) => {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `$Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
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

// export const getProjectsById = async (userId, token) => {
export const getProjectsById = async () => {
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

export const updateProjectById = async () => {
  const res = await fetch(`${API_URL}`, {
    method: 'PUT',
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

export const deleteProjectById = async (projectId) => {
  const res = await fetch(`${API_URL}/${projectId}`, {
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
