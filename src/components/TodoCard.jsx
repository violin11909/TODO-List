import React from 'react'

export default function TodoCard(props) {
  const {children, handleDeleteTodo, index, handleEditTodo} = props;
  
  return (
    <li className="todoItem">
      {children}
      <div className="actionsContainer">
        <button>
          <i class="fa-solid fa-arrow-up"></i>
        </button>

        <button>
          <i class="fa-solid fa-arrow-down"></i>
        </button>

        <button onClick={() => {
          handleEditTodo(index)
        }}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button onClick={() => {
          handleDeleteTodo(index)
        }}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  )
}
