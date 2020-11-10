import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import dataProviderFactory from './dataProvider';

import business from './business';
import category from './category';
import product from './product';
import theme from './theme';
import logo from './logo';
import font from './font';

import './utils';

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

type AppState = {
    dataProvider: any
};

const App = () => {
    const [dataProvider, setDataProvider] = React.useState(null);

    React.useEffect(() => {
        let restoreFetch;

        const fetchDataProvider = async () => {
            const dataProviderInstance = await dataProviderFactory('graphql');
            setDataProvider(
                // GOTCHA: dataProviderInstance can be a function
                () => dataProviderInstance
            );
        };

        fetchDataProvider();

        return restoreFetch;
    }, []);


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
            layout={Layout}
            i18nProvider={i18nProvider}
        >
            <Resource name="Business" {...business} />
            <Resource name="Category" {...category} />
            <Resource name="Product" {...product} />
            <Resource name="Theme" {...theme} />
            <Resource name="Logo" {...logo} />
            <Resource name="Font" {...font} />
        </Admin>
    );

}


export default App;
