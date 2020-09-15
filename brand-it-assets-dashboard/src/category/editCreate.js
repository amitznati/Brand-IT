import * as React from "react";
import { Create, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, required, TopToolbar, ListButton, ShowButton } from 'react-admin';

const CatEditActions = ({ basePath, data }) => (
	<TopToolbar>
		<ListButton basePath={basePath} />
		<ShowButton basePath={basePath} record={data} />
	</TopToolbar>
)
export const CategoryCreate = (props) => (
	<Create {...props} actions={<CatEditActions />}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
			<ReferenceInput label="Business" source="business.id" reference="Business" validate={[required()]}>
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

export const CategoryEdit = (props) => (
	<Edit {...props} actions={<CatEditActions />}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<TextInput source="name" validate={[required()]} />
			<ReferenceInput label="Business" source="business.id" reference="Business" validate={[required()]}>
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);
