import * as React from 'react';
import { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { Admin, Resource } from 'react-admin';
import { CatList, CatCreate, CatEdit } from './cats';
import { UserCreate, UserEdit, UserList } from './user';

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
          <Resource name="Cat" list={CatList} edit={CatEdit} create={CatCreate} />
          <Resource name="User" list={UserList} edit={UserEdit} create={UserCreate} />
        </Admin>
    );
  }
}

export default App;
