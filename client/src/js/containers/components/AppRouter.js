import React, { useState, useEffect } from 'react';
import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import { useStudentsData } from 'js/stores/studentsData';
import { useTimeTableData } from 'js/stores/timeTableData';
import { useFreeTimeTableData } from 'js/stores/freeTimeTableData';
import { useAdminState } from 'js/stores/adminState';
import { dbService, arrayService, timeService } from "../../../fbase";
import { BrowserRouter, Switch, Route,	Redirect, useHistory, withRouter } from 'react-router-dom';
import Monthly from 'js/containers/calendarView/Monthly';
import Weekly from 'js/containers/calendarView/Weekly';
import FreeWeekly from 'js/containers/calendarView/FreeWeekly';
import Daily from 'js/containers/calendarView/Dailyview';
import ControlView from 'js/containers/controlView/ControlView';
import AddForm from 'js/containers/components/AddForm';
import ErrorPopup from 'js/containers/components/ErrorPopup';
import StudentsControl from 'js/containers/components/StudentsControl';
import TimeTable from 'js/containers/calendarView/TimeTable';
import FreeTimeTable from 'js/containers/calendarView/FreeTimeTable';
import Profile from 'js/containers/components/Profile';
import Auth from 'js/containers/components/Auth';
import Navigation from 'js/containers/components/Navigation';
import 'sass/app.css';

const AppRouter = ({ isLoggedIn, userObj }) => {
	const [userData, setUserData] = useUserData();
	const [freeUserData, setFreeUserData] = useFreeUserData();
	const [studentsData, setStudentsData] = useStudentsData();
	const [timeTableData, setTimeTableData] = useTimeTableData();
	const [freeTimeTableData, setFreeTimeTableData] = useFreeTimeTableData();
	const [isAdmin, setIsAdmin] = useState(false);
	const [adminState,setAdminState] = useAdminState();


	useEffect(()=>{

		if(userObj=== '111muOnAhmPBAGy80kjvZtWUuos2'){
			setAdminState(true);
		}else {
			setAdminState(false);
		}
	},[isLoggedIn]);//로그인 정보가 바뀌면 실행

    useEffect(() => {

        if(isLoggedIn){
	
            loadUserData();
            loadFreeUserData();
            loadStudentsData();
            loadTimeTableData();
            loadFreeTimeTableData();
		}

	},[isLoggedIn]);


	
    useEffect(
		() => {
			if(isLoggedIn && adminState){
				saveUserData();
            }
		
		},
		[userData]
	);

	useEffect(
		() => {
			if(isLoggedIn && adminState){
                saveFreeUserData();
            }
		},
		[freeUserData]
	);

	useEffect(
		() => {
			if(isLoggedIn && adminState){
                saveStudentsData();
            }

		},
		[studentsData]
	);

	useEffect(
		() => {
			if(isLoggedIn && adminState){
                saveTimeTableData();

            }
		},
		[timeTableData]
	);

	useEffect(
		() => {
			if(isLoggedIn && adminState){
                saveFreeTimeTableData();
            }
		},
		[freeTimeTableData]
	);


	const saveUserData = async () => {
		await dbService.collection('schedule').doc('schedule').set({
			schedule:
				arrayService.arrayUnion(...userData.schedule)
		});
	};

	const saveFreeUserData = async () => {

		await dbService.collection('freeSchedule').doc('freeSchedule').set({
			freeSchedule:
				arrayService.arrayUnion(...freeUserData.freeSchedule)
		});
	};

	const saveStudentsData = async () => {

		await dbService.collection('students').doc('students').set({
			students:
				arrayService.arrayUnion(...studentsData.students)
		});
	};

	const saveTimeTableData = async () => {

		await dbService.collection('timeTableSchedule').doc('timeTableSchedule').set({
			timeTableSchedule:
				arrayService.arrayUnion(...timeTableData.timeTableSchedule)
		});
	};

	const saveFreeTimeTableData = async () => {

		await dbService.collection('freeTimeTableSchedule').doc('freeTimeTableSchedule').set({
			freeTimeTableSchedule:
				arrayService.arrayUnion(...freeTimeTableData.freeTimeTableSchedule)
		});
	};



	const loadUserData = async () => {//값 불러올 때 string을 object로 변환
		await dbService.collection('schedule').doc('schedule').get().then((doc) => {
			if (!doc.exists) return;
			setUserData({
				...userData,
				schedule: doc.data().schedule.map((a) => {
					return { ...a, curDate: a.curDate.toDate() };
				})
			})
		})
	};


	const loadFreeUserData = async () => {//값 불러올 때 string을 object로 변환
		await dbService.collection('freeSchedule').doc('freeSchedule').get().then((doc) => {
			if (!doc.exists) return;

			setFreeUserData({
				...freeUserData,
				freeSchedule: doc.data().freeSchedule.map((a) => {
					return { ...a, curDate: a.curDate.toDate() };
				})
			})
		})
	};

	const loadStudentsData = async () => {
		await dbService.collection('students').doc('students').get().then((doc) => {
			if (!doc.exists) return;

			setStudentsData({
				...studentsData,
				students: doc.data().students.map((a) => {
					return { ...a };
				})
			})
		})
	};

	const loadTimeTableData = async () => {
		await dbService.collection('timeTableSchedule').doc('timeTableSchedule').get().then((doc) => {
			if (!doc.exists) return;

			setTimeTableData({
				...timeTableData,
				timeTableSchedule: doc.data().timeTableSchedule.map((a) => {

					return { ...a, curDate: a.curDate.toDate() };
				})
			})
		})
	};

	const loadFreeTimeTableData = async () => {
		await dbService.collection('freeTimeTableSchedule').doc('freeTimeTableSchedule').get().then((doc) => {
			if (!doc.exists) return;

			setFreeTimeTableData({
				...freeTimeTableData,
				freeTimeTableSchedule: doc.data().freeTimeTableSchedule.map((a) => {

					return { ...a, curDate: a.curDate.toDate() };
				})
			})
		})
    };
    
    return (
        < BrowserRouter >          
          <div id="app">
            {isLoggedIn ?
                <>
                    <Switch>
                        <>
                            <Navigation />
                            <ControlView />
                            <div id="calendar-view">
                                <Route exact path="/monthly" component={Monthly} />
                                <Route exact path="/weekly" component={Weekly} />
                                <Route exact path="/freeweekly" component={FreeWeekly} />
                                <Route exact path="/daily" component={Daily} />
                                <Route exact path="/student" component={StudentsControl} />
                                <Route exact path="/timetable" component={TimeTable} />
                                <Route exact path="/freetimetable" component={FreeTimeTable} />
                                <Route exact path="/profile" component={Profile} />
                            </div>
                        </>
                    </Switch>
                    <AddForm />
                    <ErrorPopup /></> : <Route exact path="/"><Auth /></Route>
            }
        </div>
        </BrowserRouter >
    )
};

export default AppRouter;