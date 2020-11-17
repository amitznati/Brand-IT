import React from "react";
import RefreshIcon from '@material-ui/icons/Refresh';
import {
    Show,
    SimpleShowLayout,
    TextField,
    useMutation,
    Button,
    SimpleForm,
    Toolbar,
    useNotify,
    useRefresh
} from 'react-admin';
import {ProductTitle} from "./ProductCreate";
import EditTemplateField from "../commonComponents/EditTemplateField";
import ProductTemplatesPreview from "./ProductTemplatesPreview";
import ThemeSelect from "../commonComponents/ThemeSelect";

const initialTemplate = JSON.stringify({ templateGradients: [], templateFilters: [], layouts: [] });

const SaveTemplateButton = (props) => {
    const {record, template: {template, id}, onAddTemplate} = props;
    const notify = useNotify();
    const [approve, { loading }] = useMutation({
        type: 'addTemplate',
        resource: 'Product',
        payload: { id: record.id, template, templateId: id}
    }, {
        onSuccess: () => {
            notify('Template Saved', 'info', {}, true);
            onAddTemplate()
        }
    });
    return (
        <Button
            label="Save"
            onClick={approve}
            disabled={loading || template === initialTemplate}
        />
    );
};

const PostCreateToolbar = ({template, resetTemplateInEdit, onAddTemplate, ...props}) => (
    <Toolbar {...props} >
        <SaveTemplateButton template={template} {...{onAddTemplate}} />
        <Button
            label="Cancel"
            onClick={resetTemplateInEdit}
            disabled={template.template === initialTemplate} />;
    </Toolbar>
);
const EditTemplateForProduct = ({templateInEdit, setTemplateInEdit, resetTemplateInEdit, onAddTemplate, ...props}) => {
    return (
        <SimpleForm toolbar={<PostCreateToolbar template={templateInEdit} {...{resetTemplateInEdit, onAddTemplate}} />} {...props}>
            <EditTemplateField
                template={templateInEdit.template}
                recource="template"
                scale={0.4}
                onSave={(template) => setTemplateInEdit({...templateInEdit, template})} />
        </SimpleForm>
    );
}
export const ProductShow = ({hasShow, ...rest}) => {
    const refresh = useRefresh();
    const [selectedTheme, setSelectedTheme] = React.useState<{id: string} | null>(null);
    const [templateInEdit, setTemplateInEdit] = React.useState({
        template: initialTemplate,
    });
    const [isRefreshRequired, setIsRefreshRequired] = React.useState(true);
    const resetTemplateInEdit = () => {
        setTemplateInEdit({
            template: initialTemplate,
        });
    };
    const onAddTemplate = () => {
        resetTemplateInEdit();
        refresh();
    }
    const onSelectTheme = (theme) => {
      if (theme.id === selectedTheme?.id) {
          setSelectedTheme(null);
      } else {
          setSelectedTheme(theme);
      }
    };
    return (
        <Show {...rest} title={<ProductTitle/>}>
            <SimpleShowLayout>
                <TextField source="name"/>
                <EditTemplateForProduct {...{templateInEdit, setTemplateInEdit, resetTemplateInEdit, onAddTemplate }} />
                <ThemeSelect onSelect={onSelectTheme} selectedTheme={selectedTheme} />
                <Button onClick={refresh} size="large" ><RefreshIcon /></Button>
                <ProductTemplatesPreview {...{selectedTheme, refresh}} onEditTemplate={setTemplateInEdit} />
            </SimpleShowLayout>
        </Show>
    );
}
