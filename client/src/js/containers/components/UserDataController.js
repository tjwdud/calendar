export const getSchedule = (startDate, endDate, schedule) => {
	if (schedule.length === 0) return [];

	const start = schedule[0].curDate.getTime();
	const end = schedule[schedule.length - 1].curDate.getTime();
	if (endDate.getTime() < start) return [];//인자 마지막날짜가 스케줄의 시작시간보다 작으면 []
	else if (startDate.getTime() > end) return [];//인자 시작날짜가 스케줄의 끝시간보다 크면 [] 
    //이 달력에 해당하는 스케줄이 없으면 빈 배열을 리턴하는 것이다 
	const newSchedule = [];
	for (let i = 0; i < schedule.length; i++) {
		const curDate = schedule[i].curDate.getTime();
		if (startDate.getTime() <= curDate && endDate.getTime() >= curDate) {//지금 비교하는 스케줄의 날짜가 달력안에 있다면
			newSchedule.push(schedule[i]);
		} else if (newSchedule.length !== 0) {
			break;
		}
	}

	return newSchedule;
};

export const getScheduleDaily = (curDailyDate, schedule) => {
	if (schedule.length === 0) return []; //스케줄 배열의 길이가 0이면 빈 배열 
	 
	const start = schedule[0].curDate.getTime();//첫번째 스케줄의 날짜 
	const end = schedule[schedule.length -1].curDate.getTime();//마지막 스케줄의 날짜

	const newSchedule = [];

	if(curDailyDate.getTime() < start || curDailyDate.getTime() > end){
		return [];
	} 
	for (let i =0; i <schedule.length;i++) {

		const scheduleCurDate = schedule[i].curDate.getTime();
		if(scheduleCurDate === curDailyDate.getTime()){
			newSchedule.push(schedule[i]);
		} else if (newSchedule.length !== 0) {
			break;
		}

	}

	return newSchedule;

};

export const isConflict = (curDate, startHour, startMinute, schedule) => {//날짜를 수정하거나 스케줄을 추가할때 호출되는 함수
	let i = 0;
	for (i = 0; i < schedule.length; i++) {//만약 스케줄에 3개 넣었으면 3번
		const diff = curDate.getTime() - schedule[i].curDate.getTime();//날짜 비교
		const startH = schedule[i].startHour;
		const startM = schedule[i].startMinute;
		if (diff === 0) {//날짜가 같다면 시간을 비교해야겠지...
			if(startHour < startH){
				break;
			} else if (startHour === startH) {
				if(startMinute < startM){
					break;
				} else if(startMinute === startM){//다음 요소도 확인을 해봐야함
					if(	schedule[i+1] == null || startMinute !== schedule[i+1].startMinute ){//다음요소랑 분이 같지 않으면 지금요소 뒤에 삽입 or 지금요소가 마지막 요소라면
						i ++;
						break;	
					} 
				
				}
			}
		} else if (diff < 0) {//지금 실행되는 함수에 입력된 날짜가 가장 빠르다면 배열 0에 들어가기 때문에 i는 
			break;
		}
	}

	return i;//-1이면 
};

export const insertDate = (addFormState, schedule) => {
	const { title, curDate, startHour, startMinute, endHour, endMinute, students } = addFormState;
	const index = isConflict(curDate, startHour, startMinute, schedule);

	if (index !== -1) {
		const newItem = { title, curDate, startHour, startMinute, endHour, endMinute, students };
		return [ ...schedule.slice(0, index), newItem, ...schedule.slice(index) ];
	} else {
		return false;
	}
};

export const editDate = (addFormState, beforeEdit, schedule) => {//수정후, 수정전, 전체 스케줄
	const { title, curDate, startHour, startMinute, endHour, endMinute, students} = addFormState;

	// 이전 할일을 지우고	

	const newSchedule = deleteDate(beforeEdit.title, beforeEdit.curDate, beforeEdit.startHour, beforeEdit.startMinute, beforeEdit.endHour, beforeEdit.endMinute, schedule);

	// 새 할일을 추가하는데

	console.log(newSchedule);//이게 이상해 
	const index = isConflict(curDate, startHour, startMinute, newSchedule);
	if (index !== -1) {
		// 추가에 성공
		const newItem = { title, curDate, startHour, startMinute, endHour, endMinute, students };
		return [ ...newSchedule.slice(0, index), newItem, ...newSchedule.slice(index) ];
	} else {
		// 추가하려는 곳이 중복이면 작업 취소
		return false;
	}
};

export const deleteDate = ( title ,curDate, startHour, startMinute, endHour, endMinute, schedule) => {
	let index = schedule.findIndex(
		(el) =>
		 	el.title === title && el.curDate.getTime() === curDate.getTime() && el.startHour === startHour && el.startMinute === startMinute && el.endHour === endHour && el.endMinute === endMinute 
				? true
				: false
	);

	if (index !== -1) {
		return [ ...schedule.slice(0, index), ...schedule.slice(index + 1) ];
	}

	return schedule;
};
