import BaseApi from '../../../sdk/BaseApi';
import { getPX } from '../../../sdk/utils';
export default class LayoutsListApi extends BaseApi {
  onAlignmentClick = (alignment, value) => {
    const editTemplateMainViewApi = this.apis.EditTemplateMainViewApi;
    const {
      selectedLayout: layout,
      selectedLayoutIndex
    } = editTemplateMainViewApi.getSelectedLayoutSelector();
    const product = editTemplateMainViewApi.getProductSelector();
    const { templateFrame } = product;
    const templateH = getPX(templateFrame.height);
    const templateW = getPX(templateFrame.width);
    const newLayout = { ...layout };
    if (layout.type === 'text') {
      this.handleTextAlignment(
        alignment,
        value,
        templateH,
        newLayout,
        templateW
      );
    } else if (layout.type === 'image') {
      this.handleImageAlignment(
        alignment,
        value,
        templateH,
        newLayout,
        templateW,
        selectedLayoutIndex
      );
    }
    editTemplateMainViewApi.onUpdateLayout(newLayout);
    this.apis.TemplatePreviewApi.setIsNodeRefreshRequire(true);
  };

  handleTextAlignment(alignment, value, templateH, newLayout, templateW) {
    if (alignment === 'vertical') {
      let translateY;
      let alignmentAttributes;
      switch (value) {
        case 'top':
          translateY = 0;
          alignmentAttributes = 'text-before-edge';
          break;
        case 'bottom':
          translateY = templateH;
          alignmentAttributes = 'text-after-edge';
          break;
        case 'center':
          translateY = templateH / 2;
          alignmentAttributes = 'middle';
          break;
        default:
          break;
      }
      newLayout.properties.transform.translateY = translateY;
      newLayout.properties.alignment = {
        ...newLayout.properties.alignment,
        vertical: { value, alignmentAttributes, align: true }
      };
    }
    if (alignment === 'horizontal') {
      let translateX;
      let alignmentAttributes;
      switch (value) {
        case 'left':
          translateX = 0;
          alignmentAttributes = 'start';
          break;
        case 'right':
          translateX = templateW;
          alignmentAttributes = 'end';
          break;
        case 'center':
          translateX = templateW / 2;
          alignmentAttributes = 'middle';
          break;
        default:
          break;
      }
      newLayout.properties.transform.translateX = translateX;
      newLayout.properties.alignment = {
        ...newLayout.properties.alignment,
        horizontal: { value, alignmentAttributes, align: true }
      };
    }
  }

  handleImageAlignment = (
    alignment,
    value,
    templateH,
    newLayout,
    templateW,
    selectedLayoutIndex
  ) => {
    const imageRect = document
      .getElementById(`image_${selectedLayoutIndex}`)
      .getBBox();
    const {
      properties: {
        transform: { scaleX, scaleY }
      }
    } = newLayout;
    const imageH = imageRect.height * scaleY;
    const imageW = imageRect.width * scaleX;
    if (alignment === 'vertical') {
      let translateY;
      switch (value) {
        case 'top':
          translateY = 0;
          break;
        case 'bottom':
          translateY = templateH - imageH;
          break;
        case 'center':
          translateY = templateH / 2 - imageH / 2;
          break;
        default:
          break;
      }
      newLayout.properties.transform.translateY = translateY;
      newLayout.properties.alignment = {
        ...newLayout.properties.alignment,
        vertical: { value, align: true }
      };
    }
    if (alignment === 'horizontal') {
      let translateX;
      switch (value) {
        case 'left':
          translateX = 0;
          break;
        case 'right':
          translateX = templateW - imageW;
          break;
        case 'center':
          translateX = templateW / 2 - imageW / 2;
          break;
        default:
          break;
      }
      newLayout.properties.transform.translateX = translateX;
      newLayout.properties.alignment = {
        ...newLayout.properties.alignment,
        horizontal: { value, align: true }
      };
    }
  };
}
