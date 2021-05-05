export const getSchedule = (startDate, endDate, schedule) => {
	if (schedule.length === 0) return [];

	const start = schedule[0].curDate.getTime();
	const end = schedule[schedule.length - 1].curDate.getTime();
	if (endDate.getTime() < start) return [];
	else if (startDate.getTime() > end) return [];

	const newSchedule = [];
	for (let i = 0; i < schedule.length; i++) {
		const curDate = schedule[i].curDate.getTime();
		if (startDate.getTime() <= curDate && endDate.getTime() >= curDate) {
			newSchedule.push(schedule[i]);
		} else if (newSchedule.length !== 0) {
			break;
		}
	}

	return newSchedule;
};

export const isConflict = (curDate, startHour, endHour, schedule) => {//날짜를 수정하거나 스케줄을 추가할때 호출되는 함수
	let i = 0;
	for (i = 0; i < schedule.length; i++) {//만약 스케줄에 3개 넣었으면 3번
		const diff = curDate.getTime() - schedule[i].curDate.getTime();
		//지금 현재 시간-스케줄에 있는 시간
		if (diff === 0) {//그 두시간이 같다면
			const start = schedule[i].startHour;
			const end = schedule[i].endHour;

			if (startHour < start) {//현재 함수의 시작시간이 이미 배열에 존재하는 시작 시간들보다 작으면
				if (endHour <= start) {//그리고 현재 함수의 종료시간이 이미 배열에 존재하는 시작 시간들보다 작거나 같은경우
					break;//그만한다
				} else {//현재 함수의 종료시간이 배열에 존재하는 시작 시간들보다 큰경우 -1
					return -1;
				}
			} else if (startHour === start || (startHour > start && startHour < end)) {
				return -1;
			} else if (startHour >= endHour) {
				i++;
				break;
			}
		} else if (diff < 0) {
			break;
		}
	}

	return i;//-1이면 
};

export const insertDate = (addFormState, schedule) => {
	const { title, curDate, startHour, startMinute, endHour, endMinute } = addFormState;
	const index = isConflict(curDate, startHour, endHour, schedule);

	if (index !== -1) {
		const newItem = { title, curDate, startHour, startMinute, endHour, endMinute };
		return [ ...schedule.slice(0, index), newItem, ...schedule.slice(index) ];
	} else {
		return false;
	}
};

export const editDate = (addFormState, beforeEdit, schedule) => {
	const { title, curDate, startHour, startMinute, endHour, endMinute} = addFormState;

	// 이전 할일을 지우고
	const newSchedule = deleteDate(beforeEdit.curDate, beforeEdit.startHour, beforeEdit.startMinute, beforeEdit.endHour, beforeEdit.endMinute, schedule);
	// 새 할일을 추가하는데
	const index = isConflict(curDate, startHour, startMinute, endHour, endMinute, newSchedule);
	if (index !== -1) {
		// 추가에 성공
		const newItem = { title, curDate, startHour, startMinute, endHour, endMinute };
		return [ ...newSchedule.slice(0, index), newItem, ...newSchedule.slice(index) ];
	} else {
		// 추가하려는 곳이 중복이면 작업 취소
		return false;
	}
};

export const deleteDate = (curDate, startHour, startMinute, endHour, endMinute, schedule) => {
	let index = schedule.findIndex(
		(el) =>
			el.curDate.getTime() === curDate.getTime() && el.startHour === startHour && el.startMinute === startMinute && el.endHour === endHour && el.endMinute === endMinute
				? true
				: false
	);

	if (index !== -1) {
		return [ ...schedule.slice(0, index), ...schedule.slice(index + 1) ];
	}

	return schedule;
};
