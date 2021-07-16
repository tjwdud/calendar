import React, { useState, useEffect } from 'react';

export const freeTimeTableData = {
	state: { freeTimeTableSchedule: [] },
	setState(freeTimeTableData) {
		this.state = freeTimeTableData;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
freeTimeTableData.setState = freeTimeTableData.setState.bind(freeTimeTableData);

// this is the custom hook we'll call on components.
export function useFreeTimeTableData() {
	const [ state, set ] = useState(freeTimeTableData.state);
	if (!freeTimeTableData.setters.includes(set)) {
		freeTimeTableData.setters.push(set);
	}
	useEffect(
		() => () => {
			freeTimeTableData.setters = freeTimeTableData.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, freeTimeTableData.setState ];
}
