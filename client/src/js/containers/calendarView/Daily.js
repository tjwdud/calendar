import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import { getScheduleDaily } from 'js/containers/components/UserDataController';
import { useCalendarState } from 'js/stores/calendarState';
import { useUserData } from 'js/stores/userData';
import DailyMainCell from './DailyMainCell';

const Daily = () => {
    const [calendarState, setCalendarState] = useCalendarState();
    const { date } = calendarState;

    const [userData, setUserData] = useUserData();
    const { schedule } = userData;
    const [curSchedule, setCurSchedule] = useState([]);
    const [curDateStr, setCurDateStr] = useState('');
    const [curDate, setCurDate] = useState('');

    useEffect(
        () => {
            const { curDailyDate } = getDailyDate();
            setCurSchedule(getScheduleDaily(curDailyDate, schedule));
            //let newCurDateStr = date.getDate();
       
            //setCurDateStr(newCurDateStr);
        },
        [ userData, date ]
    )




    const getDailyDate = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const curDailyDate = new Date(year, month, day);
        setCurDate(curDailyDate);
        return { curDailyDate: curDailyDate };
    }
    console.log(curSchedule)
    console.log(curDate)
    return (
        <div id="daily-view">
            <div id="main-class">
                <p>본수업</p>
                <p>{curDateStr}</p>
                <DailyMainCell
                    date={curDate}
                    schedule={curSchedule}
                    />
            </div>
            <div id="free-class">
                <p>자유수업</p>
            </div>
        </div>
    )
};

export default Daily