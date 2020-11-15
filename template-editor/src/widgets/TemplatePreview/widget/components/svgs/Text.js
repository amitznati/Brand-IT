import React from 'react';
import PropTypes from 'prop-types';
import { getPX } from '../../../../../sdk/utils';

const Text = (props) => {
  const textRef = React.createRef();
  const { layout, index, previewOnly } = props;
  const {
    fontFamily,
    fontSize,
    fontWeight,
    x,
    y,
    text,
    fill,
    alignment,
    transform: {
      skewY = 0,
      skewX = 0,
      scaleX = 1,
      scaleY = 1,
      translateX = 0,
      translateY = 0
    },
    filters
  } = layout.properties;
  const layoutFill = fill.fill;
  const layoutProperties = {
    x: getPX(x),
    y: getPX(y),
    transform: `matrix(${scaleX} ${skewX} ${skewY} ${scaleY} ${translateX} ${translateY})`
  };
  const textProperties = {
    fontFamily,
    fontSize,
    fontWeight,
    fill: layoutFill
  };
  if (filters.length) {
    layoutProperties.style = {
      filter: filters.map((f) => `url(#${f})`).join(' ')
    };
  }
  if (alignment) {
    if (alignment.vertical) {
      layoutProperties.dominantBaseline =
        alignment.vertical.alignmentAttributes;
    }
    if (alignment.horizontal) {
      layoutProperties.textAnchor = alignment.horizontal.alignmentAttributes;
    }
  }

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
