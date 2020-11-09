import React from 'react';
import {Button} from "@material-ui/core";
import {TemplatePreviewForPreview} from 'template-editor';
import EditTemplateDialog from "./EditTemplateDialog";
import {useInput} from "react-admin";

export default (props) => {
    const {record, source, scale} = props;
    const product = props.product || record;
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
        if (props.onSave) {
            props.onSave(str)
        } else if (onChange) {
            onChange(str);
        }
    };
    return (
        <div>
            <input style={{visibility: 'hidden', width: 0}} type="text" id={name} readOnly name={name} value={templateString}/>
            <Button variant="contained" color="primary" onClick={() => setIsEditTemplateOpen(true)}>Edit Template</Button>

            {isEditTemplateOpen && (
                <EditTemplateDialog
                    open={true}
                    product={product}
                    template={JSON.parse(templateString)}
                    onSaveTemplate={onSaveTemplate}
                    onClose={() => setIsEditTemplateOpen(false)} />
            )}
            <TemplatePreviewForPreview scale={scale} product={product} template={JSON.parse(templateString)} />
        </div>
    )
}
