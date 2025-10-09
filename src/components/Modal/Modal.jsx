import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

// --- Modal Component ---
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
            onClick={onClose} // chiude cliccando sullo sfondo
        >
            <div
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    minWidth: "300px",
                    maxWidth: "50vw",
                    position: "relative",
                }}
                onClick={(e) => e.stopPropagation()} // evita chiusura se clicco dentro
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        border: "none",
                        background: "transparent",
                        fontSize: "18px",
                        cursor: "pointer",
                    }}
                >
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;