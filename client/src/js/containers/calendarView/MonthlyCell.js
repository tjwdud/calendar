import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/moonthly.css';

import { editDate } from 'js/containers/components/UserDataController';
import { useAddFormState } from 'js/stores/addFormState';
import { useErrorState } from 'js/stores/errorState';
import { useUserData } from 'js/stores/userData';
import { useDragAndDrop } from 'js/stores/dragAndDrop';

const MonthlyCell = (props) => {
	const { date, schedule } = props;
	const [addFormState, setAddFormState] = useAddFormState();
	const { active } = addFormState;
	const [errorState, setErrorState] = useErrorState();
	const [userData, setUserData] = useUserData();
	const [dragAndDrop, setDragAndDrop] = useDragAndDrop();
	const [curDateStr, setCurDateStr] = useState('');
	const class_type = 'main_class'

	useEffect(
		() => {

			let newCurDateStr = date.getDate();
			if (schedule.length !== 0) {
				newCurDateStr += ' (' + schedule.length + ')';
			}
			setCurDateStr(newCurDateStr);
		},
		[schedule]
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

	const onDropSchedule = (e) => {
		const newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, userData.schedule);

		if (newSchedule !== false) {
			setUserData({ ...userData, schedule: newSchedule });
			setAddFormState({ ...addFormState, active: false, class_type: class_type });
			setErrorState({
				...errorState,
				active: true,
				mode: 'edit',
				message: [['수업이 수정 되었습니다.']]
			});
		} else {
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
		<div className="monthly-cell" onClick={onClickDate} onDragEnter={onDragEnterCell} onDragEnd={onDropSchedule}>
			<p>{curDateStr}</p>

			{schedule.map((a, i) => (
				<div
					key={i}
					className="monthly-schedule"
					onClick={(e) => onClickSchedule(e, a)}
					draggable
					onDragStart={(e) => onDragCell(e, a)}
				>
					<div className="monthly-title-hour">
						<p>{a.title}</p>
						<div className="start-end-hour">
							{a.startMinute < 10 ? <p className="startHour">{a.startHour + ':' + '0' + a.startMinute + '-'}</p> :
								<p className="startHour">{a.startHour + ':' + a.startMinute + '-'}</p>}
							{a.endMinute < 10 ? <p className="endHour">{a.endHour + ':' + '0' + a.endMinute}</p> :
								<p className="endHour">{a.endHour + ':' + a.endMinute}</p>}

						</div>
					</div>
					<div className="monthly-students">
						{a.students.map((b, j) => (
							<p
								key={j}
							>
								{b.studentName + '(' + b.studentAge + ')'}						</p>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default MonthlyCell;
