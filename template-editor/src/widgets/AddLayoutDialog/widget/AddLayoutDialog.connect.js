import { connect } from 'react-redux';
import { getInstance } from '../../../sdk';
import AddLayoutDialogComponent from './AddLayoutDialog.component';

const EditTemplateMainViewApi = getInstance().EditTemplateMainViewApi;

const mapStateToProps = (state, props) => {
  return {
    selectedTheme: EditTemplateMainViewApi.getSelectedThemeSelector(),
    dynamicTextOptions: EditTemplateMainViewApi.getDynamicTextOptionsSelector(),
    dynamicImageOptions: EditTemplateMainViewApi.getDynamicImageOptionsSelector(),
    ...props
  };
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLayoutDialogComponent);
