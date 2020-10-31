import React from 'react';
import TemplatePreviewMainView from './components/TemplatePreview.mainView';
import { mapComponentProps } from './TemplatePreview.propsMappar';
import FontLoader from '../../../sdk/services/fontLoader';

export default function TemplatePreviewComponent(props) {
  const componentProps = mapComponentProps(props);
  const [allFontsLoaded, setAllFontsLoaded] = React.useState(false);
  const { allFonts } = componentProps;
  return (
    <React.Fragment>
      {allFonts && allFonts.length > 0 && (
        <FontLoader
          fontProvider='google'
          fontFamilies={allFonts}
          onActive={setAllFontsLoaded}
        />
      )}

      <TemplatePreviewMainView {...componentProps} />
    </React.Fragment>
  );
}
