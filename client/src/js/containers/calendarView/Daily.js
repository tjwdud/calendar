import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/daily.css';

import { getScheduleDaily } from 'js/containers/components/UserDataController';
import { useCalendarState } from 'js/stores/calendarState';
import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import DailyMainCell from './DailyMainCell';
import DailyFreeCell from './DailyFreeCell';

const Daily = (props) => {
    const curDate = new Date(props.curDate);
    const [calendarState, setCalendarState] = useCalendarState();
    const { date } = calendarState;

    let week = ['일', '월', '화', '수', '목', '금', '토',]

    let newCurDate = curDate.getFullYear() + '년 ' + (curDate.getMonth() + 1) + '월 ' + (curDate.getDate()) + '일' + (week[(curDate.getDay()) % 7]) + '요일';

    const [userData, setUserData] = useUserData();
    const [freeUserData, setFreeUserData] = useFreeUserData();
    const { schedule } = userData;
    const { freeSchedule } = freeUserData;
    const [curSchedule, setCurSchedule] = useState([]);
    const [curFreeSchedule, setCurFreeSchedule] = useState([]);



    useEffect(
        () => {
            const { curDailyDate } = getDailyDate();
            setCurSchedule(getScheduleDaily(curDate, schedule));
            setCurFreeSchedule(getScheduleDaily(curDate, freeSchedule));
        }, [userData, props, freeUserData]
    );
    const getDailyDate = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const curDailyDate = new Date(year, month, day);

        return { curDailyDate: curDailyDate };
    }

    return (

        <div id="daily-view">
            <div>
                <p id="date-str">{newCurDate}</p>
                <div id="main-class">
                    <DailyMainCell
                        date={curDate}
                        schedule={curSchedule}
                    />
                </div>
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

export default Daily;