import React from 'react';
import {
    Create,
    FormTab,
    ImageInput,
    ImageField,
    TabbedForm,
    TextInput,
    required,
    ReferenceArrayInput,
    NumberInput,
    SelectArrayInput
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
    width: { width: '7em' },
    height: { width: '7em' },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block'},
    sizeInput: { margin: '1rem', width: '10rem' }
};

const useStyles = makeStyles(styles);

const ProductCreate = props => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm>
                <FormTab label="Details">
                    <TextInput source="name" validate={required()} />
                    <ReferenceArrayInput fullWidth source="categories" reference="Category">
                        <SelectArrayInput optionText="name" />
                    </ReferenceArrayInput>
                    <ImageInput source="image" accept="image/*">
                        <ImageField source="files" title="title" />
                    </ImageInput>

                </FormTab>
                <FormTab label="Size">
                    <NumberInput
                        source="size.width"
                        label="Width"
                        validate={required()}
                        className={classes.sizeInput}
                        formClassName={classes.widthFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                    />

                    <NumberInput
                        source="size.height"
                        validate={required()}
                        className={classes.sizeInput}
                        formClassName={classes.heightFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        source="templateFrame.width"
                        validate={required()}
                        className={classes.sizeInput}
                        formClassName={classes.widthFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        source="templateFrame.height"
                        validate={required()}
                        className={classes.sizeInput}
                        formClassName={classes.heightFormGroup}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                    />
                    <NumberInput
                        source="templateFrame.x"
                        validate={required()}
                        className={classes.sizeInput}
                        formClassName={classes.widthFormGroup}
                    />
                    <NumberInput
                        source="templateFrame.y"
                        validate={required()}
                        className={classes.sizeInput}
                        formClassName={classes.heightFormGroup}
                    />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default ProductCreate;
