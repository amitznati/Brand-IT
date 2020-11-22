import React from 'react';
import {
    Create,
    FormTab,
    ImageInput,
    ImageField,
    TabbedForm,
    TextInput,
    required,
    useInput, useGetList
} from 'react-admin';
import {FontSelect} from 'template-editor';
import { Grid, CircularProgress } from '@material-ui/core';
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

const ThemeFontField = (props) => {
    const { data, ids, loading } = useGetList(
        'Font',
        { page: 1, perPage: 100 },
        { field: 'name', order: 'ASC' }
    );
    const inputProps = useInput(props);
    const {
        input: { onChange }
    } = inputProps;

    const [font, setFont] = React.useState({
        fontFamily: 'Raleway',
        fontProvider: 'google',
        fontUrl: ''
    });
    const [loadingState, setLoadingState] = React.useState({
        status: '',
        selectedFontFamily: font.fontFamily,
        selectedFontStyle: 'normal',
        selectedFontWeight: 400
    });
    const onFontFamilyChange = font => {
        setFont(font);
        onChange(font);
    };
    const onFontProviderChange = v => {
        if (ids.length) {
            const isGoogle = v === 0;
            onFontFamilyChange({
                fontFamily: isGoogle ? 'Raleway' : data[ids[0]].name,
                fontProvider: isGoogle ? 'google' : 'uploaded',
                fontUrl: isGoogle ? '' : data[ids[0]].url
            });
        }
    }
    React.useEffect(() => onChange(font), [font, onChange]);
    if (loading) return <div>Loading...</div>;
    return (
        <Grid container>
            {props.label}
            <Grid item xs={12}>
                <FontSelect
                    {...{
                        fontProvider: font.fontProvider,
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontFamily: font.fontFamily,
                        uploadedFonts: ids.map(id => data[id]),
                        onFontProviderChange,
                        onFontFamilyChange,
                        setLoadingState
                    }}
                />
            </Grid>
            <Grid item>
                {loadingState.status === 'loading' && (
                    <CircularProgress style={{ margin: '1rem' }}/>
                )}
                {loadingState.status === 'inactive' && (
                    <div style={{ color: 'red' }}>
                        {`Failed To Load: ${loadingState.selectedFontFamily} ${loadingState.selectedFontWeight} ${loadingState.selectedFontStyle}`}
                    </div>
                )}
                {loadingState.status === 'active' && (
                    <div style={{ color: 'green' }}>
                        {`Load: ${loadingState.selectedFontFamily} ${loadingState.selectedFontWeight} ${loadingState.selectedFontStyle}`}
                    </div>
                )}
            </Grid>
        </Grid>
    );
};

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
                        <ThemeFontField source={field.source} label={field.label} key={field.source} />)
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
