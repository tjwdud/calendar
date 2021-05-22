import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import { editDate } from 'js/containers/components/UserDataController';
import { useAddFormState } from 'js/stores/addFormState';
import { useErrorState } from 'js/stores/errorState';
import { useUserData } from 'js/stores/userData';
import { useDragAndDrop } from 'js/stores/dragAndDrop';

const DailyMainCell = (props) => {
    const { date, schedule } = props;
    const [addFormState, setAddFormState] = useAddFormState();
    const { active } = addFormState;
    const [errorState, setErrorState] = useErrorState();
    const [userData, setUserData] = useUserData();
    const [dragAndDrop, setDragAndDrop] = useDragAndDrop();
    const [curDateStr, setCurDateStr] = useState('');

    useEffect(
		() => {
            if( date !== '' ){
                let newCurDateStr = date.getDate();
			        if (schedule.length !== 0) {
				        newCurDateStr += ' (' + schedule.length + ')';
			            }
			setCurDateStr(newCurDateStr);
            }
			
		},
		[ schedule,date ]
    );
    
    const onClickDate = () => {//스케줄 추가할때 
        if (!active) {
            let startHour = 10
            const nowHour = new Date().getHours();
            if (nowHour >= 10 && nowHour <= 21) {
                startHour = nowHour
            }
            const startMinute = 0;
            const endMinute = 0;

            setAddFormState({
                ...addFormState,
                active: true,
                mode: 'add',
                title: '',
                curDate: date,
                startHour: startHour,
                startMinute: startMinute,
                endHour: startHour + 1,
                endMinute: endMinute,
                students: []

            });
        }
    };

    const onClickSchedule = (e, schedule) => {//수정하려고 스케줄 눌렀을때
        e.stopPropagation();
        const { title, curDate, startHour, startMinute, endHour, endMinute, students } = schedule;

        if (!active) {

            setAddFormState({
                ...addFormState,
                active: true,
                mode: 'edit',
                title: title,
                curDate: curDate,
                startHour: startHour,
                startMinute: startMinute,
                endHour: endHour,
                endMinute: endMinute,
                students: students

            });
        }
    };
    const onDropSchedule = (e) => {
        const newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, userData.schedule);

        if (newSchedule !== false) {
            setUserData({ ...userData, schedule: newSchedule });
            setAddFormState({ ...addFormState, active: false });
            setErrorState({
                ...errorState,
                active: true,
                mode: 'edit',
                message: [['일정이 수정 되었습니다.']]
            });
        } else {
            setErrorState({
                ...errorState,
                active: true,
                mode: 'fail',
                message: [['일정을 수정할 수 없습니다.'], ['해당 시간에 이미 다른 일정이 존재합니다.']]
            });
        }
    };

    const onDragCell = (e, schedule) => {
        setDragAndDrop({ ...dragAndDrop, from: schedule });
    };

    const onDragEnterCell = (e) => {
        const { title, startHour, startMinute, endHour, endMinute, students } = dragAndDrop.from;
        const newScheduleForm = {
            title: title,
            curDate: date,
            startHour: startHour,
            startMinute: startMinute,
            endHour: endHour,
            endMinute: endMinute,
            students: students
        };
        setDragAndDrop({ ...dragAndDrop, to: newScheduleForm });
    };

    return (
        <div className='daily-main-cell' onClick={onClickDate} onDragEnter={onDragEnterCell} onDragEnd={onDropSchedule}>
            <p>{curDateStr}</p>


            {schedule.map((a, i) => (
                <div
                    key={i}
                    className="daily-schedule"
                    onClick={(e) => onClickSchedule(e, a)}
                    draggable
                    onDragStart={(e) => onDragCell(e, a)}
                >
                    <p>{a.title}</p>
                    <p>{a.startHour + '시' + a.startMinute + '분 ~' + a.endHour + '시' + a.endMinute + '분'}</p>
                    {a.students.map((b, j) => (
                        <p
                            key={j}
                        >
                            {b.name}
						</p>
					))}
				</div>
			))}
		</div>
	);
};


export default DailyMainCell;