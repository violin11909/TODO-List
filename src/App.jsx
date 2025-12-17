import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({
      todos: newList
    }))
  }

  function handleAddTodos(newTodo) {
    if (newTodo === '') {
      return;
    }
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  function handleSwitchOrder(index, direction) {
    if ((direction === 'up' && index === 0) ||
        (direction == 'down' && index === todos.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newTodoList = [...todos];
    [newTodoList[index], newTodoList[newIndex]] = [newTodoList[newIndex], newTodoList[index]];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos');
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, [])

  return (
    <main>
      <TodoInput 
        todoValue={todoValue} 
        setTodoValue={setTodoValue} 
        handleAddTodos={handleAddTodos}/>
      <TodoList 
        handleDeleteTodo={handleDeleteTodo} 
        handleEditTodo={handleEditTodo} 
        handleSwitchOrder={handleSwitchOrder}
        todos={todos}/>
    </main>
  )
}

export default App
