import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, handleDeleteTodo, handleToggleCompleted, handleEditTodo, currentPage, todosPerPage,handlePageChange,initialTodos,lengthPage }) {
  const indexOfFirstTodo = (currentPage - 1) * todosPerPage;

  return (
    <div>
      {todos.length === 0 ? (
        <p className='text-center my-4 fw-bold'>Không có công việc nào.</p>
      ) : (
        <ul className='task-list'>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index + indexOfFirstTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleCompleted={handleToggleCompleted}
              handleEditTodo={handleEditTodo}
            />
          ))}
        </ul>
      )}

              {/* Phân trang */}
              <div className='pagination d-flex justify-content-center mt-3 mb-3'>
          {Array.from({ length: lengthPage  }, (_, index) => (
            <button
              key={index}
              className={`btn btn-secondary me-1 ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </div>
  );
}
