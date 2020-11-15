import React from 'react';
import PropTypes from 'prop-types';
import { getGlobalLayoutProperties } from './SVGUtils';

const Text = (props) => {
  const textRef = React.createRef();
  const { layout, index, previewOnly } = props;
  const { fontFamily, fontSize, fontWeight, text, fill } = layout.properties;
  const layoutFill = fill.fill;
  const layoutProperties = getGlobalLayoutProperties(layout);
  const textProperties = {
    fontFamily,
    fontSize,
    fontWeight,
    fill: layoutFill
  };

  return (
    <g
      className={previewOnly ? '' : 'drag-svg'}
      name={index}
      key={`text_${index}`}
      id={`text_${index}`}
      ref={textRef}
      data-layout-index={index}
      {...layoutProperties}
    >
      <text {...textProperties}>{text}</text>
    </g>
  );
};

Text.propTypes = {
  layout: PropTypes.object,
  index: PropTypes.any
};

export default Text;
