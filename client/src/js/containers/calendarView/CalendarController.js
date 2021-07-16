
export const makeCalendar = (firstDate, lastDate) => {
    let tempDate = new Date(firstDate);//첫번째 날짜 가져와
    const newDates = [['일'], ['월'], ['화'], ['수'], ['목'], ['금'], ['토']];
    const tempTime = [12, 13, 14, 15, 16, 17, 18, 19];
    let index = 0;
    while (tempDate.getDate() !== lastDate.getDate()) {
        newDates[index].push(tempDate);//0 요일 인덱스에 현재 날짜 붙여
        newDates[index] = newDates[index].concat(tempTime);//시간븉요
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);//다음날
        index++;
    }
    newDates[index].push(tempDate);
    newDates[index] = newDates[index].concat(tempTime);

    return newDates.slice();
};

export const convertTimetableDate = (firstDate, schedules) => {
		let newTimetableSchedule = [];

		newTimetableSchedule = JSON.parse(JSON.stringify(schedules));//깊은 복사를 위해 
		newTimetableSchedule = newTimetableSchedule.map((a) => {
			return { ...a, curDate: new Date(a.curDate) };//깊은복사시 Date값이 달라지기 때문에 
		})
		let i = 0;
		//시간표 스케줄들을 가져와서 현재 날짜 기준으로 바꿔준다.
		for (i = 0; newTimetableSchedule.length > i; i++) {

			switch (newTimetableSchedule[i].curDate.getDate()) {
				case 1: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1);
					break;
				case 2: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 2);
					break;
				case 3: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 3);
					break;
				case 4: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 4);
					break;
				case 5: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 5);
					break;
				case 6: newTimetableSchedule[i].curDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 6);
					break;
				default:
					break;
			}
		}
		return newTimetableSchedule;
    }

export const getCurDateSchedule = (curDate, startHour, curSchedule) => {
    let curDateSchedule = [];
    curSchedule.forEach((date) => {
        if (date.curDate.getTime() === curDate.getTime() && date.startHour === startHour) {
            curDateSchedule.push(date);
        }
    });


    return curDateSchedule;
};


export const makeTimeTable = () => {
    let tempDate = new Date(2021, 2, 0);
    const newDates = [['일'], ['월'], ['화'], ['수'], ['목'], ['금'], ['토']];
    const tempTime = [12, 13, 14, 15, 16, 17, 18, 19];
    for (let i = 0; i < 7; i++) {
        newDates[i].push(tempDate);
        newDates[i] = newDates[i].concat(tempTime);
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);//다음날

    }
    return newDates.slice();
};