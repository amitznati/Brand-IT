import { getPX } from '../../../sdk/utils';

const mapComponentProps = (props) => {
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
    productH: getPX(product.productSize.height, scale),
    productW: getPX(product.productSize.width, scale),
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
  const allFonts = [];
  layouts.forEach((l) => {
    const { fontFamily, fontStyle, fontWeight } = l.properties;
    if (l.type === 'text' || l.type === 'textPath') {
      allFonts.push(
        `${fontFamily}:${fontWeight || 300}${fontStyle || 'normal'}`
      );
    }
  });
  return allFonts;
};

export { mapComponentProps };
