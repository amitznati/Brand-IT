import * as React from "react";
import { cloneElement } from 'react';
import {
	useListContext,
	TopToolbar,
	CreateButton,
	ExportButton,
	sanitizeListRestProps,
	List,
	Datagrid,
	TextField
} from 'react-admin';

const UsersActions = (props) => {
	const {
		className,
		exporter,
		filters,
		maxResults,
		...rest
	} = props;
	const {
		currentSort,
		resource,
		displayedFilters,
		filterValues,
		hasCreate,
		basePath,
		selectedIds,
		showFilter,
		total,
	} = useListContext();
	return (
		<TopToolbar className={className} {...sanitizeListRestProps(rest)}>
			{filters && cloneElement(filters, {
				resource,
				showFilter,
				displayedFilters,
				filterValues,
				context: 'button',
			})}
			<CreateButton basePath={basePath} />
			<ExportButton
				disabled={total === 0}
				resource={resource}
				sort={currentSort}
				filterValues={filterValues}
				maxResults={maxResults}
			/>
		</TopToolbar>
	);
};
const UserList = (props) => (
	<List {...props} actions={<UsersActions />}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
		</Datagrid>
	</List>
);
export default UserList;
