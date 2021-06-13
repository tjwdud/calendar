import React, { useState, useEffect, Router, Link } from 'react';
import 'sass/app.css';
import { useCalendarState } from 'js/stores/calendarState';
import { withRouter } from 'react-router-dom';

const ControlView = ( {history, location} ) => {
	const [calendarState, setCalendarState] = useCalendarState();
	const { mode, date } = calendarState;
	const [curDateStr, setCurDateStr] = useState('');
	
	useEffect(
		() => {
			let newCurDate;
			let x = location.pathname
			let newDate;
			 x = x.substring(1, x.length)

			const mode= x;
			setCalendarState({ ...calendarState, mode: mode });//새로고침 할 경우

			if (mode === 'monthly') {
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월';
			} else if (mode === 'weekly') {
				let lastDate = parseInt((date.getDate() + (6 - date.getDay())) / 7) + 1;
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + lastDate + '주';
			} else if (mode === 'daily') {
				let week = ['일', '월', '화', '수', '목', '금', '토',]
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + (date.getDate()) + '일' + (week[date.getDay()]) + '요일';
			} else if (mode === 'student') {
				newCurDate = '학생추가 페이지'
			} else if (mode === 'timetable') {
				newCurDate = '시간표'
			}
			setCurDateStr(newCurDate);
		},
		[date, mode]
	);

	const onClickLeft = () => {
		changeDate(-1);
	};

	const onClickRight = () => {
		changeDate(1);
	};

	const onClickDateView = () => {//날짜 누르면 
		setCalendarState({ ...calendarState, date: new Date() });
	};

	const changeDate = (value) => {
		let newDate; 
		if (mode === 'weekly') {
			newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value * 7);
		} else if (mode === 'monthly') {
			newDate = new Date(date.getFullYear(), date.getMonth() + value, date.getDate());
		} else if (mode === 'daily') {
			newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value);
		}
		setCalendarState({ ...calendarState, date: newDate });
	};

	/*const onClickModeController = () => {
	
		const nextMode = mode === 'monthly' ? 'weekly' : 'monthly';//몬슬리이면 위클리가 넥스트모드 위클리면 몬슬리가 넥스트 모드 
		setCalendarState({ ...calendarState, mode: nextMode });
	};*/
	const onClickMonthly = () => {
		const mode = 'monthly'
		setCalendarState({ ...calendarState, mode: mode });
		history.push("/monthly")

	}
	const onClickWeekly = () => {
		const mode = 'weekly'
		setCalendarState({ ...calendarState, mode: mode });
		history.push("/weekly")

	}
	const onClickDaily = () => {
		const mode = 'daily';
		setCalendarState({ ...calendarState, mode: mode });
		history.push("/daily")

	};
	const onClickStudent = () => {
		const mode = 'student';
		setCalendarState({ ...calendarState, mode: mode });
		history.push("/student")
	}
	const onClickTimetable = () => {
		const mode = 'timetable';
		setCalendarState({ ...calendarState, mode: mode });
		history.push("/timetable")
	}

	return (
		<div id="control-view">
			<div id="week-controller">
				{mode === 'student' || mode === 'timetable' ? 
				<div className="arrow-btn">
					<img src={require('img/arrow-left.png')} />
				</div> : 
				<div className="arrow-btn" onClick={onClickLeft}>
					<img src={require('img/arrow-left.png')} />
				</div>}
				<div id="date-view" onClick={onClickDateView}>

					{curDateStr}
				</div>
				{mode === 'student' || mode === 'timetable' ? 
				<div className="arrow-btn">
					<img src={require('img/arrow-right.png')} />
				</div> : 
				<div className="arrow-btn" onClick={onClickRight}>
					<img src={require('img/arrow-right.png')} />
				</div>}
			</div>
			<div id="mode-controller">
				<div id="mode-btn" className={mode === 'monthly' ? 'active' : null} onClick={onClickMonthly}>
					월	
				</div>
				<div id="mode-btn" className={mode === 'weekly' ? 'active' : null} onClick={onClickWeekly}>
					주
				</div>
				<div id="mode-btn" className={mode === 'daily' ? 'active' : null} onClick={onClickDaily}>
					일
				</div>

				<div id="student-add" className={mode === 'student' ? 'active' : null} onClick={onClickStudent}> 학생 </div>
				<div id="timetable" className={mode === 'timetable' ? 'active' : null} onClick={onClickTimetable}> 시간표 </div>

			</div>
		</div>
	);
};

export default withRouter(ControlView);
