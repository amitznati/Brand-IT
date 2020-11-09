import * as React from "react";
import { Show, SimpleShowLayout, TextField, useMutation, Button, SimpleForm, Toolbar} from 'react-admin';
import {ProductTitle} from "./ProductCreate";
import EditTemplateField from "../commonComponents/EditTemplateField";
import ProductTemplatesPreview from "./ProductTemplatesPreview";

const ApproveButton = (props) => {
    const {record, template} = props;
    const [approve, { loading }] = useMutation({
        type: 'addTemplate',
        resource: 'Product',
        payload: { id: record.id, template}
    });
    return <Button label="Save" onClick={approve} disabled={loading} />;
};

const PostCreateToolbar = ({template, ...props}) => (
    <Toolbar {...props} >
        <ApproveButton template={template} />
    </Toolbar>
);
const EditTemplateForProduct = props => {
    const [templateInEdit, setTemplateInEdit] = React.useState(JSON.stringify({ templateGradients: [], templateFilters: [], layouts: [] }));
    return (
        <SimpleForm toolbar={<PostCreateToolbar template={templateInEdit} />} {...props}>
            <EditTemplateField recource="template" scale={0.4} onSave={setTemplateInEdit} />
        </SimpleForm>
    );
}
export const ProductShow = ({hasShow, ...rest}) => {

    console.log(rest);
    return (
        <Show {...rest} title={<ProductTitle/>}>
            <SimpleShowLayout>
                <TextField source="name"/>
                <EditTemplateForProduct />
                <ProductTemplatesPreview />
            </SimpleShowLayout>
        </Show>
    );
}
