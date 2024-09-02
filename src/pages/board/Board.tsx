import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import './board.css'
import useFirebaseState from "../../state/firesbaseState";
import useCalendarState from "../../state/calendarState";
import { FaPlus } from "react-icons/fa6";

const TaskOrder = ['todo', 'inProgress', 'done'];

type Task = {
    id: string;
    title: string;
}

export type Tasks = {
    [key: string]: Task[];
    todo: Task[];
    inProgress: Task[];
    done: Task[];
}

const Board = () => {

    const tasks = useCalendarState(state => state.tasks || {
        todo: [],
        inProgress: [],
        done: []
    });

    const handleAddTask = (status: string) => {
        const taskText = prompt(`Add a ${status.charAt(0).toUpperCase()}${status.slice(1)} task:`);
        if (taskText) {
            const taskId = Date.now().toString();
            useCalendarState.getState().addTask(taskId, status, taskText);
            useFirebaseState.getState().setSyncing(true);
        }
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        console.log(source, destination);

        if (!destination) {
            return;
        }

        useCalendarState.getState().updateTask(tasks[source.droppableId][source.index].id, source.droppableId, destination.droppableId);
        useFirebaseState.getState().setSyncing(true);
      };

    

    return (
    <div className='calendar-app'>
        <main className='calendar-app__main'>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board">
                    {TaskOrder.map((key) => (
                    <Droppable key={key} droppableId={key}>
                        {(provided) => (
                        <div
                            className="lane"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className="lane__title">
                                <h2>{key.toUpperCase()}</h2>
                                <FaPlus className="pointer" onClick={() => handleAddTask(key)}></FaPlus>
                            </div>
                            
                            <div className="lane__tasks">
                                {tasks[key].map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                    <div
                                        className={`task ${key}`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {task.title}
                                    </div>
                                    )}
                                </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                        )}
                    </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </main>
    </div>
    )
}

export default Board