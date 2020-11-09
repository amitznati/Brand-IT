import { getPX } from '../../../sdk/utils';

export const mapComponentProps = (props) => {
  const {
    template = {},
    scale,
    product,
    isSVGPathBuilderOpen,
    selectedLayout,
    onEditLayoutEnd,
    selectedLayoutIndex,
    onLayoutClick,
    onUpdateLayout,
    onPathChange,
    editLayouts = [],
    previewOnly = false
  } = props;
  const {
    layouts = [],
    templateFilters = [],
    templateGradients = []
  } = template;
  return {
    layouts: layouts.concat(editLayouts),
    productH: getPX(product.size.height, scale),
    productW: getPX(product.size.width, scale),
    templateH: getPX(product.templateFrame.height, scale),
    templateW: getPX(product.templateFrame.width, scale),
    templateX: getPX(product.templateFrame.x, scale),
    templateY: getPX(product.templateFrame.y, scale),
    product,
    previewOnly,
    allFonts: getAllFonts(template),
    DefsProps: {
      templateFilters,
      templateGradients
    },
    SVGRootProps: {
      onEditLayoutEnd,
      selectedLayoutIndex,
      onLayoutClick,
      onUpdateLayout,
      h: getPX(product.templateFrame.height),
      w: getPX(product.templateFrame.width),
      scale,
      selectedLayout,
      isSVGPathBuilderOpen,
      previewOnly
    },
    PathBuilderProps: {
      scale,
      product,
      selectedLayout,
      onPathChange
    }
  };
};

const getAllFonts = (template) => {
  const { layouts = [] } = template;
  const uploadedFonts = [];
  const googleFonts = [];
  layouts.forEach((l) => {
    const {
      fontFamily,
      fontStyle,
      fontWeight,
      fontProvider,
      fontUrl
    } = l.properties;
    if (l.type === 'text' || l.type === 'textPath') {
      if (fontProvider === 'google') {
        googleFonts.push(
          `${fontFamily}:${fontWeight || 300}${fontStyle || 'normal'}`
        );
      } else if (fontProvider === 'uploaded') {
        uploadedFonts.push({
          fontFamily,
          fontUrl
        });
      }
    }
  });
  return { googleFonts, uploadedFonts };
};
