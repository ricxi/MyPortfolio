import { normalizeContactKeys } from '../helpers/normalize';

const API_URL = '/api/contacts';

export const addContact = async (token, contactData) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contactData),
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.error(data.error);
      throw new Error('A problem has occured. Please try again.');
    }

    return {
      hasError: false,
      data,
    };
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const getAllContacts = async (token) => {
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
      throw new Error('A problem occurred while retreiving all contacts');
    }

    const contacts = normalizeContactKeys(data);
    return { hasError: false, data: contacts };
  } catch (error) {
    return {
      hasError: true,
      message: error.message,
    };
  }
};

export const updateContactById = async (token, contactId, updatedContact) => {
  try {
    const res = await fetch(`${API_URL}/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedContact),
    });

    const data = await res.json();

    if (res.status !== 200) {
      console.error(data);
      throw new Error(
        `A problem occured while updating contact with the id: ${contactId}.`,
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

export const deleteContactById = async (token, contactId) => {
  try {
    const res = await fetch(`${API_URL}/${contactId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      console.error(data);
      throw new Error(
        `A problem occured while deleting contact with the id: ${contactId}.`,
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
