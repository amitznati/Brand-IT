import BaseApi from '../../../sdk/BaseApi';
import { getPX } from '../../../sdk/utils';
export default class LayoutsListApi extends BaseApi {
  onAlignmentClick = (alignment, value) => {
    const editTemplateMainViewApi = this.apis.EditTemplateMainViewApi;
    const {
      selectedLayout: layout
    } = editTemplateMainViewApi.getSelectedLayoutSelector();
    const product = editTemplateMainViewApi.getProductSelector();
    const { templateFrame } = product;
    const templateH = getPX(templateFrame.height);
    const templateW = getPX(templateFrame.width);
    const newLayout = { ...layout };

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
        vertical: { value, alignmentAttributes }
      };
    }
    editTemplateMainViewApi.onUpdateLayout(newLayout);
    this.apis.TemplatePreviewApi.setIsNodeRefreshRequire(true);
  };
}
