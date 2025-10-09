import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

// --- Modal Component ---
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xs md:max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    aria-label="Chiudi"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;