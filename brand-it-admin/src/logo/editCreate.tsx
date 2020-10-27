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
import {
	AppBar, Button, Dialog, DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Paper,
	Tab,
	Tabs,
	Toolbar,
	Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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

const EditTemplateDialog = ({onClose, open, onSaveTemplate, product}) => {
	return (
		<Dialog
			onClose={onClose}
			fullScreen
			open={open}
			aria-labelledby='simple-dialog-title'
		>
			<DialogTitle id='simple-dialog-title'>
				<AppBar position='static'>
					<Toolbar>
						<IconButton
							color='inherit'
							onClick={onClose}
							aria-label='Close'
						>
							<CloseIcon />
						</IconButton>
						<Typography variant='h6' color='inherit'>
							Add Layout
						</Typography>
					</Toolbar>
				</AppBar>
			</DialogTitle>
			<DialogContent>
				<TemplateEditor product={product} onSaveTemplate={onSaveTemplate} />
			</DialogContent>
		</Dialog>
	)
}
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
	const onSaveTemplate = template => {
		setTemplateString(JSON.stringify(template));
		setIsEditTemplateOpen(false);
	};
	const classes = useStyles();
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput source="name" validate={[required()]}/>
				<TextInput source="template" value={templateString}/>
				<Button variant="contained" color="primary" onClick={() => setIsEditTemplateOpen(true)}>Edit Template</Button>
				{isEditTemplateOpen && (
					<EditTemplateDialog
						open={true}
						product={logo}
						onSaveTemplate={onSaveTemplate}
						onClose={() => setIsEditTemplateOpen(false)} />
				)}
				{!isEditTemplateOpen && <TemplatePreviewForPreview product={logo} template={JSON.parse(templateString)} />}
			</SimpleForm>
		</Create>
	);
}
