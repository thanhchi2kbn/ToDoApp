import React, { useState } from 'react';

export default function TodoItem({ todo, index, deleteTodo, toggleCompleted,handleEditTodo }) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleDelete = () => {
    deleteTodo(index);
  };

  const handleToggle = () => {
    toggleCompleted(index);
  };

  const handleEdit = () => {
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

  return (
    <li className={`d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>
      {editing ? (
        <>
          <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
          <div>
            <button onClick={handleSave} className='btn btn-success'><i className="fa-solid fa-check"></i></button>
            <button onClick={handleCancel} className='btn btn-secondary ms-1'><i className="fa-solid fa-times"></i></button>
          </div>
        </>
      ) : (
        <>
          <p>{todo.text}</p>
          <div>
            <button onClick={handleDelete} className='btn btn-danger me-1'><i className="fa-solid fa-trash"></i></button>
            <button onClick={handleToggle} className='btn btn-success'><i className={todo.completed ? "fa-solid fa-rotate-left" : "fa-solid fa-check"}></i></button>
            <button onClick={handleEdit} className='btn btn-primary ms-1'><i className="fa-solid fa-pencil"></i></button>
          </div>
        </>
      )}
    </li>
  );
}
