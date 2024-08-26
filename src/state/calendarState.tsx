import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../services/firebaseService';
import { getLocalStorageValue, setLocalStorageValue } from '../helpers/localStorage.helpers';
import { LocalStorageKeys } from '../enums/localStorageKeys.enum';
import { stringifyJson } from '../helpers/json.helpers';
import { CalendarModel, CalendarState } from '../types/calendarState.types';
import { FirebaseConfig } from '../types/firebase.types';
import useFirebaseState from './firesbaseState';

const useCalendarState = create<CalendarState>((set) => {
    const storedState = getLocalStorageValue<CalendarState>(LocalStorageKeys.CALENDAR_STATE);
    const initialState = storedState ?? {
        selectedDate: new Date().toDateString(),
        currentDate: new Date().toDateString(),
        todos: {},
        notes: {},
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
                const newTodos = state.todos[date];
                const todoIndex = newTodos.findIndex((todo) => todo.id === id);
                if (todoIndex !== -1) {
                    newTodos[todoIndex].isCompleted = isCompleted;
                }

                return {
                    todos: {
                        ...state.todos,
                        [date]: newTodos,
                    },
                };
            }),
        setState: (calendarState: CalendarModel) => set((state) => {
            return {
                ...state,
                ...calendarState
            }
        })
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
                const newTodos = state.todos[date];
                const todoIndex = newTodos.findIndex((todo) => todo.id === id);
                if (todoIndex !== -1) {
                    newTodos[todoIndex].isCompleted = isCompleted;
                }

                return {
                    todos: {
                        ...state.todos,
                        [date]: newTodos,
                    },
                };
            }),
        setState: (calendarState: CalendarModel) => set((state) => {
            return {
                ...state,
                ...calendarState
            }
        })
    };
});


export const startFirebaseSync = async () => {
    let lastState = {}
    setInterval(async () => {
        const state = useCalendarState.getState();
        if (stringifyJson(state) === stringifyJson(lastState)) {
            return;
        }
        lastState = state;
        await FirebaseService().postFirestoreData({
            selectedDate: state.selectedDate,
            currentDate: state.currentDate,
            todos: state.todos,
            notes: state.notes,
        });
        useFirebaseState.getState().setSyncing(false);
    }, 5000);
}

if (getLocalStorageValue<FirebaseConfig>(LocalStorageKeys.FIREBASE_CONFIG)) {
    FirebaseService().getFirestoreData().then(() => {
        const data = getLocalStorageValue<CalendarModel>(LocalStorageKeys.CALENDAR_STATE)!;
        useCalendarState.setState(data);

        startFirebaseSync();
    });
}

useCalendarState.subscribe(async (state) => {
    setLocalStorageValue(LocalStorageKeys.CALENDAR_STATE, {
        selectedDate: state.selectedDate,
        currentDate: state.currentDate,
        todos: state.todos,
        notes: state.notes,
    });
});


export default useCalendarState;