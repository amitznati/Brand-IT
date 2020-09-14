import * as React from "react";
import { cloneElement } from 'react';
import {
	useListContext,
	TopToolbar,
	CreateButton,
	EditButton,
	ExportButton,
	sanitizeListRestProps,
	List,
	Datagrid,
	TextField
} from 'react-admin';

const CatsActions = (props) => {
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
		basePath,
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
			<EditButton basePath={basePath} />
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
const CatList = (props) => (
	<List {...props} actions={<CatsActions />}>
		<Datagrid>
			<TextField source="name" />
			<TextField label="Owner" source="owner.name" />
		</Datagrid>
	</List>
);
export default CatList;
