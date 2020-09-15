import * as React from "react";
import {Create, Edit, required, SimpleForm, TextInput} from 'react-admin';

export const BusinessCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
		</SimpleForm>
	</Create>
);

export const BusinessEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name" validate={[required()]}/>
		</SimpleForm>
	</Edit>
);
