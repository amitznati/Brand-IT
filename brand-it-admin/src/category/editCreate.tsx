import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Create, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, required, TopToolbar, ListButton, ShowButton } from 'react-admin';


const useStyles = makeStyles({
	fieldsRoot: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '40rem'
	},
	margin: {
		margin: '2rem 0'
	}
});
const CatEditActions = (props) => {
	const { basePath, data } = props;
	return (
		<TopToolbar>
			<ListButton basePath={basePath} />
			<ShowButton basePath={basePath} record={data} />
		</TopToolbar>
	);
}
const Fields = () => {
	const classes = useStyles();
	return (
		<div className={classes.fieldsRoot}>
			<TextInput className={classes.margin} label="Name" source="name" validate={[required()]} />
			<ReferenceInput className={classes.margin} label="Business" source="business.id" reference="Business" validate={[required()]}>
				<SelectInput optionText="name" />
			</ReferenceInput>
		</div>
	)
}
export const CategoryCreate = (props) => (
	<Create {...props} actions={<CatEditActions />}>
		<SimpleForm>
			<Fields />
		</SimpleForm>
	</Create>
);

export const CategoryEdit = (props) => (
	<Edit {...props} actions={<CatEditActions />}>
		<SimpleForm>
			<TextInput disabled label="Id" source="id" />
			<Fields />
		</SimpleForm>
	</Edit>
);
