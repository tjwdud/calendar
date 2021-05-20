import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'sass/app.css';
import { insertDate, deleteDate, editDate } from 'js/containers/components/UserDataController';
// store
import { useAddFormState } from 'js/stores/addFormState';
import { useUserData } from 'js/stores/userData';
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
	const { active, mode } = addFormState;

	const [hourOptions] = useState([
		10,//0
		11,//1
		12,//2
		13,//3
		14,//4
		15,//5
		16,//6
		17,//7
		18,//8
		19,//9
		20,//10
		21//11
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
	const [studentOptions] = useState([
		{ name: '김민경', age: 15 },
		{ name: '강민지', age: 16 },
		{ name: '이주은', age: 13 },
		{ name: '아현맨', age: 10 },
		{ name: '오진고', age: 5 },
		{ name: '김진고', age: 7 },
		{ name: '김호주', age: 8 },
	]);

	const [newAddFormState, setNewAddFormState] = useState({
		title: '',
		curDate: new Date(),
		startHour: 10,
		startMinute: 0,
		endHour: 11,
		endminute: 0,
		students: []
	});
	const { title, curDate, startHour, startMinute, endHour, endMinute, students } = newAddFormState;
	const [userData, setUserData] = useUserData();
	const { schedule } = userData;
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

		const newSchedule = insertDate(newAddFormState, schedule);
		if (newSchedule !== false) {
			setUserData({ ...userData, schedule: newSchedule });
			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'add',
				message: [['일정이 추가 되었습니다.']]
			});
		} else {
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [['일정을 추가할 수 없습니다.'], ['해당 시간에 이미 다른 일정이 존재합니다.']]
			});
		}
	};

	const onClickEdit = () => {
		if (title === '') return;
		console.log(newAddFormState)
		console.log(beforeEdit)
		console.log(schedule)
		const newSchedule = editDate(newAddFormState, beforeEdit, schedule);

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

	const onClickDelete = () => {
		const newSchedule = deleteDate(title, curDate, startHour, startMinute, endHour, endMinute, schedule);
		setUserData({ ...userData, schedule: newSchedule });
		setAddFormState({ ...addFormState, active: false });
		setErrorState({
			...errorState,
			active: true,
			mode: 'delete',
			message: [['일정이 삭제 되었습니다.']]
		});
	};


	if (!active) return null;
	else if (active)

		return (
			<div id="panel">
				<div id="add-form">
					<div id="add-form-title">{mode === 'add' ? '일정 추가' : '일정 수정'}</div>
					<div id="input-date-picker-form">
						<div id="input-form">
							<div className="label">수업</div>
							<input id="input-title" value={title} onChange={onChangeNewAddFormState} />
						</div>
						<div id="date-picker-form">
							<div className="label">날짜</div>
							<div id="date-picker">
								<DatePicker selected={curDate} onChange={onChangeCurDate} />
							</div>
						</div>
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
							options={studentOptions}
							getOptionLabel={(option) => option.name}
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
