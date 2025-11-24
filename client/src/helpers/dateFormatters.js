export function formatDate(rawDate) {
  try {
    return new Date(rawDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch (error) {
    console.error(error);
    return 'N/A';
  }
}

export function formatDateForInput(rawDate) {
  try {
    return new Date(rawDate).toISOString().split('T')[0];
  } catch (error) {
    console.error(error);
    return '';
  }
}
