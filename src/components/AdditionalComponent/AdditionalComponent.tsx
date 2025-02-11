import React from 'react';
import { useState } from 'react';
import './additionalComponent.css';
import AdditionalModal from './AdditionalModal/AdditionalModal';

interface AdditionalComponentProps {
}

export function AdditionalComponent({ }: AdditionalComponentProps) {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="div-center">
      <input type="text" onChange={(e) => setText(e.target.value)}></input>
      <button onClick={handleOpen}>Показать модальное окно</button>
      <AdditionalModal isOpen={isModalOpen} onClose={handleClose} text={text}></AdditionalModal>
    </div>
  );
}
