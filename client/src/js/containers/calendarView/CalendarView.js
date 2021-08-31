import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import Monthly from './Monthly';
import Weekly from './Weekly';
import Daily from './Dailyview';

// store
import { useCalendarState } from 'js/stores/calendarState';
const CalendarView = () => {
	const [calendarState, setCalendarState] = useCalendarState();
	const { mode } = calendarState;
	//return <div id="calendar-view">{mode === 'monthly' ? <Monthly /> : <Weekly />}</div>;
	
	
	switch (mode) {
		case 'monthly':
			return <div id="calendar-view"><Monthly /></div>;
		case 'weekly':
			return <div id="calendar-view"><Weekly /></div>;
		case 'daily':
			return <div id="calendar-view"><Daily /></div>
		default:
			return null;
	}
	
};

export default CalendarView;
