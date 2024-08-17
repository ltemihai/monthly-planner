import React from 'react'
import './Todo.css'
import useCalendarState from '../../../state/calendarState';

type TodoProps = {
  todoId: string;
  date: string
  name: string;
  isCompleted: boolean;
}

const Todo = (props: TodoProps) => {

  const handleOnCompleteButton = () => {
    useCalendarState.getState().markTodo(props.todoId, props.date, true);
  }

  return (
    <li className={`todo ${props.isCompleted ? 'todo__completed' : ''}`}>
        <h3>{props.name}</h3>
        <div>
            {!props.isCompleted && <button onClick={() => handleOnCompleteButton()}>Complete</button>}
        </div>
    </li>
  )
} 

export default Todo