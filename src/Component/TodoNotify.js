import React from 'react';

export default function TodoNotify({ initialTodos, clearAll }) {
  const pendingTasks = initialTodos.filter((todo) => !todo.completed).length;
  return (
    <div className='notify d-flex justify-content-between mt-4'>
      <p>
        You have {pendingTasks} pending tasks
      </p>
      <button onClick={clearAll} type="submit" className="btn btn-primary">Clear All</button>
    </div>
  );
}
