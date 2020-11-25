import * as React from "react";
import {
	EditButton,
	List,
	Datagrid,
	TextField, Filter, SearchInput
} from 'react-admin';
import ListActions from '../commonComponents/ListActions';
import LinkToRelatedProducts from "./LinkToRelatedProducts";

export const CategoryFilter = props => (
	<Filter {...props}>
		<SearchInput source="q" alwaysOn />
	</Filter>
);
const CategoryList = (props) => (
	<List {...props} actions={<ListActions filters={<CategoryFilter />} />}>
		<Datagrid>
			<TextField source="name" />
			<TextField label="Business" source="business.name" />
			<EditButton />
			<LinkToRelatedProducts />
		</Datagrid>
	</List>
);
export default CategoryList;
