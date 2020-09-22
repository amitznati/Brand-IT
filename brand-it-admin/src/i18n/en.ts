import { TranslationMessages } from 'ra-core';
import englishMessages from 'ra-language-english';

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        menu: {
            catalog: 'Catalog',
        },
    },
    resources: {
        business: {
            name: 'Business |||| Businesses',
            fields: {
                name: 'Name',
            },
            filters: {

            },
            fieldGroups: {

            },
            page: {
                delete: 'Delete Business',
            },
            errors: {
            },
        },
        category: {
            name: 'Category |||| Categories',
            fields: {
                name: 'Name',
            },
            filters: {

            },
            fieldGroups: {

            },
            page: {
                delete: 'Delete category',
            },
            errors: {
            },
        },
        product: {
            name: 'Product |||| Products',
            fields: {
                name: 'Name',
            },
            filters: {

            },
            fieldGroups: {

            },
            page: {
                delete: 'Delete product',
            },
            errors: {
            },
        },
    },
};

export default customEnglishMessages;
