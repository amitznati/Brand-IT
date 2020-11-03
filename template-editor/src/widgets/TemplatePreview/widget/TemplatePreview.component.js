import React from 'react';
import TemplatePreviewMainView from './components/TemplatePreview.mainView';
import { mapComponentProps } from './TemplatePreview.propsMappar';
import FontLoader from '../../../sdk/services/fontLoader';

export default function TemplatePreviewComponent(props) {
  const componentProps = mapComponentProps(props);
  // const [allFontsLoaded, setAllFontsLoaded] = React.useState(false);
  const { allFonts } = componentProps;
  const { googleFonts, uploadedFonts } = allFonts || {};
  return (
    <React.Fragment>
      {googleFonts && googleFonts.length > 0 && (
        <FontLoader fontProvider='google' fontFamilies={googleFonts} />
      )}
      {uploadedFonts && uploadedFonts.length > 0 && (
        <FontLoader fontProvider='custom' fontFamilies={uploadedFonts} />
      )}
      <TemplatePreviewMainView {...componentProps} />
    </React.Fragment>
  );
}
