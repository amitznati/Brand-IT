import * as React from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    useMutation,
    Button,
    SimpleForm,
    Toolbar
} from 'react-admin';
import {ProductTitle} from "./ProductCreate";
import EditTemplateField from "../commonComponents/EditTemplateField";
import ProductTemplatesPreview from "./ProductTemplatesPreview";
import ThemeSelect from "../commonComponents/ThemeSelect";

const ApproveButton = (props) => {
    const {record, template: {template, id}} = props;
    const [approve, { loading }] = useMutation({
        type: 'addTemplate',
        resource: 'Product',
        payload: { id: record.id, template, templateId: id}
    });
    return <Button label="Save" onClick={approve} disabled={loading} />;
};

const PostCreateToolbar = ({template, ...props}) => (
    <Toolbar {...props} >
        <ApproveButton template={template} />
    </Toolbar>
);
const EditTemplateForProduct = ({templateInEdit, setTemplateInEdit, ...props}) => {
    return (
        <SimpleForm toolbar={<PostCreateToolbar template={templateInEdit} />} {...props}>
            <EditTemplateField
                template={templateInEdit.template}
                recource="template"
                scale={0.4}
                onSave={(template) => setTemplateInEdit({...templateInEdit, template})} />
        </SimpleForm>
    );
}
export const ProductShow = ({hasShow, ...rest}) => {
    const [selectedTheme, setSelectedTheme] = React.useState();
    const [templateInEdit, setTemplateInEdit] = React.useState({
        template: JSON.stringify({ templateGradients: [], templateFilters: [], layouts: [] }),
    });
    return (
        <Show {...rest} title={<ProductTitle/>}>
            <SimpleShowLayout>
                <TextField source="name"/>
                <EditTemplateForProduct templateInEdit={templateInEdit} setTemplateInEdit={setTemplateInEdit}/>
                <ThemeSelect onSelect={setSelectedTheme} selectedTheme={selectedTheme} />
                <ProductTemplatesPreview selectedTheme={selectedTheme} onEditTemplate={setTemplateInEdit}/>
            </SimpleShowLayout>
        </Show>
    );
}
