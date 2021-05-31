import React, { useState, useEffect } from 'react';

export const addStudentState = {
	state: { id: null, studentName: null, studentAge: null },
	setState(addStudentState) {
		this.state = addStudentState;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
addStudentState.setState = addStudentState.setState.bind(addStudentState);

// this is the custom hook we'll call on components.
export function useAddStudentState() {
	const [ state, set ] = useState(addStudentState.state);
	if (!addStudentState.setters.includes(set)) {
		addStudentState.setters.push(set);
	}
	useEffect(
		() => () => {
			addStudentState.setters = addStudentState.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, addStudentState.setState ];
}
