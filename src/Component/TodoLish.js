import React from 'react';
import TodoItem from './TodoItem';

export default function TodoLish({ todos, deleteTodo, toggleCompleted,handleEditTodo }) {
 
  
  return (
    <div className='listtask'>
      <ul className='tasklist'>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            deleteTodo={deleteTodo}
            toggleCompleted={toggleCompleted}
            handleEditTodo={handleEditTodo}
          />
        ))}
      </ul>
    </div>
  );
}
