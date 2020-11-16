import React from 'react';
import PropTypes from 'prop-types';
import { getGlobalLayoutProperties } from './SVGUtils';

const CustomSVG = (props) => {
  const ref = React.createRef();
  const { layout, index, previewOnly } = props;

  const { fill, src } = layout.properties;
  const createMarkup = () => {
    return { __html: src };
  };
  const layoutProperties = getGlobalLayoutProperties(layout);

  return (
    <g
      {...layoutProperties}
      dangerouslySetInnerHTML={createMarkup()}
      className={previewOnly ? '' : 'drag-svg'}
      name={index}
      key={`customSVG_${index}`}
      id={`customSVG_${index}`}
      ref={ref}
      fill={fill.fill}
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
