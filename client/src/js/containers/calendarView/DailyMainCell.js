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
            const class_type = 'main_class';

            setAddFormState({
                ...addFormState,
                class_type: class_type,
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
    

    return (
        <div className='daily-main-cell' onClick={onClickDate}>
            <p>{curDateStr}</p>


            {schedule.map((a, i) => (
                <div style={{ backgroundColor: 'lightgrey'}}
                    key={i}
                    className="daily-schedule"
                    onClick={(e) => onClickSchedule(e, a)}
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