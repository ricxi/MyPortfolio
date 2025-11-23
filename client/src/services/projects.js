const API_URL = '/api/projects';

export const addProject = async (token, projectData) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    const data = await res.json();

    if (res.status !== 201 && res.status !== 200) {
      console.error(data.error);
      throw new Error('A problem occurred while adding your project');
    }

    return { hasError: false, data };
  } catch (error) {
    return {
      hasError: true,
      message: error.message,
    };
  }
};

export const getAllProjects = async (token) => {
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
      throw new Error('A problem occurred while retreiving all projects');
    }

    return { hasError: false, data };
  } catch (error) {
    return {
      hasError: true,
      message: error.message,
    };
  }
};

export const getProjectsById = async (token, userId) => {
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
      throw new Error(
        `A problem occurred while trying to retreive projects for user : ${userId}`,
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

export const updateProjectById = async (token, projectId, updatedProject) => {
  try {
    const res = await fetch(`${API_URL}/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProject),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(
        `A problem occurred while trying to update project: ${projectId}`,
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

export const deleteProjectById = async (token, projectId) => {
  try {
    const res = await fetch(`${API_URL}/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(
        `A problem occurred while deleting project: ${projectId}`,
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
