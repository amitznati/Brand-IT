import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Chip, Tabs, Tab } from '@material-ui/core';
import WebFont from 'webfontloader';

import {
  CoreNumber,
  CoreSelect,
  CoreText,
  CoreFontSelector,
  CoreFontProvider
} from '../../../core';

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2)
  }
}));
const weightOptions = [
  'normal',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'bold',
  'bolder',
  'lighter'
].map((i) => {
  return { id: i, name: i };
});

const styleOptions = ['italic', 'normal'].map((i) => {
  return { id: i, name: i };
});

const FontProperties = (props) => {
  const {
    text,
    dynamicOptionValue,
    dynamicTextOptions,
    fontSize,
    fontWeight,
    fontStyle,
    fontFamily,
    onPropertyChange,
    fontProvider,
    uploadedFonts
  } = props;
  const dynamicOptions = dynamicTextOptions.map((o) => ({ id: o, name: o }));
  const [loadingState, setLoadingState] = React.useState({});
  const isGoogleFontProvider = fontProvider === 'google';
  const classes = useStyles();
  const onFontPropertyChange = (name, value) => {
    let fontLoaderOptions;
    const selectedFontFamily = name === 'fontFamily' ? value : fontFamily;
    const selectedFontWeight = name === 'fontWeight' ? value : fontWeight;
    const selectedFontStyle = name === 'fontStyle' ? value : fontStyle;
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

      const style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = markup;
      document.getElementsByTagName('head')[0].appendChild(style);
      fontLoaderOptions = {
        custom: {
          families: [selectedFontFamily],
          urls: [uploadedFonts.find((f) => f.name === selectedFontFamily).url]
        }
      };
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
        onPropertyChange && onPropertyChange(name, value);
      },
      fontinactive: (e) => {
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

  return (
    <Grid container>
      <Grid item xs={12}>
        <CoreText
          label='Text'
          value={text}
          handleChange={(v) =>
            props.onPropertyChange && props.onPropertyChange('text', v)
          }
        />
        {dynamicOptionValue && (
          <Chip variant='outlined' color='primary' label={dynamicOptionValue} />
        )}
      </Grid>
      <Grid item xs={12}>
        <CoreSelect
          label='Dynamic Text'
          value={dynamicOptionValue}
          options={[{ id: 'none', name: 'None' }].concat(dynamicOptions)}
          onChange={(v) =>
            onFontPropertyChange('dynamicOptionValue', v === 'none' ? '' : v)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Tabs
          value={isGoogleFontProvider ? 0 : 1}
          onChange={(e, v) =>
            onPropertyChange('fontProvider', v === 0 ? 'google' : 'uploaded')
          }
        >
          <Tab label='Google' />
          <Tab label='Uploaded' />
        </Tabs>
        {isGoogleFontProvider && (
          <CoreFontSelector
            {...{ fontWeight, fontStyle, fontFamily }}
            handleChange={(v) => onFontPropertyChange('fontFamily', v)}
          />
        )}
        {!isGoogleFontProvider && (
          <CoreFontSelector
            {...{
              fontWeight,
              fontStyle,
              fontFamily,
              uploadedFonts,
              isGoogleFontProvider
            }}
            handleChange={(v) => onFontPropertyChange('fontFamily', v)}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        <CoreNumber
          label='Size'
          value={fontSize}
          onChange={(v) => onPropertyChange('fontSize', v)}
        />
      </Grid>
      <Grid item xs={3}>
        <CoreSelect
          label='Weight'
          value={fontWeight}
          options={weightOptions}
          onChange={(v) => onFontPropertyChange('fontWeight', v)}
        />
      </Grid>
      <Grid item xs={4}>
        <CoreSelect
          label='Style'
          value={fontStyle}
          options={styleOptions}
          onChange={(v) => onFontPropertyChange('fontStyle', v)}
        />
      </Grid>
      <Grid container>
        <Grid item>
          {loadingState.status === 'loading' && (
            <CircularProgress className={classes.progress} />
          )}
          {loadingState.status === 'inactive' && (
            <div style={{ color: 'red' }}>
              {`Failed To Load: ${loadingState.selectedFontFamily} ${loadingState.selectedFontWeight} ${loadingState.selectedFontStyle}`}
            </div>
          )}
          {loadingState.status === 'active' && (
            <div style={{ color: 'green' }}>
              {`Load: ${loadingState.selectedFontFamily} ${loadingState.selectedFontWeight} ${loadingState.selectedFontStyle}`}
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FontProperties;
