import React from "react";
import { FC } from "react";
import './additionalmodal.css';

interface AdditionalModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
}

const AdditionalModal: FC <AdditionalModalProps> = ({isOpen, onClose, text}) => {
    return isOpen && <div className="modal" onClick={onClose}>
            <div className="modal-content">ANd Text is {text}</div> 
        </div>
    
}

export default AdditionalModal;