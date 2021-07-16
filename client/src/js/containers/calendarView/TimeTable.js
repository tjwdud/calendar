import React, { useState, useEffect } from 'react';
import 'sass/timetable.css';
import TimeTableCell from 'js/containers/calendarView/TimeTableCell';
import { useTimeTableData } from 'js/stores/timeTableData';
import { makeTimeTable, getCurDateSchedule } from 'js/containers/calendarView/CalendarController';

const TimeTable = () => {    
    const [dates, setDates] = useState([]);
	const [ timeTableData, setTimeTableData] = useTimeTableData();
    let  schedule  = timeTableData.timeTableSchedule;

    const [timeTable, setTimeTable] = useState([
        ' ',
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19
    ]);
    useEffect(
        () => {
            setDates(makeTimeTable);
        }, [ timeTableData ]);

  
    return (
        <div id="timetable-view">
            <div className="hour-col">
                {timeTable.map((a, i) => (
                    <div key={i} className="hour-cell">
                        {a}
                    </div>
                ))}
            </div>
            {dates.map((a, i) => (
                i % 7 !== 0 ?//일요일이 아니면 출력
                    <div key={i} className="weekly-col">
                        {a.map((b, j) => (//j0123456

                            <TimeTableCell
                                mode={'timetable-class'}
                                index={j}
                                key={j}
                                day={a[0]}
                                date={a[1]}
                                startHour={b}
                                schedule={getCurDateSchedule(a[1], b, schedule)}
                            />

                        ))}
                    </div>
                    : null
            ))}
        </div>
    );
};

export default TimeTable
