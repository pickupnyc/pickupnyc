import { useEffect } from "react";
import PropTypes from "prop-types";

const Toast = ({ show, onClose }) => {
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
        <div className="fixed bottom-24 left-1/2 z-[999] -translate-x-1/2 transform rounded-xl bg-red-500 p-4">
            <div role="alert" aria-live="assertive" aria-atomic="true">
                <div className="flex flex-row items-center justify-between">
                    <strong className="text-white">Authentication Required</strong>
                    <small className="text-white">just now</small>
                </div>
                <div className="text-white">You must be logged in to create a match.</div>
            </div>
        </div>
    );
};

Toast.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Toast;
