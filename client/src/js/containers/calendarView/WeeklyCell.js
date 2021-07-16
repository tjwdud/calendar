import React from 'react';
import 'sass/app.css';
import 'sass/weekly.css';

import { editDate } from 'js/containers/components/UserDataController';
// store
import { useErrorState } from 'js/stores/errorState';
import { useAddFormState } from 'js/stores/addFormState';
import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import { useDragAndDrop } from 'js/stores/dragAndDrop';

const WeeklyCell = (props) => {
	const { class_mode, index, day, date, startHour, schedule } = props;
	const [addFormState, setAddFormState] = useAddFormState();
	const { active } = addFormState;
	const [errorState, setErrorState] = useErrorState();
	const [userData, setUserData] = useUserData();
	const [freeUserData, setFreeUserData ] = useFreeUserData();
	const [dragAndDrop, setDragAndDrop] = useDragAndDrop();


	const onClickDate = () => {
		if (!active) {
			const startMinute = 0;
			const endMinute = 0;
			setAddFormState({
				...addFormState,
				class_type: class_mode,
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

	const onClickSchedule = (e, schedule) => {
		e.stopPropagation();
		const { title, curDate, startHour, startMinute, endHour, endMinute, students } = schedule;
		if (!active) {

			setAddFormState({
				...addFormState,
				class_type: class_mode,
				active: true,
				mode: 'edit',
				title: title,
				curDate: curDate,
				startHour: startHour,
				startMinute: startMinute,
				endHour: endHour,
				endMinute: endMinute,
				students: students,

			});
		}
	};

	const onDropSchedule = (e) => {
		if (dragAndDrop.to.endHour > 20) return;
		let newSchedule = [];
		if (class_mode === 'free-class') {
			newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, freeUserData.freeSchedule);
		} else {
			newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, userData.schedule);
		}

		if (newSchedule !== false) {
			if (class_mode === 'free-class'){
				setFreeUserData({ ...freeUserData, freeSchedule: newSchedule });
			} else {
				setUserData({ ...userData, schedule: newSchedule });
			}

			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'edit',
				message: [['수업 수정 되었습니다.']]
			});
		} else {//editDate가 false를 return 하면
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['수업을 수정할 수 없습니다.']]
			});
		}
	};

	const onDragCell = (e, schedule) => {
		setDragAndDrop({ ...dragAndDrop, from: schedule });
	};

	const onDragEnterCell = (e) => {
		const { from } = dragAndDrop;
		const diff = from.endHour - from.startHour;
		const newScheduleForm = {
			title: from.title,
			curDate: date,
			startHour,
			startMinute: from.startMinute,
			endHour: startHour + diff,
			endMinute: from.endMinute,
			students: from.students
		};
		setDragAndDrop({ ...dragAndDrop, to: newScheduleForm });
	};

	if (index === 0) {
		return (
			<div className={day === '일' ? 'weekly-cell sunday' : day === '토' ? 'weekly-cell saturday' : 'weekly-cell'}>
				{day}
			</div>
		);
	}

	if (index === 1)
		return (
			<div className={day === '일' ? 'weekly-cell sunday' : day === '토' ? 'weekly-cell saturday' : 'weekly-cell'}>
				{date.getDate()}
			</div>
		);

	return (
		<div className={class_mode === 'free-class' ? "free-weekly-cell weekly-cell" : "main-weekly-cell weekly-cell"} onClick={onClickDate} onDragEnter={onDragEnterCell} onDragEnd={onDropSchedule}>
			{schedule && schedule.map((a, i) => (
				<div
					key={i}
					className="weekly-schedule"
					onClick={(e) => onClickSchedule(e, a)}
					draggable
					onDragStart={(e) => onDragCell(e, a)}
				>
					<div className="week-title">
						<p>{a.title}</p></div>

					<div className="start-end-hour">
						{a.startMinute < 10 ? <p>{a.startHour + ':' + '0' + a.startMinute}</p> :
							<p>{a.startHour + ':' + a.startMinute}</p>}
						{/*{a.endMinute <10 ? <p>{a.endHour + ':' + '0'+a.endMinute}</p>:
								<p>{a.endHour + ':' + a.endMinute}</p>}*/}


					</div>


					<div className="student-name">
						{a.students.map((b, j) => (
							<p
								key={j}
							>
								{b.studentName + '(' + b.studentAge + ')'}
							</p>

						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default WeeklyCell;
