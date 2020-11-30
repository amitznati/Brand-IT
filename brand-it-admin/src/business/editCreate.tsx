import React from 'react';
import {
	Datagrid,
	Edit,
	Create,
	EditButton,
	ReferenceManyField,
	SimpleForm,
	TextInput,
	required
} from 'react-admin';

import CategoryRefField from '../category/CategoryRefField';
import CustomFormToolbar from "../commonComponents/CustomFormToolbar";

const BusinessTitle = (props) => {
	const { record } = props;
	return record ? (
		<span>
            Business - {record.name}  #  {record.id}
        </span>
	) : null;
};

export const BusinessEdit = (props) => (
	<Edit title={<BusinessTitle />} {...props}>
		<SimpleForm toolbar={<CustomFormToolbar />}>
			<TextInput source="name" validate={[required()]} />
			<ReferenceManyField
				reference="Category"
				target="business"
				label="Categories"
				perPage={20}
				fullWidth
			>
				<Datagrid>
					<CategoryRefField source="Business" />
					<EditButton />
				</Datagrid>
			</ReferenceManyField>
		</SimpleForm>
	</Edit>
);


export const BusinessCreate = (props) => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} />
		</SimpleForm>
	</Create>
);
