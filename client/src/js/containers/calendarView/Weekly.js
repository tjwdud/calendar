import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/weekly.css';
import 'antd/dist/antd.css';
import WeeklyCell from './WeeklyCell';
import { getSchedule } from 'js/containers/components/UserDataController';
// store
import { useCalendarState } from 'js/stores/calendarState';
import { insertDate } from 'js/containers/components/UserDataController';

import { useUserData } from 'js/stores/userData';
import { useTimeTableData } from 'js/stores/timeTableData';

import { Button } from 'antd';

const Weekly = () => {
	const [calendarState, setCalendarState] = useCalendarState();
	const { date } = calendarState;
	const [timeTableData, setTimeTableData] = useTimeTableData();
	const timetableValue = timeTableData.timeTableSchedule;
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

	const [userData, setUserData] = useUserData();
	const { schedule } = userData;

	const [curSchedule, setCurSchedule] = useState([]);
	const [btnMode, setBtnMode]= useState(false);

	useEffect(
		() => {
			const { firstDate, lastDate } = getFirstAndLastDate();
			setDates(makeCalendar(firstDate, lastDate));
			setBtnMode(true);
		},
		[date]
	);

	useEffect(
		() => {
			const { firstDate, lastDate } = getFirstAndLastDate();
			setCurSchedule(getSchedule(firstDate, lastDate, schedule));
		},
		[userData]
	);


	const getFirstAndLastDate = () => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDay();

		const firstDate = new Date(year, month, date.getDate() - day);
		const lastDate = new Date(year, month, date.getDate() + (6 - day));
		return { firstDate: firstDate, lastDate: lastDate };
	};

	const makeCalendar = (firstDate, lastDate) => {
		let tempDate = new Date(firstDate);//첫번째 날짜 가져와
		const newDates = [['일'], ['월'], ['화'], ['수'], ['목'], ['금'], ['토']];
		const tempTime = [12, 13, 14, 15, 16, 17, 18, 19];
		let index = 0;
		while (tempDate.getDate() !== lastDate.getDate()) {
			newDates[index].push(tempDate);//0 요일 인덱스에 현재 날짜 붙여
			newDates[index] = newDates[index].concat(tempTime);//시간븉요
			tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);//다음날
			index++;
		}
		newDates[index].push(tempDate);
		newDates[index] = newDates[index].concat(tempTime);
		setCurSchedule(getSchedule(firstDate, lastDate, schedule));
		return newDates.slice();
	};

	const getCurDateSchedule = (curDate, startHour) => {
		let curDateSchedule = [];
		curSchedule.forEach((date) => {
			if (date.curDate.getTime() === curDate.getTime() && date.startHour === startHour) {
				curDateSchedule.push(date);
			}
		});


		return curDateSchedule;
	};
	const dateChange = (firstDate) => {
		let newTimetableSchedule = [];
		if (timetableValue.length === 0) { alert('시간표가 비어있습니다.'); return; }

		newTimetableSchedule = JSON.parse(JSON.stringify(timetableValue));//깊은 복사를 위해 
		newTimetableSchedule = newTimetableSchedule.map((a) => {
			return { ...a, curDate: new Date(a.curDate) };//깊은복사시 Date값이 달라지기 때문에 
		})
		let i = 0;
		//시간표 스케줄들을 가져와서 현재 날짜 기준으로 바꿔준다.
		for (i = 0; newTimetableSchedule.length > i; i++) {

			switch (newTimetableSchedule[i].curDate.getDate()) {
				case 1: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1);
					break;
				case 2: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 2);
					break;
				case 3: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 3);
					break;
				case 4: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 4);
					break;
				case 5: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 5);
					break;
				case 6: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 6);
					break;
				default:
					break;

			}

		}
		let newSchedule = [];
		newSchedule = schedule;

		for (i = 0; newTimetableSchedule.length > i; i++) {
			newSchedule = insertDate(newTimetableSchedule[i], newSchedule);
		}
		setUserData({ ...userData, schedule: newSchedule });


	}

	const onClickTime = (e) => {
		//e.currentTarget.disabled = true;

		const { firstDate } = getFirstAndLastDate();
		dateChange(firstDate);
		setBtnMode(false);
	}
	return (
		<div id="weekly-view">
			{btnMode ? <Button id="timetable-call-btn" onClick={onClickTime}>시간표 불러오기</Button> :
				<Button id="timetable-call-btn" disabled onClick={onClickTime}>시간표 불러오기</Button>}
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
									index={j}
									day={a[0]}//요일
									date={a[1]}//날짜
									startHour={b}
									schedule={getCurDateSchedule(a[1], b)}

								/>


							))}
						</div>
						: null
				))}
			</div>
		</div>
	);
};

export default Weekly;
