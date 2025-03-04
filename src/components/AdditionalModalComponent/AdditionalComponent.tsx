import React, { useState } from 'react';
import './additionalComponent.css';
import AdditionalModal from './AdditionalModal/AdditionalModal';

export function AdditionalComponent() {
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="div-center">
      <input className="input-style" type="text" onChange={(e) => setText(e.target.value)}></input>
      <button onClick={handleOpen}>Показать модальное окно</button>
      <AdditionalModal isOpen={isModalOpen} onClose={handleClose} text={text}></AdditionalModal>
    </div>
  );
}
