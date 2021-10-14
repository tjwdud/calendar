import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/daily.css';

import { getScheduleDaily } from 'js/containers/components/UserDataController';
import { useCalendarState } from 'js/stores/calendarState';
import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import DailyMainCell from './DailyMainCell';
import DailyFreeCell from './DailyFreeCell';
import Daily from './Daily';

const Dailyview = () => {
    const [calendarState, setCalendarState] = useCalendarState();
    const { date } = calendarState;


    const [userData, setUserData] = useUserData();
    const [freeUserData, setFreeUserData] = useFreeUserData();
    const { schedule } = userData;
    const { freeSchedule } = freeUserData;
    const [curSchedule, setCurSchedule] = useState([]);
    const [curFreeSchedule, setCurFreeSchedule] = useState([]);
    const [curDate, setCurDate] = useState('');
    const [nextDate, setNextDate] = useState('');
    useEffect(
        () => {
            const { curDailyDate, curDailyNextDate } = getDailyDate();
            setCurDate(curDailyDate);
            setNextDate(curDailyNextDate);
        },
        [date]
    )
    const getDailyDate = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        if (date.getDay() === 0) {//오늘이 일요일이면 월요일로 설정
            let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);//월요일로 
            setCalendarState({ ...calendarState, date: newDate });
        }
        else if (date.getDay() % 2 === 0) {//짝수면 전날로 
            let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
            setCalendarState({ ...calendarState, date: newDate });

        }
        const curDailyDate = new Date(year, month, day);
        const curDailyNextDate = new Date(year, month, day + 1);
        setCurDate(curDailyDate);
        setNextDate(curDailyNextDate);
        return { curDailyDate: curDailyDate, curDailyNextDate: curDailyNextDate };
    }

    return (
        <div id="daily-view-parent">
            <Daily curDate={curDate} />
            <Daily curDate={nextDate} />
        </div>
    )
};

export default Dailyview;