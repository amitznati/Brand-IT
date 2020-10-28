import React from 'react';
import {
	Edit,
	Create,
	SimpleForm,
	TextInput,
	required
} from 'react-admin';
import {TemplateEditor, TemplatePreviewForPreview} from 'template-editor';
import logoImage from './logo.png'
import 'template-editor/dist/index.css';
import {makeStyles} from "@material-ui/core/styles";

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
	const onSaveTemplate = template => {
		setTemplateString(JSON.stringify(template));
	};
	const classes = useStyles();
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput source="name" validate={[required()]}/>
				<TextInput source="template" value={templateString}/>
				<TemplateEditor product={logo} onSaveTemplate={onSaveTemplate} />
				<TemplatePreviewForPreview product={logo} template={JSON.parse(templateString)} />
			</SimpleForm>
		</Create>
	);
}
