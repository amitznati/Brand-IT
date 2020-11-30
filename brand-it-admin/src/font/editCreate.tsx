import React from 'react';
import {
	Edit,
	Create,
	SimpleForm,
	TextInput,
	required, FileField, FileInput
} from 'react-admin';
import CustomFormToolbar from "../commonComponents/CustomFormToolbar";

const FontTitle = (props) => {
	const { record } = props;
	return record ? (
		<span>
			{record.name}
        </span>
	) : null;
};

const FontForm = (props) => (
	<SimpleForm {...props} toolbar={<CustomFormToolbar />}>
		<TextInput source="name" validate={[required()]} />
		<FileInput source="fontFile" label="Font File (.woffs)" accept=".woff2">
			<FileField source="files" title="Font File" />
		</FileInput>
	</SimpleForm>
);

export const FontEdit = (props) => (
	<Edit title={<FontTitle />} {...props}>
		<FontForm />
	</Edit>
);


export const FontCreate = (props) => (
	<Create {...props}>
		<FontForm />
	</Create>
);
