import React from 'react';
import {
    Create,
    FormTab,
    ImageInput,
    ImageField,
    TabbedForm,
    TextInput,
    required,
    FileField,
    FileInput
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {ColorInput} from "../commonComponents/ColorInput";

export const styles = {
    width: { width: '7em' },
    height: { width: '7em' },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block'},
    sizeInput: { margin: '1rem', width: '10rem' },
    sizeTab: {'& .ra-input': {display: 'inline-flex', margin: '1rem'}, '& .ra-input-undefined': {display: 'block'}}
};

const useStyles = makeStyles(styles);
const imagesFields = [
    {label: 'Background', source: 'images.bg'},
    {label: 'Frame', source: 'images.frame'},
    {label: 'Side Left', source: 'images.sideL'},
    {label: 'Side Right', source: 'images.sideR'},
    {label: 'Side Bottom', source: 'images.sideB'},
    {label: 'Side Top', source: 'images.sideT'},
];

const fontFamiliesFields = [
    {label: 'Primary', source: 'fontFamilies.primary'},
    {label: 'Secondary', source: 'fontFamilies.secondary'},
    {label: 'Tertiary', source: 'fontFamilies.tertiary'},
];

const paletteFields = [
    {label: 'Primary', source: 'palette.primary'},
    {label: 'Secondary', source: 'palette.secondary'},
    {label: 'Tertiary', source: 'palette.tertiary'},
];

const ThemeCreate = props => {
    const classes = useStyles();
    const validationRequired = required();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="Details">
                    <TextInput source="name" validate={validationRequired} />
                </FormTab>
                <FormTab label="Images" contentClassName={classes.sizeTab}>
                    {imagesFields.map((field) => (
                        <ImageInput key={field.source} source={field.source} accept="image/*">
                            <ImageField source="files" title={field.label} />
                        </ImageInput>)
                    )}
                </FormTab>
                <FormTab label="Font Families" contentClassName={classes.sizeTab}>
                    {fontFamiliesFields.map((field) => (
                        <FileInput key={field.source} source={field.source} label={field.label} accept=".woff2">
                            <FileField source="files" title={field.label} />
                        </FileInput>)
                    )}
                </FormTab>
                <FormTab label="Palette" contentClassName={classes.sizeTab}>
                    {paletteFields.map((field) => (
                        <ColorInput validate={validationRequired} key={field.source} source={field.source} label={field.label} />)
                    )}
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default ThemeCreate;
