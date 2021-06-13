import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import ControlView from 'js/containers/controlView/ControlView';
import CalendarView from 'js/containers/calendarView/CalendarView';
import AddForm from 'js/containers/components/AddForm';
import ErrorPopup from 'js/containers/components/ErrorPopup';
import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import { useStudentsData } from 'js/stores/studentsData';
import { useTimeTableData } from 'js/stores/timeTableData';

import StudentsControl from 'js/containers/components/StudentsControl';
import TimeTable from 'js/containers/components/TimeTable';
import Monthly from 'js/containers/calendarView/Monthly';
import Weekly from 'js/containers/calendarView/Weekly';
import Daily from 'js/containers/calendarView/Daily';


import { BrowserRouter, Switch, Route } from 'react-router-dom';


const App = () => {
	const [ userData, setUserData ] = useUserData();
    const [ freeUserData, setFreeUserData ] = useFreeUserData();
	const [ studentsData, setStudentsData ] = useStudentsData();
	const [ timeTableData, setTimeTableData ] = useTimeTableData();

	useEffect(() => {
		loadUserData();
		loadFreeUserData();
		loadStudentsData();
		loadTimeTableData();
	}, []);

	useEffect(
		() => {
			saveUserData();
		},
		[ userData ]
	);

	useEffect(
		() => {
			saveFreeUserData();
		},
		[ freeUserData ]
	);

	useEffect(
		() => {
			saveStudentsData();
		},
		[ studentsData ]
	);

	useEffect(
		() => {
			saveTimeTableData();
		},
		[ timeTableData ]
	);



	const saveUserData = () => {
		const data = JSON.stringify(userData);//userData object를 string으로 변환
		localStorage.setItem('userData', data);
	};

    const saveFreeUserData = () => {
		const data = JSON.stringify(freeUserData);//userData object를 string으로 변환
		localStorage.setItem('freeUserData', data);
	};

	const saveStudentsData = () => {
		const data = JSON.stringify(studentsData);
		localStorage.setItem('studentsData', data);
	};

	const saveTimeTableData = () => {
		const data = JSON.stringify(timeTableData);
		localStorage.setItem('timeTableData', data);
	};



	const loadUserData = () => {//값 불러올 때 string을 object로 변환
		const data = JSON.parse(localStorage.getItem('userData'));

		if (!data) return;
		setUserData({
			...userData,
			schedule: data.schedule.map((a) => {
				return { ...a, curDate: new Date(a.curDate) };
			})
		});
	};


	const loadFreeUserData = () => {//값 불러올 때 string을 object로 변환
		const data = JSON.parse(localStorage.getItem('freeUserData'));

		if (!data) return;
		setFreeUserData({
			...freeUserData,
			freeSchedule: data.freeSchedule.map((a) => {
				return { ...a, curDate: new Date(a.curDate) };
			})
		});
	};

	const loadStudentsData = () => {
		const data = JSON.parse(localStorage.getItem('studentsData'));

		if(!data) return;
		setStudentsData({ 
			...studentsData,
			students: data.students.map((a)=> {
				return { ...a };
			})
		})

	}

	const loadTimeTableData = () => {
		const data = JSON.parse(localStorage.getItem('timeTableData'));

		if(!data) return;
		setTimeTableData({ 
			...timeTableData,
			timeTableSchedule: data.timeTableSchedule.map((a)=> {
				return { ...a, curDate: new Date(a.curDate) };
			})
		})

	}



	return (
		<BrowserRouter>
			<div id="app">
				<ControlView />
				<div id="calendar-view">
					<Switch>
						<Route exact path="/monthly" component={Monthly} />
						<Route exact path="/weekly" component={Weekly} />
						<Route exact path="/daily" component={Daily} />
						<Route exact path="/student" component={StudentsControl} /> 
						<Route exact path="/timetable" component={TimeTable} />
					</Switch>
				</div>
						<AddForm />
						<ErrorPopup />
			</div>
		</BrowserRouter>
			


	);
};



export default App;
