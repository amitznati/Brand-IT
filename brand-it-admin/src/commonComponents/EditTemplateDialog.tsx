import React from 'react';
import {TemplateEditor} from 'template-editor';
import 'template-editor/dist/index.css';
import {
    AppBar, Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useGetList} from "react-admin";
const dynamicTextOptions = ['@brand_name', '@brand_slogan'];
const EditTemplateDialog = ({onClose, open, onSaveTemplate, product, template}) => {
    const { data, ids, loading } = useGetList(
        'Font',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    if (loading) return <div>Loading...</div>;
    const uploadedFonts = ids.map((id) => data[id]);
    return (
        <Dialog
            onClose={onClose}
            disableEnforceFocus
            fullScreen
            open={open}
            aria-labelledby='Edit-Template-Dialog'
        >
            <DialogTitle id='Edit-Template-Dialog'>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            onClick={onClose}
                            aria-label='Close'
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit'>
                            Edit Template
                        </Typography>
                    </Toolbar>
                </AppBar>
            </DialogTitle>
            <DialogContent>
                <TemplateEditor onSaveTemplate={onSaveTemplate} initialData={{
                    dynamicTextOptions,
                    product,
                    uploadedFonts,
                    template
                }} />
            </DialogContent>
        </Dialog>
    );
};

export default EditTemplateDialog;
