import React from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	required
} from 'react-admin';


export const ThemeEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
		</SimpleForm>
	</Edit>
);
