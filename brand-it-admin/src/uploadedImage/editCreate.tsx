import React from 'react';
import {
	Edit,
	Create,
	SimpleForm,
	TextInput,
	required, ImageField, ImageInput
} from 'react-admin';
import {ProductImage} from "../product/ProductCreate";

const FontTitle = (props) => {
	const { record } = props;
	return record ? (
		<span>
			Uploaded Images: {record.name}
        </span>
	) : null;
};

const UploadedImageForm = (props) => {
	const {record} = props;
	const [imageSrc, setImageSrc] = React.useState<string | ArrayBuffer | null>(null);
	const onImageChanged = (files) => {
		const reader = new FileReader();
		reader.addEventListener('loadend', function () {
			const fileContent = reader.result;
			setImageSrc(fileContent);
		});
		reader.readAsDataURL(files[0]);

	};
	return (
		<SimpleForm {...props}>
			<TextInput source="name" validate={[required()]}/>
			<ImageInput options={{onDropAccepted: onImageChanged}} source="UploadedImageFile" label="Image File" accept="image/*" validate={[required()]}>
				<ImageField source="files" title="Image File"/>
			</ImageInput>
			{!imageSrc && record && <ProductImage imageSrc={record.url} />}
		</SimpleForm>
	);
}

export const UploadedImageEdit = (props) => (
	<Edit title={<FontTitle />} {...props}>
		<UploadedImageForm />
	</Edit>
);


export const UploadedImageCreate = (props) => (
	<Create {...props}>
		<UploadedImageForm />
	</Create>
);
