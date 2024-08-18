import React from 'react'
import Todo from './todo/Todo'
import './Todos.css'
import useCalendarState from '../../state/calendarState'
import { FaPlus } from 'react-icons/fa6'
import Button from '../shared/button/Button'

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
        <Button icon={<FaPlus></FaPlus>} text='Add' onClick={() => handleOnAddTodoButton()} />
      </div>
      
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className='todos'>
          {todos
            .sort((t1, t2) => (t1.isCompleted === t2.isCompleted) ? 0 : t1.isCompleted ? 1 : -1)
            .map(todo => (
              <Todo 
                key={todo.id}
                todoId={todo.id}
                date={todo.date}
                name={todo.text} 
                isCompleted={todo.isCompleted} 
              />
            ))}
        </ul>
      )}
    </section>
  )
}

export default Todos