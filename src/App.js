import { useEffect, useRef, useState } from "react";

function App() {
  
  // State 
  const [todos, setTodos] = useState([]);

  const todoText = useRef();
  const todoList = useRef();

  useEffect(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  }, []);

  function addTodo(event) {
    event.preventDefault();
    const next = [...todos, todoText.current.value];
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
    todoText.current.value = '';
  }

  function removeLatestTodo(event) {
    event.preventDefault();
    window.localStorage.removeItem('todos');
    todoList.current.removeChild(todoList.current.children[0]);
  }

  function removeAllTodos(event) {
    event.preventDefault();
    window.localStorage.removeItem('todos');
    while (todoList.current.firstChild) {
      
      todoList.current.removeChild(todoList.current.children[0]);
    };
  }

  return (
    <div>

      <ul ref={todoList}>
        {todos.map(todo => (<li key={todo}>{todo}</li>))}
      </ul>

      <form onSubmit={addTodo}>
        <input ref={todoText}></input>
        <input type="submit" value="Add Todo"></input>
        <input type="submit" value="Remove Todo" onClick={removeLatestTodo}></input>
      </form>

      <form onSubmit={removeAllTodos}>
        <input type="submit" value="Remove All Todos"></input>
      </form>

    </div>
  )
}

export default App;
