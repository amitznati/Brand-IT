import React from 'react';
import PropTypes from 'prop-types';
import { getPX } from '../../../../../sdk/utils';

const CustomSVG = (props) => {
  const ref = React.createRef();
  const { layout, index, previewOnly } = props;

  const {
    x,
    y,
    transform: {
      skewY = 0,
      skewX = 0,
      scaleX = 1,
      scaleY = 1,
      translateX = 0,
      translateY = 0
    },
    filters,
    fill,
    src
  } = layout.properties;
  const layoutFill = fill.fill;
  const createMarkup = () => {
    return { __html: src };
  };
  const layoutProperties = {
    x: getPX(x),
    y: getPX(y),
    transform: `matrix(${scaleX} ${skewX} ${skewY} ${scaleY} ${translateX} ${translateY})`,
    fill: layoutFill
  };

  const styleFilter = {};
  if (filters.length) {
    styleFilter.style = {
      filter: filters.map((f) => `url(#${f})`).join(' ')
    };
  }

  return (
    <g
      {...layoutProperties}
      {...styleFilter}
      dangerouslySetInnerHTML={createMarkup()}
      className={previewOnly ? '' : 'drag-svg'}
      name={index}
      key={`customSVG_${index}`}
      id={`customSVG_${index}`}
      ref={ref}
      data-layout-index={index}
    />
  );
};

CustomSVG.propTypes = {
  layout: PropTypes.object,
  index: PropTypes.any,
  previewOnly: PropTypes.bool
};

export default CustomSVG;
