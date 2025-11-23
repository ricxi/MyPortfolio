export function setItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item to local storage: ' + error);
  }
}

export function getItem(key) {
  try {
    const token = window.localStorage.getItem(key);
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error('Error getting item from local storage: ' + error);
    return null;
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item from local storage: ' + error);
  }
}
