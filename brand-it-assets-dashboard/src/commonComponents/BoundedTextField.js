import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useInput } from 'react-admin';

const BoundedTextField = props => {
	const {
		input: { name, onChange },
		meta: { touched, error },
		isRequired
	} = useInput(props);

	return (
		<TextField
			name={name}
			label={props.label}
			onChange={onChange}
			error={!!(touched && error)}
			helperText={touched && error}
			required={isRequired}
			className={props.className}
		/>
	);
};
export default BoundedTextField;
