import React from 'react';
import TemplateEditor from '../widgets/EditTemplateMainView/widget/EditTemplateMainView.connect';
import { Provider } from 'react-redux';
import { getStoreInstance } from '../sdk';

export default {
  title: 'TemplateEditor',
  component: TemplateEditor
};

export const EditorMode = () => {
  const logo = {
    name: 'Logo',
    image: '',
    productSize: {
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
  return (
    <Provider store={getStoreInstance()}>
      <TemplateEditor product={logo} />
    </Provider>
  );
};
