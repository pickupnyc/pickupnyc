import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className="mb-6">
                    <button className="float-right text-xl text-gray-500 hover:text-red-500" onClick={onClose}>
                        &#x2715;
                    </button>
                </div>

                {children}
                {/* <button
                    onClick={onClose}
                    className="mt-2 w-full rounded-full border-2 border-red-500 bg-red-500 px-6 py-2 text-center text-white hover:bg-white hover:text-red-500"
                >
                    Cancel
                </button> */}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
