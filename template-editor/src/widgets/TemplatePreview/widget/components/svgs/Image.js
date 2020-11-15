import React from 'react';
import PropTypes from 'prop-types';
import { getGlobalLayoutProperties } from './SVGUtils';

const Image = (props) => {
  const ref = React.createRef();
  const { layout, index, previewOnly } = props;
  const { src } = layout.properties;
  const layoutProperties = getGlobalLayoutProperties(layout);

  return (
    <g
      className={previewOnly ? '' : 'drag-svg'}
      name={index}
      key={`image_${index}`}
      id={`image_${index}`}
      ref={ref}
      data-layout-index={index}
      {...layoutProperties}
    >
      <image href={src} />
    </g>
  );
};

Image.propTypes = {
  layout: PropTypes.object,
  index: PropTypes.any,
  previewOnly: PropTypes.bool
};

export default Image;
