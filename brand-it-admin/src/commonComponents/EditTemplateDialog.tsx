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
const dynamicTextOptions = ['@brand_name', '@brand_slogan'];
const EditTemplateDialog = ({onClose, open, onSaveTemplate, product}) => {
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
                    product
                }} />
            </DialogContent>
        </Dialog>
    );
};

export default EditTemplateDialog;
