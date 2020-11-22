import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalcontext } from './context'
const Modal = () => {
  const { isModalOpen, closeModal } = useGlobalcontext()
  return (
    <div className={`modal-overlay ${isModalOpen ? 'show-modal' : ''}`}>
      <div className="modal-container">
        <h3>modal content</h3>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  )
}

export default Modal
