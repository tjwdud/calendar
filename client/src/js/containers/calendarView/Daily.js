import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import { getScheduleDaily } from 'js/containers/components/UserDataController';
import { useCalendarState } from 'js/stores/calendarState';
import { useUserData } from 'js/stores/userData';

const Daily = () => {
    const [calendarState, setCalendarState] = useCalendarState();
    const { date } = calendarState;

    const [userData, setUserData] = useUserData();
    const { schedule } = userData;
    const [curSchedule, setCurSchedule] = useState([]);
    const [curDateStr, setCurDateStr] = useState('');


    useEffect(
        () => {
            const { curDailyDate } = getDailyDate();
            setCurSchedule(getScheduleDaily(curDailyDate, schedule));
            let newCurDateStr = date.getDate();
       
            setCurDateStr(newCurDateStr);
        },
        [ userData, date ]
    )




    console.log(curSchedule)
    const getDailyDate = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const curDailyDate = new Date(year, month, day);

        return { curDailyDate: curDailyDate };
    }

    return (
        <div id="daily-view">
            <div id="main-class">
                <p>본수업</p>
                <p>{curDateStr}</p>
                {curSchedule.map((a, i) => (
                    <div key={i} className="daily-schedule">
                        <p>{a.title}</p>
                        <p>{a.startHour + '시' + a.startMinute + '분 ~' + a.endHour + '시' + a.endMinute + '분'}</p>
                        {
                            a.students.map((b, j) => (
                                <p
                                    key={j}
                                >
                                    {b.name}
                                </p>
                            ))
                        }

                    </div>
                ))}

            </div>
            <div id="free-class">
                <p>자유수업</p>
            </div>
        </div>
    )
};

export default Daily
