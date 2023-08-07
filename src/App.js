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
  const todosPerPage = 5;
  const storedTodos = localStorage.getItem('todos');

  useEffect(() => {
    if (storedTodos) {
      setInitialTodos(JSON.parse(storedTodos));
      setTodos(JSON.parse(storedTodos));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setInitialTodos([...initialTodos, todo]);
    setTodos([...todos, todo]);
  };

  useEffect(() => {
    // Nếu không có todo nào trong danh sách, set lại currentPage về 1
    if (todos.length % 5 === 0) {
      setCurrentPage(todos.length/5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    initialTodos.splice(index, 1);
    setInitialTodos(newTodos);
    console.log(todos.length)
    console.log(currentPage)
  };

  const toggleCompleted = (index) => {
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
    setCurrentPage(pageNumber);
  };

  // Tính chỉ số todo bắt đầu và kết thúc của trang hiện tại
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handleFilter = (filterType) => {
    switch (filterType) {
      case 'completed':
        const completedTodos = initialTodos.filter((todo) => todo.completed);
        if (completedTodos.length === 0) {
          setTodos([]);
        } else {
          setTodos(completedTodos);
        }
        break;

      case 'pending':
        const pendingTodos = initialTodos.filter((todo) => !todo.completed);
        if (pendingTodos.length === 0) {
          setTodos([]);
        } else {
          setTodos(pendingTodos);
        }
        break;
        
      case 'all':
        setTodos([...initialTodos]);
        break;
      default:
        break;
    }
  };
  

  return (
    <div className='App'>
      <div className='TodoApp'>
        <h1 className='text-center'>Todo App</h1>
        <TodoForm
          addTodo={addTodo}
          handleSearchTextChange={handleSearchTextChange}
          handleSearch={handleSearch}
          searchText={searchText}
        />
        <TodoList
          todos={currentTodos}
          deleteTodo={deleteTodo}
          toggleCompleted={toggleCompleted}
          handleEditTodo={handleEditTodo}
          currentPage={currentPage} // Truyền currentPage vào TodoList
          todosPerPage={todosPerPage} // Truyền todosPerPage vào TodoList
          handlePageChange={handlePageChange}
          initialTodos={initialTodos}
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
