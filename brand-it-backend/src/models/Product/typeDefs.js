import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Product(id: ID!): Product!
        allProducts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ProductFilter): [Product]
        _allProductsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ProductFilter): ListMetadata
    }
    extend type Mutation {
        createProduct(name: String!
            image: Upload!
            categories: [ID]
            size: SizeInput!
            templateFrame: TemplateFrameInput!): Product!
#        updateProduct(id: ID!, name: String!, business: BusinessForUpdateProduct!): Product!
        deleteProduct(id: ID!): Product!
    }
    type ProductSize {
        height: Float!
        width: Float!
    }
    type TemplateFrame {
        height: Float!
        width: Float!
        x: Float!
        y: Float!
    }
    type CategoryForProduct {
        id: ID!
        name: String
    }
    type Product {
        id: ID!
        name: String!
        imageUrl: String!
        size: ProductSize!
        templateFrame: TemplateFrame!
        categories: [ID]
    }
    type BusinessForProduct {
        id: ID!
        name: String!
    }
    input CategoryForUpdateProduct {
        id: ID!
        name: String
    }
    input SizeInput {
        height: Float!
        width: Float!
    }
    input TemplateFrameInput {
        height: Float!
        width: Float!
        x: Float!
        y: Float!
    }
    input CreateProductInput {
        name: String!
        image: Upload!
        categories: [ID]
        size: SizeInput!
        templateFrame: TemplateFrameInput!
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
