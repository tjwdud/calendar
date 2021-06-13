import React, { useState, useEffect } from 'react';
import 'sass/timetable.css';
import TimeTableCell from'../components/TimeTableCell';
import { useTimeTableData } from 'js/stores/timeTableData';

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


    const makeTimeTable = () => {
        let tempDate = new Date(2021, 2, 0);
        const newDates = [['일'], ['월'], ['화'], ['수'], ['목'], ['금'], ['토']];
        const tempTime = [12, 13, 14, 15, 16, 17, 18, 19];
        for (let i = 0; i < 7; i++) {
            newDates[i].push(tempDate);
            newDates[i] = newDates[i].concat(tempTime);
            tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);//다음날

        }
        return newDates.slice();
    };

	const getCurDateSchedule = (curDate, startHour) => {
		let curDateSchedule = [];
		schedule.forEach((date) => {
			if (date.curDate.getTime() === curDate.getTime() && date.startHour === startHour) {
				curDateSchedule.push(date);
			}
		});
		

		return curDateSchedule;
	};
  
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
                                index={j}
                                key={j}
                                day={a[0]}
                                date={a[1]}
                                startHour={b}
                                schedule={getCurDateSchedule(a[1], b)}



                            />


                        ))}
                    </div>
                    : null
            ))}

        </div>

    );
};

export default TimeTable
