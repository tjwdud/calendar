import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/daily.css';

import { getScheduleDaily } from 'js/containers/components/UserDataController';
import { useCalendarState } from 'js/stores/calendarState';
import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import DailyMainCell from './DailyMainCell';
import DailyFreeCell from './DailyFreeCell';

const Daily = () => {
    const [calendarState, setCalendarState] = useCalendarState();
    const { date } = calendarState;

    const [userData, setUserData] = useUserData();
    const [freeUserData, setFreeUserData ] = useFreeUserData();
    const { schedule } = userData;
    const { freeSchedule } = freeUserData;
    const [curSchedule, setCurSchedule] = useState([]);
    const [curFreeSchedule, setCurFreeSchedule] = useState([]);
    const [curDate, setCurDate] = useState('');
    console.log(userData);

    useEffect(
        () => {
            const { curDailyDate } = getDailyDate();
            setCurSchedule(getScheduleDaily(curDailyDate, schedule));
            setCurFreeSchedule(getScheduleDaily(curDailyDate,freeSchedule));
          
        },
        [ userData, date, freeUserData ]
    )
    const getDailyDate = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const curDailyDate = new Date(year, month, day);
        setCurDate(curDailyDate);
        return { curDailyDate: curDailyDate };
    }
 
    return (
        <div id="daily-view">
            <div id="main-class">
                <DailyMainCell
                    date={curDate}
                    schedule={curSchedule}
                    />
            </div>
            <div id="free-class">
                <DailyFreeCell
                    date={curDate}
                    freeSchedule={curFreeSchedule}
                    />
            </div>
        </div>
    )
};

export default Daily