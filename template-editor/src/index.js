import React from 'react';
import { Provider } from 'react-redux';
import { getStoreInstance } from './sdk';
import EditTemplateMainView from './widgets/EditTemplateMainView/widget/EditTemplateMainView.connect';
import TemplatePreviewForProduct from './widgets/TemplatePreview/widget/components/TemplatePreviewForProduct';
const store = getStoreInstance();

const TemplateEditor = (props) => {
  return (
    <Provider store={store}>
      <EditTemplateMainView {...props} />
    </Provider>
  );
};

export { TemplateEditor, TemplatePreviewForProduct };
