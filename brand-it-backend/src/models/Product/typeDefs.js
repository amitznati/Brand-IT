import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Product(id: ID!): Product!
        allProducts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ProductFilter): [Product]
        _allProductsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ProductFilter): ListMetadata
    }
    extend type Mutation {
        createProduct(name: String!, image: Upload!): Product!
#        updateProduct(id: ID!, name: String!, business: BusinessForUpdateProduct!): Product!
#        deleteProduct(id: ID!): Product!
    }
    type Product {
        id: ID!
        name: String!
#        business: BusinessForProduct
    }
    type BusinessForProduct {
        id: ID!
        name: String!
    }
    input CategoryForUpdateProduct {
        id: ID!
#        name: String
    }
    input CreateProductInput {
        name: String!
#        business: BusinessForUpdateProduct!
    }
    input ProductFilter {
        q: String
        id: ID
        categories: [ID]
        title: String
        views: Int
        views_lt: Int
        views_lte: Int
        views_gt: Int
        views_gte: Int
    }
`;
