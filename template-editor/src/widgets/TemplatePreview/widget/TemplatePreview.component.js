import React from 'react';
import TemplatePreviewMainView from './components/TemplatePreview.mainView';
import { mapComponentProps } from './TemplatePreview.propsMappar';
import FontLoader from '../../../sdk/services/fontLoader';

export default function TemplatePreviewComponent(props) {
  const componentProps = mapComponentProps(props);
  const { allFonts } = componentProps;
  const { googleFonts, uploadedFonts } = allFonts || {};
  const fontProvider = [];
  if (googleFonts.length) fontProvider.push('google');
  if (uploadedFonts.length) fontProvider.push('custom');
  return (
    <React.Fragment>
      {fontProvider.length > 0 && (
        <FontLoader
          fontProvider={fontProvider}
          fontFamilies={googleFonts}
          customFontFamilies={uploadedFonts}
        />
      )}
      <TemplatePreviewMainView {...componentProps} />
    </React.Fragment>
  );
}
