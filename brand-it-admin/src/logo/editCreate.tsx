import React from 'react';
import {
	Edit,
	Create,
	SimpleForm,
	TextInput,
	required,
	Toolbar
} from 'react-admin';
import {TemplatePreviewForPreview} from 'template-editor';
import 'template-editor/dist/index.css';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import EditTemplateDialog from "../commonComponents/EditTemplateDialog";
import SaveLogoButton from "./SaveLogoButton";
import EditTemplateField from "../commonComponents/EditTemplateField";

const useStyles = makeStyles(() => ({
	hiddenTextInput: {
		visibility: 'hidden'
	}
}));
export const LogoEdit = (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
		</SimpleForm>
	</Edit>
);

export const LogoCreate = (props) => {
	const initialTemplate = { templateGradients: [], templateFilters: [], layouts: [] };
	const [templateString, setTemplateString] = React.useState(JSON.stringify(initialTemplate));
	const [isEditTemplateOpen, setIsEditTemplateOpen] = React.useState(false);
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

	// const LogoCreateToolbar = props => (
	// 	<Toolbar {...props} >
	// 		<SaveLogoButton customValues={{template: templateString}} />
	// 	</Toolbar>
	// );

	return (
		<Create {...props} >
			<SimpleForm >
				<TextInput source="name" validate={[required()]}/>
				<EditTemplateField product={logo} source="template" />
			</SimpleForm>
		</Create>
	);
}
