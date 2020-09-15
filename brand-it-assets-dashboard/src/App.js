import * as React from 'react';
import { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { Admin, Resource } from 'react-admin';
import { BusinessList, BusinessEdit, BusinessCreate } from './business';
import { CategoryList, CategoryEdit, CategoryCreate } from './category';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dataProvider: null };
  }
  componentDidMount() {
    buildGraphQLProvider({ clientOptions: { uri: 'http://localhost:4000/graphql' }})
        .then(dataProvider => this.setState({ dataProvider }));
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return <div>Loading</div>;
    }

    return (
        <Admin dataProvider={dataProvider}>
          <Resource name="Business" list={BusinessList} edit={BusinessEdit} create={BusinessCreate} />
          <Resource name="Category" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
        </Admin>
    );
  }
}

export default App;
