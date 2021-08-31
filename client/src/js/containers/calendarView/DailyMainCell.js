import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/daily.css';

import { useAddFormState } from 'js/stores/addFormState';
import { useAdminState } from '../../stores/adminState';
import { useErrorState } from 'js/stores/errorState';

const DailyMainCell = (props) => {
    const { date, schedule } = props;
    const [addFormState, setAddFormState] = useAddFormState();
    const { active } = addFormState;
    const [curClassNum, setCurClassNum] = useState('');
	const [adminState,setAdminState] = useAdminState();
	const [errorState, setErrorState] = useErrorState();
    const class_type = 'main_class';
    useEffect(
        () => {
            if (date !== '') {
                let class_num = '본수업';
                if (schedule.length !== 0) {
                    class_num += ' (' + schedule.length + ')';
                }
                setCurClassNum(class_num);
            }

        },
        [schedule, date]
    );

    const onClickDate = () => {//스케줄 추가할때 
		if(!adminState){
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['수업을 수정하려면 관리자 계정으로 로그인 하세요.']]
			});
		}
		if (!active && adminState) {
            let startHour = 10
            const nowHour = new Date().getHours();
            if (nowHour >= 10 && nowHour <= 21) {
                startHour = nowHour
            }
            const startMinute = 0;
            const endMinute = 0;
 

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
		if(!adminState){
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['수업을 수정하려면 관리자 계정으로 로그인 하세요.']]
			});
		}
		if (!active && adminState) {

            setAddFormState({
                ...addFormState,
                class_type: class_type,
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
            <p id="daily-main-class">{curClassNum}</p>


            {schedule.map((a, i) => (
                <div
                    key={i}
                    className="daily-schedule"
                    onClick={(e) => onClickSchedule(e, a)}>
                    <div className="daily-hour">
                        {a.startMinute < 10 ? <p>{a.startHour + ':' + '0' + a.startMinute}</p> :
                            <p>{a.startHour + ':' + a.startMinute}</p>}
                        {/*{a.endMinute <10 ? <p>{a.endHour + ':' + '0'+a.endMinute}</p>:
								<p>{a.endHour + ':' + a.endMinute}</p>}*/}
                    </div>
                    <p className="daily-title">{a.title}</p>
                    <div className="daily-student">
                    {a.students.map((b, j) => (
                        <p 
                            key={j}
                        >
                            {b.studentName+'('+b.studentAge+')'}
                        </p>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default DailyMainCell;