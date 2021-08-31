import React, { useState, useEffect} from 'react';
import 'sass/app.css';
import 'sass/homeController.css';
import { useCalendarState } from 'js/stores/calendarState';
import { withRouter } from 'react-router-dom';
import ModeController from './ModeController';

const ControlView = ( {history, location} ) => {
	const [calendarState, setCalendarState] = useCalendarState();
	const { mode, date } = calendarState;
	const [curDateStr, setCurDateStr] = useState('');

	
	useEffect(
		() => {
			let newCurDate;
			let modeName = 'monthly'
			modeName = location.pathname.substring(1, location.pathname.length)
			const mode= modeName;
			setCalendarState({ ...calendarState, mode: mode });//새로고침 할 경우

			if (mode === 'monthly') {
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월';
			} else if (mode === 'weekly') {
				let lastDate = parseInt((date.getDate() + (6 - date.getDay())) / 7) + 1;
				newCurDate = '본수업 ' + date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + lastDate + '주';
			} else if (mode === 'freeweekly') {
				let lastDate = parseInt((date.getDate() + (6 - date.getDay())) / 7) + 1;
				newCurDate = '자유수업 ' + date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + lastDate + '주';
			} else if (mode === 'daily') {
				let week = ['일', '월', '화', '수', '목', '금', '토',]
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + (date.getDate()) + '일' + (week[date.getDay()]) + '요일 / '
				+ date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + (date.getDate() + 1) + '일' + (week[date.getDay() + 1]) + '요일';
			} else if (mode === 'student') {
				newCurDate = '학생추가 페이지'
			} else if (mode === 'timetable') {
				newCurDate = '시간표'
			} else if (mode === 'freetimetable') {
				newCurDate = '자유 시간표'
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
		if (mode === 'weekly' || mode === 'freeweekly') {
			newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value * 7);
		} else if (mode === 'monthly') {
			newDate = new Date(date.getFullYear(), date.getMonth() + value, date.getDate());
		} else if (mode === 'daily') {
			if(value < 0){
				if(date.getDay() === 1){//요일이 월요일이면
					newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() -3 );//전 화살표 눌렀을떄 월요일말고 금요일로 날짜 저장하라
				}else{
					newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value * 2 );
				}
			}else {
				if(date.getDay() === 5){//금요일 이라면
					newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4 );//다음 화살표 눌렀을 때 월요일로 
				}else{
					newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value * 2 );

				}
			}
		}
		setCalendarState({ ...calendarState, date: newDate });
	};

	if(window.location.pathname === '/') return (
		<div id="home-controller">
        	<ModeController history={history} home={true}/>
   		</div>
	);

	return (
		<div id="control-view">
			<div id="date-controller">
				{mode === 'student' || mode === 'timetable' || mode === 'freetimetable' ? 
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
				<ModeController history={history} home={false}/>
			</div>
		</div>
	);
};

export default withRouter(ControlView);
