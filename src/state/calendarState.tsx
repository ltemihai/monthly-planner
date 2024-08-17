import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
    id: string;
    text: string;
    isCompleted: boolean;
    date: string;
};

type Meeting = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    date: string;
};

type CalendarState = {
    selectedDate: string;
    currentDate: string;
    todos: { [key: string]: Todo[] };
    notes: { [key: string]: string };
    meetings: { [key: string]: Meeting[] };
    setCurrentDate(date: string): void;
    setSelectedDate(date: string): void;
    setNotes(date: string, text: string): void;
    addTodo(date: string,text: string): void;
    markTodo(id: string, date:string, isCompleted: boolean): void;
};



const useCalendarState = create<CalendarState>((set) => {
    const storedState = localStorage.getItem('calendarState');
    const initialState = storedState ? JSON.parse(storedState) : {
        selectedDate: new Date().toDateString(),
        currentDate: new Date().toDateString(),
        todos: {},
        notes: {},
        meetings: {},
        setCurrentDate: (date: string) => set({ currentDate: date }),
        setSelectedDate: (date: string) => set({ selectedDate: date }),
        setNotes: (date: string, text: string) =>
            set((state) => ({
                notes: {
                    ...state.notes,
                    [date]: text,
                },
            })),
        addTodo: (date: string, text: string) =>
            set((state) => ({
                todos: {
                    ...state.todos,
                    [date]: [
                        ...(state.todos[date] || []),
                        {
                            id: uuidv4(),
                            text,
                            isCompleted: false,
                            date,
                        },
                    ],
                },
            })),
        markTodo: (id: string, date: string, isCompleted: boolean) =>
            set((state) => {
                const todos = state.todos[date];
                const todoIndex = todos.findIndex((todo) => todo.id === id);
                console.log(todos, id);
                if (todoIndex !== -1) {
                    todos[todoIndex].isCompleted = isCompleted;
                }

                return {
                    todos: {
                        ...state.todos,
                        [date]: todos,
                    },
                };
            }),
    };

    set(initialState);

    return {
        ...initialState,
        currentDate: new Date().toDateString(),
        selectedDate: new Date().toDateString(),
        setCurrentDate: (date) => set({ currentDate: date }),
        setSelectedDate: (date) => set({ selectedDate: date }),
        setNotes: (date, text) =>
            set((state) => ({
                notes: {
                    ...state.notes,
                    [date]: text,
                },
            })),
        addTodo: (date, text) =>
            set((state) => ({
                todos: {
                    ...state.todos,
                    [date]: [
                        ...(state.todos[date] || []),
                        {
                            id: uuidv4(),
                            text,
                            isCompleted: false,
                            date,
                        },
                    ],
                },
            })),
        markTodo: (id: string, date: string, isCompleted: boolean) =>
            set((state) => {
                const todos = state.todos[date];
                const todoIndex = todos.findIndex((todo) => todo.id === id);
                console.log(todos, id);
                if (todoIndex !== -1) {
                    todos[todoIndex].isCompleted = isCompleted;
                }

                return {
                    todos: {
                        ...state.todos,
                        [date]: todos,
                    },
                };
            }),
    };
});

useCalendarState.subscribe((state) => {
    localStorage.setItem('calendarState', JSON.stringify(state));
});

export default useCalendarState;