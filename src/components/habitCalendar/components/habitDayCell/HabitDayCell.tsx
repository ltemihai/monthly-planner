import React from 'react';
import {isSameDate} from "../../../../helpers/calendar.helpers.ts";
import useCalendarState from "../../../../state/calendarState.tsx";
import useFirebaseState from "../../../../state/firesbaseState.tsx";
import {CiMedal} from "react-icons/ci";

import './HabitDayCell.css'
import useToastStore from "../../../../state/toastState.tsx";
import {ToastEnum} from "../../../../enums/toast.enum.ts";

const HabitDayCell = (currentDate: Date,
                      day: number
) => {

    const getDateKey = (currentDate: Date, day: number) => {
        const dateKey = new Date(currentDate);
        dateKey.setDate(day);
        return dateKey.toDateString();
    }

    const addToast = useToastStore((state) => state.addToast);

    const dateKey = getDateKey(currentDate, day)

    const markHabit = useCalendarState(state => state.markHabit);
    const habit = useCalendarState((state) => {
        return state.habits?.['habit']?.[dateKey]
    })

    const isCurrentDateSelected = isSameDate(currentDate, new Date(), day);
    const setSyncing = useFirebaseState(state => state.setSyncing);

    const onHabitClicked = () => {
        markHabit('habit', dateKey, !habit);
        setSyncing(true);
        if (!habit) {
            addToast("Keep it going! Never give up!", ToastEnum.VICTORY);
        }

    }

    const getDayCellClass = (isCurrentDateSelected: boolean) => {
        const classes = ['habitDays__day', 'pointer'];
        if (isCurrentDateSelected) {
            classes.push('habitDays__day--current ');
        }
        return classes.join(' ');
    }


    return <td
        onClick={() => onHabitClicked()}
        className={getDayCellClass(isCurrentDateSelected)}
        key={day}>
            {habit && <CiMedal className='medal'/>}
            <div className="habitDays__day__number">
                {day}
            </div>
    </td>
}

export default HabitDayCell;
