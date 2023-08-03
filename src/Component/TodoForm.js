import React, { useState } from 'react';

export default function TodoForm({ addTodo, clearAllCompleted, handleSearchTextChange,handleSearch,searchText }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== '') {
      addTodo({
        text,
        completed: false,
      });
      setText('');
    }
  };

  const handleClearSearch = () => {
    handleSearchTextChange(''); // Xoá giá trị trong ô tìm kiếm
  };

  return (
    <form onSubmit={handleSubmit} className='formtask row'>
      <div className="col-12 col-md-6 mt-3 mb-3 d-flex">
        <input type="text" className="form-control py-2" id="Input1" placeholder='Add your new todo' onChange={handleChange} value={text} />
        <button type="submit" className="btn btn-primary ms-2"><i className="fa-solid fa-plus"></i></button>
      </div>

      {/* Search field */}
      <div className="col-12 col-md-6 mt-3 mb-3 d-flex">
        <input type="text" className="form-control" placeholder='Search todo' onChange={(e) => handleSearchTextChange(e.target.value)} value={searchText}/>
        <button type="button" className="btn btn-primary " onClick={handleSearch}>Search</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={handleClearSearch}>Clear</button>
      </div>
    </form>
  );
}
