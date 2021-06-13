import React, { useState, useEffect } from 'react';

export const timeTableData = {
	state: { timeTableSchedule: [] },
	setState(timeTableData) {
		this.state = timeTableData;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
timeTableData.setState = timeTableData.setState.bind(timeTableData);

// this is the custom hook we'll call on components.
export function useTimeTableData() {
	const [ state, set ] = useState(timeTableData.state);
	if (!timeTableData.setters.includes(set)) {
		timeTableData.setters.push(set);
	}
	useEffect(
		() => () => {
			timeTableData.setters = timeTableData.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, timeTableData.setState ];
}
