import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './Component/TodoForm';
import TodoList from './Component/TodoList';
import TodoNotify from './Component/TodoNotify';
import TodoFilter from './Component/TodoFilter';

function App() {
  const [initialTodos, setInitialTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lengthPage, setLengthPage] = useState(1);
  const todosPerPage = 5;
  const storedTodos = localStorage.getItem('todos');

  useEffect(() => {
    setCurrentPage(1)    
    if (storedTodos) {
      setInitialTodos(JSON.parse(storedTodos));
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    if (todos.length % 5 === 0) {
      setCurrentPage(todos.length/5);
    }
  }, [todos]);

  useEffect(() => {
    setLengthPage(Math.ceil(initialTodos.length / todosPerPage));
  }, [initialTodos.length, todosPerPage]);

  
  
  const handleAddTodo = (todo) => {
    setInitialTodos([...initialTodos, todo]);
    setTodos([...todos, todo]);
    if (todos.length + 1 > currentPage * todosPerPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    initialTodos.splice(index, 1);
    setInitialTodos(newTodos);
    console.log(todos.length)
    console.log(currentPage)
  };

  const handleToggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    setInitialTodos(newTodos);
  };

  const clearAll = () => {
    const filteredTodos = todos.filter((todo) => todo.completed);
    setTodos(filteredTodos);
    setInitialTodos(filteredTodos);
    setCurrentPage(1);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    setCurrentPage(1); // Reset trang về trang đầu tiên khi tìm kiếm
  };

  const handleSearch = () => {
    const filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchText.length === 0) {
      setTodos([...initialTodos]);
    } else {
      setTodos(filteredTodos);
    }
    setCurrentPage(1); // Reset trang về trang đầu tiên sau khi tìm kiếm
  };
  

  const handleEditTodo = (index, editedTodo) => {
    const newTodos = [...todos];
    newTodos[index] = editedTodo;
    setTodos(newTodos);
    setInitialTodos(newTodos);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(initialTodos.length / todosPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  // Tính chỉ số todo bắt đầu và kết thúc của trang hiện tại
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = todos.length === 0 ? 0 : (currentPage - 1) * todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handleFilter = (filterType) => {
    switch (filterType) {
      case 'completed':
        const completedTodos = initialTodos.filter((todo) => todo.completed);
        setTodos(completedTodos);
        setCurrentPage(1); // Reset lại trang về trang đầu tiên khi lọc
        setLengthPage(Math.ceil(completedTodos.length / todosPerPage));
        break;
  
      case 'pending':
        const pendingTodos = initialTodos.filter((todo) => !todo.completed);
        setTodos(pendingTodos);
        setCurrentPage(1); // Reset lại trang về trang đầu tiên khi lọc
        setLengthPage(Math.ceil(pendingTodos.length / todosPerPage));
        break;
  
      case 'all':
        setTodos([...initialTodos]);
        setCurrentPage(1); // Reset lại trang về trang đầu tiên khi lọc
        setLengthPage(Math.ceil(initialTodos.length / todosPerPage));
        break;
  
      default:
        break;
    }
  };
  
  

  return (
    <div className='App'>
      <div className='todo-app'>
        <h1 className='text-center'>Todo App</h1>
        <TodoForm
          handleAddTodo={handleAddTodo}
          handleSearchTextChange={handleSearchTextChange}
          handleSearch={handleSearch}
          searchText={searchText}
        />
        <TodoList
          todos={currentTodos}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleCompleted={handleToggleCompleted}
          handleEditTodo={handleEditTodo}
          currentPage={currentPage} // Truyền currentPage vào TodoList
          todosPerPage={todosPerPage} // Truyền todosPerPage vào TodoList
          handlePageChange={handlePageChange}
          initialTodos={initialTodos}
          lengthPage={lengthPage}
        />

        <TodoFilter 
          handleFilter={handleFilter}
          />
        <TodoNotify initialTodos={initialTodos} clearAll={clearAll} />


      </div>
    </div>
  );
}

export default App;
