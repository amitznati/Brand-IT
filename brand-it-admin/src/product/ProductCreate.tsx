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
    SelectArrayInput, Edit
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {BoundedNumberField} from "../commonComponents/BoundedNumberField";
import {TemplatePreviewForProduct} from 'template-editor';
import {propertyByString} from "../utils";

const styles = {
    width: { width: '7em' },
    height: { width: '7em' },
    widthFormGroup: { display: 'inline-block' },
    heightFormGroup: { display: 'inline-block'},
    sizeInput: { margin: '1rem', width: '10rem' },
    sizeTab: {'& .ra-input': {display: 'inline-flex', margin: '1rem'}, '& .ra-input-undefined': {display: 'block'}}
};

const useStyles = makeStyles(styles);
const sizeFields = [
    {label: 'Width', source: 'size.width'},
    {label: 'Height', source: 'size.height'},
    {label: 'Template Frame Width', source: 'templateFrame.width'},
    {label: 'Template Frame Height', source: 'templateFrame.height'},
    {label: 'Template Frame X', source: 'templateFrame.x'},
    {label: 'Template Frame Y', source: 'templateFrame.y'},
];

const ProductPreview = ({imageSrc, sizeState}) => {
    const product = {
        id: 1,
        name: 'temp product',
        image: imageSrc,
        productSize: {
            height: sizeState['size.height'] || 0,
            width: sizeState['size.width'] || 0
        },
        templateFrame: {
            height: sizeState['templateFrame.height'] || 0,
            width: sizeState['templateFrame.width'] || 0,
            x: sizeState['templateFrame.x'] || 0,
            y: sizeState['templateFrame.y'] || 0
        }
    };
    return (
        <div style={{ paddingTop: '4rem' }}>
            <TemplatePreviewForProduct product={product} />
        </div>
    );
};

const ProductImage = (props) => {
    const {imageSrc} = props;
    if (imageSrc) {
        return <img src={imageSrc} alt="product image" height={300} />
    }
    return null;
};

const ProductForm = props => {
    const classes = useStyles();
    const {record = {}} = props;
    const initialSizeState = {};
    sizeFields.forEach((sf) => {
        initialSizeState[sf.source] = propertyByString(record, sf.source);
    });
    const [sizeState, setSizeState] = React.useState(initialSizeState);
    const [imageSrc, setImageSrc] = React.useState<string | ArrayBuffer | null>(null);
    const onSizeChange = React.useCallback((v,name) => {
        setSizeState({...sizeState, [name]: v});
    }, [sizeState]);
    const onImageChanged = (files) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', function () {
            const fileContent = reader.result;
            setImageSrc(fileContent);
        });
        reader.readAsDataURL(files[0]);

    };
    return (
        <TabbedForm {...props}>
            <FormTab label="Details">
                <TextInput source="name" validate={required()}/>
                <ReferenceArrayInput fullWidth source="categories" reference="Category">
                    <SelectArrayInput optionText="name"/>
                </ReferenceArrayInput>
                <ImageInput options={{onDropAccepted: onImageChanged}} source="image" accept="image/*">
                    <ImageField source="files" title="title"/>
                </ImageInput>
                {!imageSrc && <ProductImage imageSrc={record.imageUrl} />}
            </FormTab>
            <FormTab label="Size" contentClassName={classes.sizeTab}>
                {sizeFields.map((field) => (
                    <BoundedNumberField
                        label={field.label}
                        source={field.source}
                        key={field.source}
                        validate={required()}
                        onChange={(v) => onSizeChange(v, field.source)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    cm
                                </InputAdornment>
                            ),
                        }}
                    />)
                )}
                <ProductPreview imageSrc={imageSrc || record.imageUrl} sizeState={sizeState} />
            </FormTab>
        </TabbedForm>
    );
}

export const ProductCreate = props => {

    return (
        <Create {...props}>
            <ProductForm />
        </Create>
    );
};
export const ProductEdit = props => {
    const ProductTitle = (props) => {
        const {record} = props;
        return record ? <span>Product #{record.name}</span> : null;
    }
    return (
        <Edit {...props} title={<ProductTitle />}>
            <ProductForm />
        </Edit>
    );
};
