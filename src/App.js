import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './Component/TodoForm';
import TodoLish from './Component/TodoLish';
import TodoNotify from './Component/TodoNotify';

function App() {
  const [initialTodos, setInitialTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const storedTodos = localStorage.getItem('todos')  

  useEffect(()=>{
    if (storedTodos){
      setInitialTodos(JSON.parse(storedTodos));
      setTodos(JSON.parse(storedTodos));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = (todo) => {
    setInitialTodos([...initialTodos, todo]);
    setTodos([...todos, todo]);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const clearAll = () => {
    const filteredTodos = todos.filter((todo) => todo.completed);
    setTodos(filteredTodos);
    setInitialTodos(filteredTodos)
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);

  };

  const handleSearch = () => {
    const filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase())
    );
    if (searchText.length === 0) {
      setTodos([...initialTodos]); // Không tìm thấy kết quả, hiển thị lại danh sách ban đầu
    } else {
      setTodos(filteredTodos); // Tìm thấy kết quả, hiển thị danh sách lọc
    }
  };

  
  const handleEditTodo = (index, editedTodo) => {
    const newTodos = [...todos];
    newTodos[index] = editedTodo;
    setTodos(newTodos);
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
        <TodoLish todos={todos} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} handleEditTodo = {handleEditTodo }/>
        <TodoNotify todos={todos} clearAll={clearAll} />
      </div>
    </div>
  );
}

export default App;
