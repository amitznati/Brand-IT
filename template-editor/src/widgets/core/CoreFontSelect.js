import React from 'react';
import { Grid, Tab, Tabs, Paper } from '@material-ui/core';
import { CoreFontSelector } from './index';
import WebFont from 'webfontloader';

export const uploadFont = ({
  selectedFontFamily,
  selectedFontWeight,
  selectedFontStyle,
  successLoadCallback,
  uploadedFonts,
  setLoadingState,
  isGoogleFontProvider
}) => {
  let onLoadSuccess = () =>
    successLoadCallback({
      fontFamily: selectedFontFamily,
      fontProvider: 'google',
      fontUrl: ''
    });
  let fontLoaderOptions;
  if (isGoogleFontProvider) {
    fontLoaderOptions = {
      google: {
        families: [
          `${selectedFontFamily}:${selectedFontWeight}${selectedFontStyle}`
        ]
      }
    };
  } else {
    const url = uploadedFonts.find((f) => f.name === selectedFontFamily).url;
    const markup = [
      '@font-face {\n',
      "\tfont-family: '",
      selectedFontFamily,
      "';\n",
      "\tsrc: url('",
      url,
      "');\n",
      '}\n'
    ].join('');
    if (!document.getElementById(`uploaded-font-${selectedFontFamily}`)) {
      const style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = markup;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    fontLoaderOptions = {
      custom: {
        families: [selectedFontFamily],
        urls: [url]
      }
    };
    onLoadSuccess = () =>
      successLoadCallback({
        fontFamily: selectedFontFamily,
        fontProvider: 'uploaded',
        fontUrl: url
      });
  }

  WebFont.load({
    ...fontLoaderOptions,
    fontactive: () => {
      setLoadingState({
        status: 'active',
        selectedFontFamily,
        selectedFontStyle,
        selectedFontWeight
      });
      onLoadSuccess();
    },
    fontinactive: () => {
      setLoadingState({
        status: 'inactive',
        selectedFontFamily,
        selectedFontStyle,
        selectedFontWeight
      });
    },
    fontloading: () => {
      setLoadingState({
        status: 'loading',
        selectedFontFamily,
        selectedFontStyle,
        selectedFontWeight
      });
    }
  });
};

const CoreFontSelect = ({
  fontProvider,
  fontWeight,
  fontStyle,
  fontFamily,
  uploadedFonts,
  onFontProviderChange,
  onFontFamilyChange,
  setLoadingState
}) => {
  const isGoogleFontProvider = fontProvider === 'google';
  const onSelectFont = (font) => {
    uploadFont({
      selectedFontFamily: font,
      selectedFontWeight: fontWeight,
      selectedFontStyle: fontStyle,
      successLoadCallback: onFontFamilyChange,
      uploadedFonts,
      setLoadingState,
      isGoogleFontProvider
    });
  };
  return (
    <Paper>
      <div>Font Family</div>
      <Grid container>
        <Grid item xs={12}>
          <Tabs
            value={isGoogleFontProvider ? 0 : 1}
            onChange={(e, v) => onFontProviderChange(v)}
          >
            <Tab label='Google' />
            <Tab label='Uploaded' />
          </Tabs>
          {isGoogleFontProvider && (
            <CoreFontSelector
              {...{ fontWeight, fontStyle, fontFamily }}
              handleChange={onSelectFont}
            />
          )}
          {!isGoogleFontProvider && uploadedFonts.length > 0 && (
            <CoreFontSelector
              {...{
                fontWeight,
                fontStyle,
                fontFamily,
                uploadedFonts,
                isGoogleFontProvider
              }}
              handleChange={onSelectFont}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CoreFontSelect;
