import { getPX } from '../../../../../sdk/utils';

export const getGlobalLayoutProperties = (layout) => {
  const {
    x,
    y,
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
  const layoutProperties = {
    x: getPX(x),
    y: getPX(y),
    transform: `matrix(${scaleX} ${skewX} ${skewY} ${scaleY} ${translateX} ${translateY})`
  };

  if (filters.length) {
    layoutProperties.style = {
      filter: filters.map((f) => `url(#${f})`).join(' ')
    };
  }
  if (alignment && layout.type === 'image') {
    if (alignment.vertical) {
      layoutProperties.dominantBaseline =
        alignment.vertical.alignmentAttributes;
    }
    if (alignment.horizontal) {
      layoutProperties.textAnchor = alignment.horizontal.alignmentAttributes;
    }
  }
  return layoutProperties;
};
