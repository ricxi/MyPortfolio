const API_URL = '/api/contacts';

export const addContact = async (contactData) => {
  console.log(contactData);
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `$Bearer ${token}`,
    },
    body: JSON.stringify(contactData),
  });

  if (res.status !== 201) {
    const data = await res.json();
    console.log(data);
    return {
      hasError: true,
      message: 'A problem has occured. Please try again.',
    };
  }

  const data = await res.json();
  return { hasError: false, data };
};
