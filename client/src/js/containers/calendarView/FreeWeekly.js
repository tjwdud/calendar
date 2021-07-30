import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/weekly.css';
import 'antd/dist/antd.css';
import WeeklyCell from './WeeklyCell';
import { getSchedule } from 'js/containers/components/UserDataController';
import { makeCalendar, convertTimetableDate, getCurDateSchedule } from 'js/containers/calendarView/CalendarController';
// store
import { useCalendarState } from 'js/stores/calendarState';
import { insertDate } from 'js/containers/components/UserDataController';

import { useFreeUserData } from 'js/stores/freeUserData';
import { useFreeTimeTableData } from 'js/stores/freeTimeTableData';

import { Button } from 'antd';

const FreeWeekly = () => {
    const [calendarState, setCalendarState] = useCalendarState();
	const { date } = calendarState;
	const [freeTimeTableData, setFreeTimeTableData] = useFreeTimeTableData();
	const freeTimetableValue = freeTimeTableData.freeTimeTableSchedule;
	const [dates, setDates] = useState([]);
	const [timeTable, setTimeTable] = useState([
		' ',
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
    const [freeUserData, setfreeUserData] = useFreeUserData();
    const { freeSchedule } = freeUserData;
	const [curSchedule, setCurSchedule] = useState([]);

	useEffect(
		() => {
			const { firstDate, lastDate } = getFirstAndLastDate();
			setDates(makeCalendar(firstDate, lastDate));
			setCurSchedule(getSchedule(firstDate, lastDate, freeSchedule));

		},
		[date]
	);

	useEffect(
		() => {
			const { firstDate, lastDate } = getFirstAndLastDate();
			setCurSchedule(getSchedule(firstDate, lastDate, freeSchedule));
		},
		[freeUserData]
	);


	const getFirstAndLastDate = () => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDay();
		const firstDate = new Date(year, month, date.getDate() - day);
		const lastDate = new Date(year, month, date.getDate() + (6 - day));
		return { firstDate: firstDate, lastDate: lastDate };
	};

	const addTimetableFunction = (afterConvertTimetable) => {
		let newSchedule = [];
		newSchedule = freeSchedule;
		let i = 0;
		for (i = 0; afterConvertTimetable.length > i; i++) {
			newSchedule = insertDate(afterConvertTimetable[i], newSchedule);
		}
		setfreeUserData({ ...freeUserData, freeSchedule: newSchedule });
	}

	const onClickTimeTableBtn = (e) => {
        const { firstDate } = getFirstAndLastDate();
        if (freeTimetableValue.length === 0) { alert('시간표가 비어있습니다.'); return; }

		addTimetableFunction(convertTimetableDate(firstDate, freeTimetableValue));
	}
    return (
        <div id="weekly-view">
            <Button id="timetable-call-btn" onClick={onClickTimeTableBtn}>시간표 불러오기</Button>
            <div id="weekly-view">
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

                                <WeeklyCell
                                    key={j}
                                    class_mode={'free-class'}
                                    index={j}
                                    day={a[0]}//요일
                                    date={a[1]}//날짜
                                    startHour={b}
                                    schedule={getCurDateSchedule(a[1], b, curSchedule)}
                                />

                            ))}
                        </div>
                        : null
                ))}
            </div>
        </div>
    );
};

export default FreeWeekly;
