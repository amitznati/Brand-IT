import React from 'react';
import { Edit } from 'react-admin';

import {ProductForm} from './ProductCreate';


const ProductTitle = (props) => {
    const {record} = props;
    return record ? <span>Product #{record.name}</span> : null;
}



const ProductEdit = props => {
    return (
        <Edit {...props} title={<ProductTitle />}>
            <ProductForm />
        </Edit>
    );
};

export default ProductEdit;
