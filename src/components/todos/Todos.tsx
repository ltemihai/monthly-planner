import React from 'react'
import Todo from './todo/Todo'
import './Todos.css'
import useCalendarState from '../../state/calendarState'

const Todos = () => {

  const selectedDate = useCalendarState(state => state.selectedDate);
  const todos = useCalendarState(state => state.todos)[selectedDate] || [];

  const handleOnAddTodoButton = () => {
    const todoText = prompt('Enter todo text:');
    if (todoText) {
      useCalendarState.getState().addTodo(selectedDate, todoText);
    }
  }

  return (
    <section>
      <div className='todos__header'>
        <h2>Todos</h2>
        <button onClick={() => handleOnAddTodoButton()}>Add Todo</button>
      </div>
      
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className='todos'>
          {todos.map(todo => <Todo 
          key={todo.id}
          todoId={todo.id}
          date={todo.date}
          name={todo.text} 
          isCompleted={todo.isCompleted} />)}
        </ul>
      )}
    </section>
  )
}

export default Todos