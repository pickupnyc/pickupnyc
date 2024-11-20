import { useEffect } from "react";
import PropTypes from "prop-types";

const Toast = ({ show, onClose, children }) => {
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
            <div className="flex flex-col gap-y-4" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="flex flex-row items-center justify-between">
                    <strong className="text-white">Error</strong>
                    <small className="text-white">just now</small>
                </div>
                <div className="text-white">{children}</div>
            </div>
        </div>
    );
};

Toast.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Toast;
