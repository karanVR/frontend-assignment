import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; 
import { ModalProps } from "../../models";


const Modal: React.FC<ModalProps> = ({ title, description, type, onClose }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null; 

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className={`modal-container ${type}`}> 
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;