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

const logo = {
	name: 'Logo',
	image: '',
	size: {
		height: 10,
		width: 10
	},
	templateFrame: {
		height: 10,width: 10, x: 0, y: 0
	},
	dynamicTextOptions: ['Brand Name', 'Slogan']
};

const LogoForm = (props) => {
	return (
		<SimpleForm {...props}>
			<TextInput source="name" validate={[required()]}/>
			<EditTemplateField product={logo} source="template" />
		</SimpleForm>
	)
}

export const LogoEdit = (props) => (
	<Edit {...props}>
		<LogoForm />
	</Edit>
);

export const LogoCreate = (props) => (
	<Create {...props} >
		<LogoForm />
	</Create>
);
