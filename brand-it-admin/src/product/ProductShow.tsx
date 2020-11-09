import * as React from "react";
import { Show, SimpleShowLayout, TextField, useMutation, Button} from 'react-admin';
import {ProductTitle} from "./ProductCreate";

const ApproveButton = (props) => {
    const {record} = props;
    const [approve, { loading }] = useMutation({
        type: 'addTemplate',
        resource: 'Product',
        payload: { id: record.id, template: "sdfsdf" }
    });
    return <Button label="Approve" onClick={approve} disabled={loading} />;
};

export const ProductShow = ({hasShow, ...rest}) => (
    <Show {...rest} title={<ProductTitle />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ApproveButton />
        </SimpleShowLayout>
    </Show>
);
