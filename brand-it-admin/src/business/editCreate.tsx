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

const BusinessTitle = (props) => {
	const { record } = props;
	return record ? (
		<span>
            resources.categories.name &quot;
			{record.name}&quot;
        </span>
	) : null;
};

export const BusinessEdit = (props) => (
	<Edit title={<BusinessTitle />} {...props}>
		<SimpleForm>
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
					{/*<NumberField*/}
					{/*	source="price"*/}
					{/*	options={{ style: 'currency', currency: 'USD' }}*/}
					{/*/>*/}
					{/*<NumberField*/}
					{/*	source="width"*/}
					{/*	options={{ minimumFractionDigits: 2 }}*/}
					{/*/>*/}
					{/*<NumberField*/}
					{/*	source="height"*/}
					{/*	options={{ minimumFractionDigits: 2 }}*/}
					{/*/>*/}
					{/*<NumberField source="stock" />*/}
					{/*<NumberField source="sales" />*/}
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
