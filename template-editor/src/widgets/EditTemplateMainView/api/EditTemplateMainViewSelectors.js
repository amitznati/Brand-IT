import { createSelector } from 'reselect';
import config from './EditTemplateMainViewConfig';

const sliceSelector = (state) => state[config.sliceName];

export const getTemplateSelector = createSelector(sliceSelector, (slice) => {
  return slice.template;
});

export const getSelectedLayoutSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.selectedLayout;
  }
);

export const getIsSVGPathBuilderOpenSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.isSVGPathBuilderOpen;
  }
);

export const getProductSelector = createSelector(sliceSelector, (slice) => {
  return slice.product;
});
export const getUploadedFontsSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.uploadedFonts;
  }
);
export const getDynamicTextOptionsSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.dynamicTextOptions;
  }
);
export const getScaleSelector = createSelector(sliceSelector, (slice) => {
  return slice.scale;
});

export const isAddLayoutDialogOpenSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.isAddLayoutDialogOpen;
  }
);

export const templateGradientsSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.template.templateGradients;
  }
);

export const templateFiltersSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.template.templateFilters;
  }
);

export const isAllFontLoadedSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.allFontsLoaded;
  }
);

export const getSelectedThemeSelector = createSelector(
  sliceSelector,
  (slice) => {
    return slice.selectedTheme;
  }
);

export default {
  getTemplateSelector,
  getSelectedLayoutSelector,
  getIsSVGPathBuilderOpenSelector,
  getProductSelector,
  getScaleSelector,
  isAddLayoutDialogOpenSelector,
  isAllFontLoadedSelector,
  templateGradientsSelector,
  templateFiltersSelector,
  getDynamicTextOptionsSelector,
  getUploadedFontsSelector,
  getSelectedThemeSelector
};
