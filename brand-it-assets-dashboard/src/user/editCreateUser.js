import * as React from "react";
import { Create, Edit, SimpleForm, TextInput} from 'react-admin';

export const UserCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" />
		</SimpleForm>
	</Create>
);

export const UserEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name"/>
		</SimpleForm>
	</Edit>
);
