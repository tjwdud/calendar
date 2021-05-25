//자유수업 스케줄 데이터
import React, { useState, useEffect } from 'react';

export const freeUserData = {
	state: { freeSchedule: [] },
	setState(freeUserData) {
		this.state = freeUserData;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
freeUserData.setState = freeUserData.setState.bind(freeUserData);

// this is the custom hook we'll call on components.
export function useFreeUserData() {
	const [ state, set ] = useState(freeUserData.state);
	if (!freeUserData.setters.includes(set)) {
		freeUserData.setters.push(set);
	}
	useEffect(
		() => () => {
			freeUserData.setters = freeUserData.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, freeUserData.setState ];
}
