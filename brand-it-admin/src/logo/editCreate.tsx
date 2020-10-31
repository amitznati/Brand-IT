import React from 'react';
import {
	Edit,
	Create,
	SimpleForm,
	TextInput,
	required
} from 'react-admin';
import 'template-editor/dist/index.css';
import EditTemplateField from "../commonComponents/EditTemplateField";


export const LogoEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
		</SimpleForm>
	</Edit>
);

export const LogoCreate = (props) => {

	const logo = {
		name: 'Logo',
		image: '',
		productSize: {
			height: 10,
			width: 10
		},
		templateFrame: {
			height: 10,width: 10, x: 0, y: 0
		}
	};

	return (
		<Create {...props} >
			<SimpleForm >
				<TextInput source="name" validate={[required()]}/>
				<EditTemplateField product={logo} source="template" />
			</SimpleForm>
		</Create>
	);
}
