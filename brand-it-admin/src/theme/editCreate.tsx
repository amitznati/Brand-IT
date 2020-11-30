import React from 'react';
import {
    Create,
    Edit,
    FormTab,
    TabbedForm,
    TextInput,
    required,
    useInput, useGetList
} from 'react-admin';
import {FontSelect} from 'template-editor';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {ColorInput} from "../commonComponents/ColorInput";
import CustomImageField from "../commonComponents/CustomImageField";
import {propertyByString} from "../utils";
import CustomFormToolbar from "../commonComponents/CustomFormToolbar";

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
    {label: 'Background', source: 'bg'},
    {label: 'Frame', source: 'frame'},
    {label: 'Side Left', source: 'sideL'},
    {label: 'Side Right', source: 'sideR'},
    {label: 'Side Bottom', source: 'sideB'},
    {label: 'Side Top', source: 'sideT'},
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
    const {record, source} = props;
    const initialFont = propertyByString(record, source) || {
        fontFamily: 'Raleway',
        fontProvider: 'google',
        fontUrl: ''
    };
    const inputProps = useInput(props);
    const {
        input: { onChange }
    } = inputProps;

    const [font, setFont] = React.useState(initialFont);
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

const ThemeForm = (props) => {
    const classes = useStyles();
    const validationRequired = required();
    return (
        <TabbedForm toolbar={<CustomFormToolbar />} {...props}>
            <FormTab label="Details">
                <TextInput source="name" validate={validationRequired} />
            </FormTab>
            <FormTab label="Images" source="images" contentClassName={classes.sizeTab}>
                {imagesFields.map((field) =>
                    <CustomImageField key={field.source} source={field.source} imageFieldName={`images.${field.source}`}/>
                )}
            </FormTab>
            <FormTab label="Font Families" contentClassName={classes.sizeTab}>
                {fontFamiliesFields.map((field) =>
                    <ThemeFontField source={field.source} label={field.label} key={field.source} />
                )}
            </FormTab>
            <FormTab label="Palette" contentClassName={classes.sizeTab}>
                {paletteFields.map((field) =>
                    <ColorInput validate={validationRequired} key={field.source} source={field.source} label={field.label} />
                )}
            </FormTab>
        </TabbedForm>
    );
};


export const createTheme = props => {
    return (
        <Create {...props}>
            <ThemeForm />
        </Create>
    );
};

export const editTheme = props => (
    <Edit {...props}>
        <ThemeForm />
    </Edit>
);
