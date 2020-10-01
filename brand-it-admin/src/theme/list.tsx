import * as React from "react";
import {
	List,
	Datagrid,
	TextField, EditButton
} from 'react-admin';
import ListActions from '../commonComponents/ListActions';


const ThemeList = (props) => (
	<List {...props} actions={<ListActions />} >
		<Datagrid>
			<TextField source="name" />
			<EditButton />
		</Datagrid>
	</List>
);
export default ThemeList;
