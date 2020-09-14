import * as React from "react";
import { Create, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, required, TopToolbar, ListButton, ShowButton } from 'react-admin';

const CatEditActions = ({ basePath, data }) => (
	<TopToolbar>
		<ListButton basePath={basePath} />
		<ShowButton basePath={basePath} record={data} />
	</TopToolbar>
)
export const CatCreate = (props) => (
	<Create {...props} actions={<CatEditActions />}>
		<SimpleForm>
			<TextInput source="name" />
			<ReferenceInput label="User" source="owner.id" reference="User" validate={[required()]}>
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

export const CatEdit = (props) => (
	<Edit {...props} actions={<CatEditActions />}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name"/>
			<ReferenceInput label="User" source="owner.id" reference="User" validate={[required()]}>
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);
