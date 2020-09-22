import React from 'react';
import {
    Edit,
    FormTab,
    NumberInput,
    TabbedForm,
    TextInput,
    required,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Poster from './Poster';
import { styles as createStyles } from './ProductCreate';

const ProductTitle = (props) => {
    const {record} = props;
    return record ? <span>Poster #{record.reference}</span> : null;
}

const useStyles = makeStyles({
    ...createStyles,
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    tab: {
        maxWidth: '40em',
        display: 'block',
    },
});

const ProductEdit = props => {
    const classes = useStyles();
    return (
        <Edit {...props} title={<ProductTitle />}>
            <TabbedForm>
                <FormTab
                    label="Details"
                    contentClassName={classes.tab}
                >
                    <Poster />
                    <TextInput
                        source="image"
                        fullWidth
                        validate={requiredValidate}
                    />
                    <TextInput source="name" validate={requiredValidate} />
                </FormTab>
                <FormTab
                    label="Size"
                    path="size"
                    contentClassName={classes.tab}
                >
                    <NumberInput
                        source="width"
                        className={classes.width}
                        formClassName={classes.widthFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                        validate={requiredValidate}
                    />
                    <NumberInput
                        source="height"
                        className={classes.height}
                        formClassName={classes.heightFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                        validate={requiredValidate}
                    />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default ProductEdit;
