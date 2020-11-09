import buildApolloClient, {
    buildQuery as buildQueryFactory,
} from 'ra-data-graphql-simple';
import {InMemoryCache} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { LegacyDataProvider } from 'ra-core';
import gql from 'graphql-tag';
import {
    IntrospectionField,
    IntrospectionSchema,
    IntrospectionType,
} from 'graphql';

type IntrospectionResource = IntrospectionType & {
    [key: string]: IntrospectionField;
};

interface IntrospectionResults {
    types: IntrospectionType[];
    queries: IntrospectionField[];
    resources: IntrospectionResource[];
    schema: IntrospectionSchema;
}

const customBuildQuery = (
    introspectionResults: IntrospectionResults
): LegacyDataProvider => {
    const buildQuery = buildQueryFactory(introspectionResults);

    return (type, resource, params) => {
        if (type === 'addTemplate') {
            return {
                query: gql`mutation addTemplate($id: ID!, $template: String!) {
                    addTemplate(id: $id, template: $template) {
                        name
                    }
                }`,
                variables: { id: params.id, template: params.template }

            };
        } else if (type === 'getProductWithTemplates') {
			return {
				query: gql`query getProductWithTemplates($productId: ID!) {
                    getProductWithTemplates(productId: $productId) {
                        name
                        templates {
                            id
                            template
                        }
                        id
                        imageUrl
                        size {
                            width
                            height
                        }
                        templateFrame {
                            height
                            width
                            x
                            y
                        }
                    }
                }`,
                variables: { productId: params.id },
                parseResponse: ({ data }) => {
                    console.log(data);
                    return {data: data.getProductWithTemplates};
                },
			};
        }

        return buildQuery(type, resource, params);
    };
};

export default () => {
    return buildApolloClient({
        clientOptions: {
            cache: new InMemoryCache(),
            link: createUploadLink({uri: 'http://localhost:4000/graphql'})
        },
        buildQuery: customBuildQuery,
    }).then(
        (dataProvider: LegacyDataProvider) => (
            ...rest: Parameters<LegacyDataProvider>
        ) => {
            const [type, resource, params] = rest;
            return dataProvider(type, resource, params);
        }
    );
};
