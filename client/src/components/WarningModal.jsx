import { useState, useEffect } from 'react';

const WarningModal = ({ message, setMessage, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message.length === 0) return;

    setIsVisible(true);

    const timerId = setTimeout(() => {
      setIsVisible(false);
      setMessage('');
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [duration, message]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className='modal-wrn'>
      <h1 style={{ color: 'inherit' }}>Error</h1>
      {message}
    </div>
  );
};

export default WarningModal;
