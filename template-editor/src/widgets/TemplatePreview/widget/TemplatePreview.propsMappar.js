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
    isThemeActive = true,
    isNodeRefreshRequire,
    setIsNodeRefreshRequire,
    dynamicTextValues = [],
    isActiveTextValues = false
  } = props;
  if (isThemeActive && selectedTheme) {
    replaceDynamicThemeValues(template, selectedTheme);
  }
  if (isActiveTextValues) {
    replaceDynamicTextValues(template, dynamicTextValues);
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
      previewOnly,
      isNodeRefreshRequire,
      setIsNodeRefreshRequire
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

const replaceDynamicThemeValues = (template, selectedTheme) => {
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
    if (p.fill && p.fill.gradientId) {
      p.fill.gradientId = `${p.fill.gradientId}-${selectedTheme.id}`;
      p.fill.fill = `url(#${p.fill.gradientId})`;
    }
    return layout;
  });
  template.templateGradients = templateGradients.map((gradient) => {
    gradient.id = `${gradient.id}-${selectedTheme.id}`;
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
};

const replaceDynamicTextValues = (template, dynamicTextValues) => {
  const { layouts = [] } = template;
  template.layouts = layouts.map((layout) => {
    const p = layout.properties;
    if (p.dynamicOptionValue) {
      p.text = dynamicTextValues[p.dynamicOptionValue];
    }
    return layout;
  });
};
