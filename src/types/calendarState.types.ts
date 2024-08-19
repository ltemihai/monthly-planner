import { Todo } from "./todo.types";

export type CalendarState = CalendarModel & {
    setCurrentDate(date: string): void;
    setSelectedDate(date: string): void;
    setNotes(date: string, text: string): void;
    addTodo(date: string, text: string): void;
    markTodo(id: string, date: string, isCompleted: boolean): void;
    setState(state: CalendarModel): void;
};

export type CalendarModel = {
    selectedDate: string;
    currentDate: string;
    todos: { [key: string]: Todo[] };
    notes: { [key: string]: string };
}