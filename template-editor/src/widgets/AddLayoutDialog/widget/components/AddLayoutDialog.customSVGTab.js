import React from 'react';
import { Button, Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';

export default function CustomSVGTab({ onSelect, addText = 'ADD', src = '' }) {
  const [value, setValue] = React.useState(src);
  return (
    <Grid container>
      <Grid item xs={12}>
        <p>SVG</p>
        <AceEditor
          mode='html'
          theme='monokai'
          onChange={setValue}
          name='customSVG'
          defaultValue={value}
          width='100%'
          editorProps={{ blockScrolling: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='outlined'
          color='primary'
          disabled={!value}
          onClick={() => onSelect({ type: 'customSVG', value })}
        >
          {addText}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <svg>
          <g dangerouslySetInnerHTML={{ __html: value }} />
        </svg>
      </Grid>
    </Grid>
  );
}
