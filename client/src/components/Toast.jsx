import { useEffect } from 'react';

const Toast = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      // Auto-hide the toast after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div 
      className="position-fixed bottom-0 end-0 p-3" 
      style={{ zIndex: 1050 }}
    >
      <div 
        className="toast show" 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Authentication Required</strong>
          <small>just now</small>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">
          You must be logged in to create a match.
        </div>
      </div>
    </div>
  );
};

export default Toast;