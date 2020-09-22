import React from 'react';
import {
    Create,
    FormTab,
    ImageInput,
    ImageField,
    TabbedForm,
    TextInput,
    required,
    FileField
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
    price: { width: '7em' },
    width: { width: '7em' },
    height: { width: '7em' },
    stock: { width: '7em' },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);
const CustomImage = ({ source, record = {} }) => <span>{record[source]}</span>;
const ProductCreate = props => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="Details">
                    <TextInput autoFocus source="name" validate={required()} />
                    <ImageInput source="image" label="Related pictures" accept="image/*">
                        <ImageField source="files" title="title" />
                    </ImageInput>
                </FormTab>
                {/*<FormTab label="Size" path="size">*/}
                {/*    <NumberInput*/}
                {/*        source="width"*/}
                {/*        validate={required()}*/}
                {/*        className={classes.width}*/}
                {/*        formClassName={classes.widthFormGroup}*/}
                {/*        InputProps={{*/}
                {/*            endAdornment: (*/}
                {/*                <InputAdornment position="start">*/}
                {/*                    cm*/}
                {/*                </InputAdornment>*/}
                {/*            ),*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <NumberInput*/}
                {/*        source="height"*/}
                {/*        validate={required()}*/}
                {/*        className={classes.height}*/}
                {/*        formClassName={classes.heightFormGroup}*/}
                {/*        InputProps={{*/}
                {/*            endAdornment: (*/}
                {/*                <InputAdornment position="start">*/}
                {/*                    cm*/}
                {/*                </InputAdornment>*/}
                {/*            ),*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</FormTab>*/}
            </TabbedForm>
        </Create>
    );
};

export default ProductCreate;
