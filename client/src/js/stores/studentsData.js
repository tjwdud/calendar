import React, { useState, useEffect } from 'react';

export const studentsData = {
	state: { students: [] },
	setState(studentsData) {
		this.state = studentsData;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
studentsData.setState = studentsData.setState.bind(studentsData);

// this is the custom hook we'll call on components.
export function useStudentsData() {
	const [ state, set ] = useState(studentsData.state);
	if (!studentsData.setters.includes(set)) {
		studentsData.setters.push(set);
	}
	useEffect(
		() => () => {
			studentsData.setters = studentsData.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, studentsData.setState ];
}
