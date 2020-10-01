import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import {InMemoryCache} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login } from './layout';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import business from './business';
import category from './category';
import product from './product';
import theme from './theme';


const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

type AppState = {
    dataProvider: any
}
class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props);
        this.state = { dataProvider: null };
    }
    componentDidMount() {
        buildGraphQLProvider({
            clientOptions: {
                cache: new InMemoryCache(),
                link: createUploadLink({uri: 'http://localhost:4000/graphql'}) }
        }).then(dataProvider => this.setState({ dataProvider }));
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
            <Admin
                title=""
                dataProvider={dataProvider}
                customReducers={{ theme: themeReducer }}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={() => <div>Dashboard</div>}
                loginPage={Login}
                // layout={Layout}
                i18nProvider={i18nProvider}
            >
                <Resource name="Business" {...business} />
                <Resource name="Category" {...category} />
                <Resource name="Product" {...product} />
                <Resource name="Theme" {...theme} />
            </Admin>
        );
    }
}


export default App;
