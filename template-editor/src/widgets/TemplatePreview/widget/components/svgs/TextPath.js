import React from 'react';
import PropTypes from 'prop-types';
import { getPX } from '../../../../../sdk/utils';
import { getGlobalLayoutProperties } from './SVGUtils';

const getPathDef = (id, pathData) => {
  const path = pathData.path;
  return (
    <defs key={id}>
      <path id={id} fill='none' d={path} />
    </defs>
  );
};

const TextPath = (props) => {
  const ref = React.createRef();
  const { layout, index, previewOnly } = props;
  const {
    fontFamily,
    fontSize,
    fontWeight,
    x,
    y,
    text,
    fill,
    pathData
  } = layout.properties;
  const layoutFill = fill.fill;
  const shapes = [];

  const layoutProperties = getGlobalLayoutProperties(layout);

  const textProperties = {
    fontFamily,
    fontSize,
    fontWeight,
    fill: layoutFill
  };
  if (!pathData.path) {
    pathData.path = `M ${getPX(x)} ${getPX(y)} L ${getPX(x) + 200} ${getPX(y)}`;
  }
  shapes.push(getPathDef(`Path-${index}`, pathData));

  shapes.push(
    <text
      className={previewOnly ? '' : 'drag-svg'}
      name={index}
      key={`textPath_${index}`}
      id={`textPath_${index}`}
      ref={ref}
      data-layout-index={index}
      {...layoutProperties}
      {...textProperties}
    >
      <textPath href={`#Path-${index}`}>{text}</textPath>
    </text>
  );

  return shapes;
};

TextPath.propTypes = {
  layout: PropTypes.object.isRequired,
  index: PropTypes.any.isRequired
};

export default TextPath;
