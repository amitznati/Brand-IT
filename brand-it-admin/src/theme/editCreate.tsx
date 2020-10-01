import React from 'react';
import {
	Datagrid,
	Edit,
	Create,
	EditButton,
	ReferenceManyField,
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


export const ThemeCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
		</SimpleForm>
	</Create>
);
