import React, { useState } from 'react';
import ModalConfirm from './ModalConfirm';


export default function TodoNotify({ initialTodos, clearAll }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const pendingTasks = initialTodos.filter((todo) => !todo.completed).length;
  const handleOpenModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirmed = () => {
    setShowDeleteModal(false);
    clearAll();
  };

  return (
    <div className='notify d-flex justify-content-between mt-4'>
      <p>
        You have {pendingTasks} pending tasks
      </p>
      <button onClick={handleOpenModal} type="submit" className="btn btn-primary">Clear All</button>

      <ModalConfirm
        show={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirmed}
        message="Are you sure you want to delete all?"
      />
    </div>

    
  );
}
