import React, { useState } from 'react';

export default function TodoFilter({ handleFilter }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    handleFilter(filterType);
  };

  return (
    <div>
      <ul className='filter-list d-flex justify-content-center'>
        <li>
          <button
            onClick={() => handleFilterClick('all')}
            className={`btn ${activeFilter === 'all' ? 'active-filter' : ''}`}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => handleFilterClick('completed')}
            className={`btn ${activeFilter === 'completed' ? 'active-filter' : ''}`}
          >
            Completed
          </button>
        </li>
        <li>
          <button
            onClick={() => handleFilterClick('pending')}
            className={`btn ${activeFilter === 'pending' ? 'active-filter' : ''}`}
          >
            Pending
          </button>
        </li>
      </ul>
    </div>
  );
}
