import React, { Component } from 'react';
import EditTemplateMainViewMainView from './components/EditTemplateMainView.mainView';

export default class EditTemplateComponent extends Component {
  constructor(props) {
    super(props);
    const { setInitialData, initialData } = props;
    setInitialData(initialData);
  }

  render() {
    return <EditTemplateMainViewMainView {...this.props} />;
  }
}
