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
    selectedTheme,
    editLayouts = [],
    previewOnly = false,
    isThemeActive = true
  } = props;
  if (isThemeActive && selectedTheme) {
    isThemeActive && replaceDynamicValues(template, selectedTheme);
  }
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

const replaceDynamicValues = (template, selectedTheme) => {
  const { layouts = [], templateGradients = [] } = template;
  template.layouts = layouts.map((layout) => {
    const p = layout.properties;
    if (p.themeColor) {
      p.fill.fill = selectedTheme.palette[p.themeColor];
    }
    if (p.themeFontFamily) {
      p.fontFamily = `${p.themeFontFamily}${selectedTheme.id}`;
    }
    if (p.themeImage) {
      p.src = selectedTheme.images[p.themeImage.split('-').pop()];
    }
    return layout;
  });
  template.templateGradients = templateGradients.map((gradient) => {
    gradient.gradientData.palette = gradient.gradientData.palette.map(
      (stop) => {
        if (stop.themeColor) {
          stop.color = selectedTheme.palette[stop.themeColor];
        }
        return stop;
      }
    );
    return gradient;
  });
  return template;
};
