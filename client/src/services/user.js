const API_URL = '/api/users';

export const signUpUser = async (userData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (res.status !== 201) {
    const { error } = await res.json();
    return {
      hasError: true,
      message: error
        ? error
        : 'A problem occurred during signing up. Please try again',
    };
  }

  const { token, user } = await res.json();
  return { hasError: false, token, user };
};

export const getUserDataById = async (userId, token) => {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `$Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return {
      hasError: true,
      message: 'A problem has occured. Please try again.',
    };
  }

  const user = await res.json();
  return { hasError: false, user };
};
