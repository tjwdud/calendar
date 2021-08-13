import React, { useState, useEffect } from 'react';

export const adminState = {
	state: false,
	setState(adminState) {
		this.state = adminState;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
adminState.setState = adminState.setState.bind(adminState);

// this is the custom hook we'll call on components.
export function useAdminState() {
	const [ state, set ] = useState(adminState.state);
	if (!adminState.setters.includes(set)) {
		adminState.setters.push(set);
	}
	useEffect(
		() => () => {
			adminState.setters = adminState.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, adminState.setState ];
}
