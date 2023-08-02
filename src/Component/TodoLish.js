import React from 'react';
import TodoItem from './TodoItem';

export default function TodoLish({ todos, deleteTodo, toggleCompleted,handleEditTodo,currentPage,todosPerPage }) {
  const indexOfFirstTodo = (currentPage - 1) * todosPerPage;
 
  
  return (
    <div className='listtask'>
      <ul className='tasklist'>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index + indexOfFirstTodo}
            deleteTodo={deleteTodo}
            toggleCompleted={toggleCompleted}
            handleEditTodo={handleEditTodo}
          />
        ))}
      </ul>
    </div>
  );
}
