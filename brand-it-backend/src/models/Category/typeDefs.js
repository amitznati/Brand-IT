import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Category(id: ID!): Category!
        allCategories(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: CategoryFilter): [Category]
        _allCategoriesMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: CategoryFilter): ListMetadata
    }
    extend type Mutation {
        createCategory(name: String!, business: BusinessForUpdateCategory!): Category!
        updateCategory(id: ID!, name: String!, business: BusinessForUpdateCategory!): Category!
    }
    type Category {
        id: ID!
        name: String!
        business: BusinessForCategory
    }
    type BusinessForCategory {
        id: ID!
        name: String!
    }
    input BusinessForUpdateCategory {
        id: ID!
        name: String
    }
    input CreateCategoryInput {
        name: String!
        business: BusinessForUpdateCategory!
    }
    input CategoryFilter {
        q: String
        id: ID
        title: String
        views: Int
        views_lt: Int
        views_lte: Int
        views_gt: Int
        views_gte: Int
    }
`;
