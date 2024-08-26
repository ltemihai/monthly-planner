import './Todo.css'
import useCalendarState from '../../../state/calendarState';
import { FaCheck } from 'react-icons/fa6';
import Button from '../../shared/button/Button';
import useToastStore from '../../../state/toastState';
import { ToastEnum } from '../../../enums/toast.enum';
import useFirebaseState from '../../../state/firesbaseState';

type TodoProps = {
  todoId: string;
  date: string
  name: string;
  isCompleted: boolean;
}

const Todo = (props: TodoProps) => {

  const addToast = useToastStore((state) => state.addToast);

  const handleOnCompleteButton = (text: string) => {
    useCalendarState.getState().markTodo(props.todoId, props.date, true);
    useFirebaseState.getState().setSyncing(true);
    addToast(`${text} completed!`, ToastEnum.SUCCESS);
  }

  return (
    <li className={`todo ${props.isCompleted ? 'todo__completed' : ''}`}>
        <h3>{props.name}</h3>
        <div>
            {!props.isCompleted && <Button text='Complete' icon={<FaCheck></FaCheck>} onClick={() => handleOnCompleteButton(props.name)}/>}
        </div>
    </li>
  )
}  

export default Todo