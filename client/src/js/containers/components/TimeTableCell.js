import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import 'sass/timetable.css';

import { editDate } from 'js/containers/components/UserDataController';
// store
import { useErrorState } from 'js/stores/errorState';
import { useAddFormState } from 'js/stores/addFormState';
import { useTimeTableData } from 'js/stores/timeTableData';
import { useDragAndDrop } from 'js/stores/dragAndDrop';

const TimeTableCell = (props) => {

	const { index, day, date, startHour, schedule } = props;
	const [addFormState, setAddFormState] = useAddFormState();
	const { active } = addFormState;
	const [errorState, setErrorState] = useErrorState();
	const [ timeTableData, setTimeTableData] = useTimeTableData();
	const [dragAndDrop, setDragAndDrop] = useDragAndDrop();
	const class_type = 'timetable-class'

	const onClickDate = () => {
		if (!active) {
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

	const onClickSchedule = (e, schedule) => {
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
				students: students,

			});
		}
	};

	const onDropSchedule = (e) => {
		if (dragAndDrop.to.endHour > 20) return;
		const newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, timeTableData.timeTableSchedule);

		if (newSchedule !== false) {
			setTimeTableData({ ...timeTableData, timeTableSchedule: newSchedule });
			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'edit',
				message: [['일정이 수정 되었습니다.']]
			});
		} else {//editDate가 false를 return 하면
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
		<div className="weekly-cell" onClick={onClickDate} onDragEnter={onDragEnterCell} onDragEnd={onDropSchedule}>
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
								{b.studentName}
							</p>

						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default TimeTableCell;