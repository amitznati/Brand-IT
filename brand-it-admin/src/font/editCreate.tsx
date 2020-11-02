import React from 'react';
import {
	Edit,
	Create,
	SimpleForm,
	TextInput,
	required, FileField, FileInput
} from 'react-admin';

const FontTitle = (props) => {
	const { record } = props;
	return record ? (
		<span>
			{record.name}
        </span>
	) : null;
};

export const FontEdit = (props) => (
	<Edit title={<FontTitle />} {...props}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
			<FileInput source="fontFile" label="Font File (.woffs)" accept=".woff2">
				<FileField source="files" title="Font File" />
			</FileInput>
		</SimpleForm>
	</Edit>
);


export const FontCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
			<FileInput source="fontFile" label="Font File (.woffs)" accept=".woff2">
				<FileField source="files" title="Font File" />
			</FileInput>
		</SimpleForm>
	</Create>
);
