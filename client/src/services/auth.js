const API_URL = '/api/auth';

export const signInUser = async (userData) => {
  const res = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (res.status !== 200) {
    const { error } = await res.json();
    return {
      hasError: true,
      message: error
        ? error
        : 'A problem occurred while signing in. Please try again.',
    };
  }

  const { token, user } = await res.json();
  return { hasError: false, token, user };
};
