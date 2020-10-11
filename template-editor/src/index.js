import React from 'react';
import { Provider } from 'react-redux';
import { getStoreInstance } from './sdk';
import EditTemplateMainView from './widgets/EditTemplateMainView/widget/EditTemplateMainView.connect';
import TemplatePreviewComponent from './widgets/TemplatePreview/widget/TemplatePreview.component';
import TemplatePreviewForProduct from './widgets/TemplatePreview/widget/components/TemplatePreviewForProduct';
const store = getStoreInstance();

const TemplateEditor = (props) => {
  return (
    <Provider store={store}>
      <EditTemplateMainView {...props} />
    </Provider>
  );
};

const TemplatePreviewForPreview = (props) => (
  <TemplatePreviewComponent previewOnly {...props} />
);

export { TemplateEditor, TemplatePreviewForPreview, TemplatePreviewForProduct };
