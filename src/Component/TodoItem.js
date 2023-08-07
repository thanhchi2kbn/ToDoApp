import React, { useState } from 'react';
import ModalConfirm from './ModalConfirm';

export default function TodoItem({ todo, index, handleDeleteTodo, handleToggleCompleted, handleEditTodo }) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Thêm state cho hover


  const handleToggle = () => {
    handleToggleCompleted(index);
  };

  const handleEdit = () => {
    console.log(todo.text)
    setEditedText(todo.text);
    setEditing(true); 
  };
  

  const handleSave = () => {
    const editedTodo = {
      ...todo,
      text: editedText,
    };
    handleEditTodo(index, editedTodo);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedText(todo.text);
  };

  const handleOpenModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirmed = () => {
    setShowDeleteModal(false);
    handleDeleteTodo(index);
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

 
  return (
    <div>
      <li className={`d-flex  justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>
        {editing ? (
          <>
            <textarea className='w-50' type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
            <div>
              <button onClick={handleSave} className='btn btn-success'><i className="fa-solid fa-check"></i></button>
              <button onClick={handleCancel} className='btn btn-secondary ms-1'><i className="fa-solid fa-times"></i></button>
            </div>
          </>
        ) : (
          <>
          <p
              className="col-9"
              onMouseEnter={handleHover} // Xử lý hover khi con trỏ chuột đi vào
              onMouseLeave={handleHover} // Xử lý hover khi con trỏ chuột đi ra
            >
              { isHovered ? todo.text : (todo.text.length > 30 ? `${todo.text.slice(0, 30)}...`: todo.text)}
            </p>
            <div className='col-3 d-flex justify-content-end'>
              <button onClick={handleOpenModal} className='btn btn-danger me-1'><i className="fa-solid fa-trash"></i></button>

              <button 
                onClick={handleToggle}  
                className={todo.completed? 'btn btn-warning' :'btn btn-success '}>
                  <i className={todo.completed ? "fa-solid fa-rotate-left" : "fa-solid fa-check"}></i>
              </button>

              <button onClick={handleEdit} className='btn btn-primary ms-1'><i className="fa-solid fa-pencil"></i></button>
            </div>
          </>
        )}
      </li>
      {/* Delete confirmation modal */}
      <ModalConfirm
        show={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirmed}
        message="Are you sure you want to delete?"
      />
    </div>
  );
}
