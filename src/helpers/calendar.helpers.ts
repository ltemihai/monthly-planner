export const getDaysInMonth = (currentDate: Date) => new Date(new Date().getFullYear(), currentDate.getMonth() + 1, 0).getDate();

export const getSkippedDaysInMonth = (currentDate: Date) => new Date(new Date().getFullYear(), currentDate.getMonth(), 1).getDay() - 1 < 0 ? 6 : new Date(new Date().getFullYear(), currentDate.getMonth(), 1).getDay() - 1;

export const getNumberOfCalnedarRows = (daysInMonth: number, numberOfSkippedDays: number) => Math.ceil((daysInMonth + numberOfSkippedDays) / 7);

export const isSameDate = (firstDate: Date, secondDate: Date, day: number) => new Date(firstDate.getFullYear(), firstDate.getMonth(), day).toDateString() === secondDate.toDateString();