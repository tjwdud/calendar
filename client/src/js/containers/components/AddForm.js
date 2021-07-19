import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'sass/app.css';
import { insertDate, deleteDate, editDate } from 'js/containers/components/UserDataController';

import { useAddFormState } from 'js/stores/addFormState';
import { useUserData } from 'js/stores/userData';
import { useFreeUserData } from 'js/stores/freeUserData';
import { useStudentsData } from 'js/stores/studentsData';
import { useTimeTableData } from 'js/stores/timeTableData';
import { useFreeTimeTableData } from 'js/stores/freeTimeTableData';
import { useErrorState } from 'js/stores/errorState';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: "10px",
		width: "100%",
		"& .MuiInputLabel-root": {
			color: "black",
			fontWeight: "bold",
			marginRight: "5px",
			fontSize: "20px"
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "purple"
		},
		"& .MuiInput-underline:after": {
			borderBottom: "2px solid #000000"
		},
		"& label + .MuiInput-formControl": {
			marginTop: "20px"
		}
	}
}));

const AddForm = () => {
	const classes = useStyles();
	const [addFormState, setAddFormState] = useAddFormState();
	const { active, mode, class_type } = addFormState;
	const [studentsData, setStudentsData] = useStudentsData();
	const [hourOptions] = useState([
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
	]);
	const [minuteOptions] = useState([
		0,
		5,
		10,
		15,
		20,
		25,
		30,
		35,
		40,
		45,
		50,
		55
	]);
	const [studentOptions2] = [studentsData.students];
	const [newAddFormState, setNewAddFormState] = useState({
		title: '',
		curDate: new Date(),
		startHour: 10,
		startMinute: 0,
		endHour: 11,
		endminute: 0,
		students: [],
	});
	const { title, curDate, startHour, startMinute, endHour, endMinute, students } = newAddFormState;
	const [userData, setUserData] = useUserData();
	const [freeUserData, setFreeUserData] = useFreeUserData();
	const [timeTableData, setTimeTableData] = useTimeTableData();
	const [freeTimeTableData, setFreeTimeTableData ] = useFreeTimeTableData();
	let { schedule } = [];
	let class_type_is_timetable = false;
	if (class_type === 'free-class') { schedule = freeUserData; }
	else if (class_type === 'timetable-class') { schedule = timeTableData; class_type_is_timetable = true; }
	else if (class_type === 'free-timetable-class') { schedule = freeTimeTableData; class_type_is_timetable = true;}
	else { schedule = userData; }
	const [beforeEdit, setBeforeEdit] = useState();
	const [errorState, setErrorState] = useErrorState();
	

	useEffect(
		() => {


			if (active) {
				const { title, curDate, startHour, startMinute, endHour, endMinute, students } = addFormState;
				setNewAddFormState({ title, curDate, startHour, startMinute, endHour, endMinute, students });
				if (mode === 'edit') {
					setBeforeEdit({ title, curDate, startHour, startMinute, endHour, endMinute, students });
				}
			}
		},
		[active]
	);
	const onChangeCurDate = (value) => {
		setNewAddFormState({ ...newAddFormState, curDate: value });
	};

	const onChangeStudents = (event, values) => {
		setNewAddFormState({ ...newAddFormState, students: values });
	};

	const onChangeNewAddFormState = (e) => {
		const { id, value } = e.target;
		switch (id) {
			case 'input-title':
				setNewAddFormState({ ...newAddFormState, title: value });
				break;
			case 'hour-start-select':
				const newStartHour = value * 1;
				const newEndHour = newStartHour < endHour ? endHour : newStartHour + 1;
				setNewAddFormState({ ...newAddFormState, startHour: newStartHour, endHour: newEndHour });
				break;
			case 'minute-start-select':
				setNewAddFormState({ ...newAddFormState, startMinute: value * 1 });
				break;
			case 'hour-end-select':
				setNewAddFormState({ ...newAddFormState, endHour: value * 1 });
				break;
			case 'minute-end-select':
				setNewAddFormState({ ...newAddFormState, endMinute: value * 1 });
				break;
			default:
				break;
		}
	};

	const onClickCancel = () => {
		setAddFormState({ ...addFormState, active: false });
	};

	const onClickAdd = () => {
		if (title === '') return;
		let newSchedule = [];
		if (class_type === 'free-class') {
			newSchedule = insertDate(newAddFormState, schedule.freeSchedule);
		} else if (class_type === 'timetable-class') {
			newSchedule = insertDate(newAddFormState, schedule.timeTableSchedule);
		} else if (class_type === 'free-timetable-class') {
			newSchedule = insertDate(newAddFormState, schedule.freeTimeTableSchedule);
		} else {
			newSchedule = insertDate(newAddFormState, schedule.schedule);
		}
		if (newSchedule !== false) {
			if (class_type === 'free-class') {
				setFreeUserData({ ...freeUserData, freeSchedule: newSchedule });
			} else if (class_type === 'timetable-class') {
				setTimeTableData({ ...timeTableData, timeTableSchedule: newSchedule });
			} else if (class_type === 'free-timetable-class') {
				setFreeTimeTableData({ ...freeTimeTableData, freeTimeTableSchedule: newSchedule });
			} else {
				setUserData({ ...userData, schedule: newSchedule });
			}
			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'add',
				message: [['수업이 추가 되었습니다.']]
			});
		} else {
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['수업을 추가할 수 없습니다.']]
			});
		}
	};

	const onClickEdit = () => {
		if (title === '') return;
		let newSchedule = [];
		if (class_type === 'free-class') {
			newSchedule = editDate(newAddFormState, beforeEdit, schedule.freeSchedule);
		} else if (class_type === 'timetable-class') {
			newSchedule = editDate(newAddFormState, beforeEdit, schedule.timeTableSchedule);
		} else if (class_type === 'free-timetable-class') {
			newSchedule = editDate(newAddFormState, beforeEdit, schedule.freeTimeTableSchedule);
		} else {
			newSchedule = editDate(newAddFormState, beforeEdit, schedule.schedule);
		}

		if (newSchedule !== false) {
			if (class_type === 'free-class') {
				setFreeUserData({ ...freeUserData, freeSchedule: newSchedule })
			} else if (class_type === 'timetable-class') {
				setTimeTableData({ ...timeTableData, timeTableSchedule: newSchedule });
			} else if (class_type === 'free-timetable-class') {
				setFreeTimeTableData({ ...freeTimeTableData, freeTimeTableSchedule: newSchedule });
			} else {
				setUserData({ ...userData, schedule: newSchedule })
			}
			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'edit',
				message: [['수업 수정 되었습니다.']]
			});
		} else {
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['수업 수정할 수 없습니다.']]
			});
		}
	};

	const onClickDelete = () => {
		let newSchedule = [];
		if (class_type === 'free-class') {
			newSchedule = deleteDate(title, curDate, startHour, startMinute, endHour, endMinute, schedule.freeSchedule);
		} else if (class_type === 'timetable-class') {
			newSchedule = deleteDate(title, curDate, startHour, startMinute, endHour, endMinute, schedule.timeTableSchedule);
		} else if (class_type === 'free-timetable-class') {
			newSchedule = deleteDate(title, curDate, startHour, startMinute, endHour, endMinute, schedule.freeTimeTableSchedule);
		} else {
			newSchedule = deleteDate(title, curDate, startHour, startMinute, endHour, endMinute, schedule.schedule);
		}
		if (class_type === 'free-class') {
			setFreeUserData({ ...freeUserData, freeSchedule: newSchedule })
		} else if (class_type === 'timetable-class') {
			setTimeTableData({ ...timeTableData, timeTableSchedule: newSchedule });
		} else if (class_type === 'free-timetable-class') {
			setFreeTimeTableData({ ...freeTimeTableData, freeTimeTableSchedule: newSchedule });
		} else {
			setUserData({ ...userData, schedule: newSchedule })
		}
		setAddFormState({ ...addFormState, active: false });
		setErrorState({
			...errorState,
			active: true,
			mode: 'delete',
			message: [['수업이 삭제 되었습니다.']]
		});
	};


	if (!active) return null;
	else if (active)

		return (
			<div id="panel">
				<div id="add-form">
					<div id="add-form-title">{mode === 'add' ? '수업 추가' : '수업 수정'}</div>
					<div id="input-date-picker-form">
						<div id="input-form">
							<div className="label">수업</div>
							<input id="input-title" value={title} onChange={onChangeNewAddFormState} />
						</div>
						{class_type_is_timetable ? null:<div id="date-picker-form">
							<div className="label">날짜</div>
							<div id="date-picker">
								<DatePicker selected={curDate} onChange={onChangeCurDate} />
							</div>
						</div>}
					</div>

					<div id="hour-picker-form">
						<select id="hour-start-select" value={startHour} onChange={onChangeNewAddFormState}>
							{hourOptions.map(
								(a, i) =>
									i < 12 ? (
										<option key={i} value={a}>
											{a}
										</option>
									) : null
							)}
						</select>
						<div className="label">시</div>
						<select id="minute-start-select" value={startMinute} onChange={onChangeNewAddFormState}>
							{minuteOptions.map(
								(a, i) =>
									(
										<option key={i} value={a}>
											{a}
										</option>
									)
							)}
						</select>
						<div className="label">분~</div>
						<select id="hour-end-select" value={endHour} onChange={onChangeNewAddFormState}>
							{hourOptions.map(
								(a, i) =>
									a > startHour ? (
										<option key={i} value={a}>
											{a}
										</option>
									) : null
							)}
						</select>
						<div className="label">시</div>
						<select id="minute-end-select" value={endMinute} onChange={onChangeNewAddFormState}>
							{minuteOptions.map(
								(a, i) =>
									(
										<option key={i} value={a}>
											{a}
										</option>
									)
							)}
						</select>
						<div className="label">분</div>
					</div>
					<div className={classes.root}>
						<Autocomplete
							multiple
							id="input-students"
							filterSelectedOptions={true}
							value={students}
							options={studentOptions2}
							getOptionLabel={(option) => option.studentName}
							getOptionSelected={(option, value) => option.studentName === value.studentName}
							onChange={onChangeStudents}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									label="학생"
									placeholder="학생이름"
								/>
							)}
						/>


					</div>
					<div id="option-form">
						<div id="cancel-btn" className="btn" onClick={onClickCancel}>
							취소
						</div>
						{mode === 'add' ? (
							<div id="add-btn" className="btn" onClick={onClickAdd}>
								저장
							</div>
						) : null}
						{mode === 'edit' ? (
							<div id="edit-btn" className="btn" onClick={onClickEdit}>
								수정
							</div>
						) : null}

						{mode === 'edit' ? (
							<div id="delete-btn" className="btn" onClick={onClickDelete}>
								삭제
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
};

export default AddForm;