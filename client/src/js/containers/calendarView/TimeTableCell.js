import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/timetable.css';

import { editDate } from 'js/containers/components/UserDataController';
// store
import { useErrorState } from 'js/stores/errorState';
import { useAddFormState } from 'js/stores/addFormState';
import { useTimeTableData } from 'js/stores/timeTableData';
import { useDragAndDrop } from 'js/stores/dragAndDrop';
import { useFreeTimeTableData } from '../../stores/freeTimeTableData';
import { useAdminState } from 'js/stores/adminState';

const TimeTableCell = (props) => {

	const { mode, index, day, date, startHour, schedule } = props;
	const [addFormState, setAddFormState] = useAddFormState();
	const { active } = addFormState;
	const [errorState, setErrorState] = useErrorState();
	const [timeTableData, setTimeTableData] = useTimeTableData();
	const [freeTimeTableData, setFreeTimeTableData] = useFreeTimeTableData();
	const [dragAndDrop, setDragAndDrop] = useDragAndDrop();
	const [adminState, setAdminState] = useAdminState();

	const onClickDate = () => {
		if (!adminState) {
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['수업을 수정하려면 관리자 계정으로 로그인 하세요.']]
			});
		}
		if (!active && adminState) {
			const startMinute = 0;
			const endMinute = 0;
			setAddFormState({
				...addFormState,
				class_type: mode,
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
		if (!adminState) {
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
				class_type: mode,
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
		if (mode === 'timetable-class') {
			newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, timeTableData.timeTableSchedule);
		} else {
			newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, freeTimeTableData.freeTimeTableSchedule);
		}


		if (newSchedule !== false && adminState) {
			if (mode === 'timetable-class') {
				setTimeTableData({ ...timeTableData, timeTableSchedule: newSchedule });
			} else {
				setFreeTimeTableData({ ...freeTimeTableData, freeTimeTableSchedule: newSchedule });
			}
			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'edit',
				message: [['수업이 수정 되었습니다.']]
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
			<div className={day === '토' ? 'weekly-cell saturday' : 'weekly-cell'}>
				{day}
			</div>
		);
	}

	return (
		<div className={mode === 'timetable-class' ? "main-timetable-cell weekly-cell" : "free-timetable-cell weekly-cell"} onClick={onClickDate} onDragEnter={onDragEnterCell} onDragEnd={onDropSchedule}>
			{schedule && schedule.map((a, i) => (
				<div
					key={i}
					className="weekly-schedule"
					onClick={(e) => onClickSchedule(e, a)}
					draggable
					onDragStart={(e) => onDragCell(e, a)}
				>
					{a.title.length < 3 ?
						<>
							<div className="start-end-hour">
								{a.startMinute < 10 ? <p>{a.startHour + ':' + '0' + a.startMinute}</p> :
									<p>{a.startHour + ':' + a.startMinute}</p>}
								{/*{a.endMinute <10 ? <p>{a.endHour + ':' + '0'+a.endMinute}</p>:
								<p>{a.endHour + ':' + a.endMinute}</p>}*/}
							</div>

							<div className="week-title">
								<p>{a.title}</p></div></>
						: <div className="hour-title">
							<div className="start-end-hour">
								{a.startMinute < 10 ? <p>{a.startHour + ':' + '0' + a.startMinute}</p> :
									<p>{a.startHour + ':' + a.startMinute}</p>}
								{/*{a.endMinute <10 ? <p>{a.endHour + ':' + '0'+a.endMinute}</p>:
								<p>{a.endHour + ':' + a.endMinute}</p>}*/}
							</div>

							<div className="week-title">
								<p>{a.title}</p></div>
						</div>}

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

export default TimeTableCell;
