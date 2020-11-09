import React from 'react';
import TemplateEditor from '../widgets/EditTemplateMainView/widget/EditTemplateMainView.connect';
import { Provider } from 'react-redux';
import { getStoreInstance } from '../sdk';

export default {
  title: 'TemplateEditor',
  component: TemplateEditor
};
const dynamicTextOptions = ['@brand_name', '@brand_slogan'];
const dynamicImageOptions = [
  '@theme-image-bg',
  '@theme-image-frame',
  '@theme-image-sideL',
  '@theme-image-sideR',
  '@theme-image-sideB',
  '@theme-image-sideT'
];

export const EditorModeLogo = () => {
  const logo = {
    name: 'Logo',
    image: '',
    size: {
      height: 10,
      width: 10
    },
    templateFrame: {
      height: 10,
      width: 10,
      x: 0,
      y: 0
    }
  };
  const dynamicTextValues = {
    '@brand_name': 'Brant-It'
  };
  return (
    <Provider store={getStoreInstance()}>
      <TemplateEditor
        initialData={{
          dynamicTextOptions,
          dynamicTextValues,
          dynamicImageOptions,
          product: logo
        }}
      />
    </Provider>
  );
};
