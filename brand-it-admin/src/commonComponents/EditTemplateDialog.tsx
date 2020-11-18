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
import {defaultLogo, defaultTheme} from './defaults';

const dynamicImageOptions = [
    '@theme-image-bg',
    '@theme-image-frame',
    '@theme-image-sideL',
    '@theme-image-sideR',
    '@theme-image-sideB',
    '@theme-image-sideT'
];
const EditTemplateDialog = ({onClose, open, onSaveTemplate, product, template}) => {
    const { data, ids, loading } = useGetList(
        'Font',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    // const { data: themes, ids: themesIds, loading: themesLoading } = useGetList(
    //     'Theme',
    //     { page: 1, perPage: 100 },
    //     { field: 'name', order: 'ASC' }
    // );
    if (loading) return <span>Loading...</span>;
    const uploadedFonts = ids.map((id) => data[id]);
    // const selectedTheme = themesIds.length && themes[themesIds[1]];
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
                    dynamicImageOptions,
                    product,
                    uploadedFonts,
                    template,
                    selectedTheme: defaultTheme,
                    selectedLogo: defaultLogo
                }} />
            </DialogContent>
        </Dialog>
    );
};

export default EditTemplateDialog;
