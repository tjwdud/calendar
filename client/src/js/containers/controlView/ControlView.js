import React, { useState, useEffect, Router } from 'react';
import 'sass/app.css';
import { useCalendarState } from 'js/stores/calendarState';
const ControlView = () => {
	const [ calendarState, setCalendarState ] = useCalendarState();
	const { mode, date } = calendarState;
	const [ curDateStr, setCurDateStr ] = useState('');

	useEffect(
		() => {
			let newCurDate;
			if (mode === 'monthly') {
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월';
			} else if (mode === 'weekly') {
				let lastDate = parseInt((date.getDate() + (6 - date.getDay())) / 7) + 1;
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + lastDate + '주';
			} else if (mode === 'daily'){
				let week = ['일','월','화','수','목','금','토',]
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' +  (date.getDate()) + '일' +  (week[date.getDay()]) + '요일';
			} 
			setCurDateStr(newCurDate);
		},
		[ date, mode ]
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
			newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+ value );
			console.log(newDate);
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
	}
	const onClickWeekly = () => {
		const mode = 'weekly'
		setCalendarState({ ...calendarState, mode: mode });
	}
	const onClickDaily = () => {
		const mode = 'daily';
		setCalendarState({ ...calendarState, mode: mode });
	};

	return (
		<div id="control-view">
			<div id="week-controller">
				<div className="arrow-btn" onClick={onClickLeft}>
					<img src={require('img/arrow-left.png')} />
				</div>
				<div id="date-view" onClick={onClickDateView}>
				
					{curDateStr}
				</div>
				<div className="arrow-btn" onClick={onClickRight}>
					<img src={require('img/arrow-right.png')} />
				</div>
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

				<div> 학생추가 페이지 </div>
			</div>
		</div>
	);
};

export default ControlView;
