import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Chip, Tabs, Tab } from '@material-ui/core';
import WebFont from 'webfontloader';

import {
  CoreNumber,
  CoreSelect,
  CoreText,
  CoreFontSelector
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
    uploadedFonts,
    onPropertiesChange
  } = props;
  const dynamicOptions = dynamicTextOptions.map((o) => ({ id: o, name: o }));
  const [loadingState, setLoadingState] = React.useState({});
  const isGoogleFontProvider = fontProvider === 'google';
  const classes = useStyles();
  const onFontProviderChange = (e, v) => {
    onPropertiesChange([
      { name: 'fontProvider', value: v === 0 ? 'google' : 'uploaded' },
      {
        name: 'fontFamily',
        value: v === 0 ? 'Raleway' : uploadedFonts[0].name
      },
      {
        name: 'fontUrl',
        value: v === 0 ? '' : uploadedFonts[0].url
      }
    ]);
  };
  const onFontPropertyChange = (name, value) => {
    let fontLoaderOptions;
    let successLoadCallback = () => onPropertyChange(name, value);
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
      if (name !== 'fontFamily') {
        onPropertyChange(name, value);
        return;
      }
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
      successLoadCallback = () => {
        onPropertyChange(name, value);
        onPropertyChange('fontUrl', url);
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
        successLoadCallback();
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
          onChange={onFontProviderChange}
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
