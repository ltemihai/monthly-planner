import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../services/firebaseService';
import debounce from 'debounce';

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
    setState(
        selectedDate: string,
        currentDate: string,
        todos: { [key: string]: Todo[] },
        notes: { [key: string]: string },
        meetings: { [key: string]: Meeting[] }
    ): void;
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
        setState: (
            selectedDate: string,
            currentDate: string,
            todos: { [key: string]: Todo[] },
            notes: { [key: string]: string },
            meetings: { [key: string]: Meeting[] }
        ) => set({
            selectedDate,
            currentDate,
            todos,
            notes,
            meetings
        }
        )
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
        setState: (
            selectedDate: string,
            currentDate: string,
            todos: { [key: string]: Todo[] },
            notes: { [key: string]: string },
            meetings: { [key: string]: Meeting[] }
        ) => set({
            selectedDate,
            currentDate,
            todos,
            notes,
            meetings
        }
        )
    };
});

if (localStorage.getItem('firebaseConfig')) {
    FirebaseService().getFirestoreData().then(() => {
        const data = JSON.parse(localStorage.getItem('calendarState')!);
        useCalendarState.setState({
            selectedDate: data.selectedDate,
            currentDate: data.currentDate,
            todos: data.todos,
            notes: data.notes,
            meetings: data.meetings
        }
        );
    });
}

useCalendarState.subscribe(async (state) => {
    localStorage.setItem('calendarState', JSON.stringify({
        selectedDate: state.selectedDate,
        currentDate: state.currentDate,
        todos: state.todos,
        notes: state.notes,
        meetings: state.meetings
    }));
    if (localStorage.getItem('firebaseConfig')) {
        const debouncedPostFirestoreData = debounce(() => {
            FirebaseService().postFirestoreData({
            selectedDate: state.selectedDate,
            currentDate: state.currentDate,
            todos: state.todos,
            notes: state.notes,
            meetings: state.meetings
            });
        }, 10000);

        debouncedPostFirestoreData();
    }
});

export default useCalendarState;