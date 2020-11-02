import React from 'react';
import {Button} from "@material-ui/core";
import {TemplatePreviewForPreview} from 'template-editor';
import EditTemplateDialog from "./EditTemplateDialog";
import {useInput} from "react-admin";

export default (props) => {
    const {product, record, source} = props;
    const inputProps = useInput(props);
    const {
        input: { name, onChange }
    } = inputProps;

    const initialTemplate = (record && record[source]) || JSON.stringify({ templateGradients: [], templateFilters: [], layouts: [] });
    console.log(initialTemplate);
    console.log(record[source]);
    const [templateString, setTemplateString] = React.useState(initialTemplate);
    const [isEditTemplateOpen, setIsEditTemplateOpen] = React.useState(false);
    const onSaveTemplate = template => {
        const str = JSON.stringify(template);
        setTemplateString(str);
        setIsEditTemplateOpen(false);
        onChange && onChange(str)
    };
    return (
        <div>
            <input type="text" id={name} readOnly name={name} value={templateString}/>
            <Button variant="contained" color="primary" onClick={() => setIsEditTemplateOpen(true)}>Edit Template</Button>

            {isEditTemplateOpen && (
                <EditTemplateDialog
                    open={true}
                    product={product}
                    template={JSON.parse(templateString)}
                    onSaveTemplate={onSaveTemplate}
                    onClose={() => setIsEditTemplateOpen(false)} />
            )}
            {!isEditTemplateOpen && <TemplatePreviewForPreview product={product} template={JSON.parse(templateString)} />}
        </div>
    )
}
