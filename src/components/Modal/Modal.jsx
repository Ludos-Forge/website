import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  // 🔒 Blocca lo scroll del body quando la modale è aperta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
      onClick={onClose} // chiude cliccando sullo sfondo
    >
      <div
        className="relative bg-white rounded-lg p-6 min-w-[300px] max-w-[90vw] sm:max-w-[50vw] max-h-[80vh] overflow-y-auto shadow-lg" 
        data-modal-scrollable
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bottone chiusura */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Contenuto scrollabile */}
        <div className="pr-2">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
