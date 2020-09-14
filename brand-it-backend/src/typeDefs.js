import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        hello: String
        getByName(name: String!): Cat
        allUsers: [User]!
        _allUsersMeta: ListMetadata
        Cat(id: ID!): Cat!
        User(id: ID!): User!
        allCats(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: CatFilter): [Cat]
        _allCatsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: CatFilter): ListMetadata
    }
    type Cat {
        id: ID!
        name: String!
        owner: UserForCat
    }
    type UserForCat {
        id: ID!
        name: String!
    }
    type User {
        id: ID!
        name: String!
        cats: [Cat]
    }
    type Mutation {
        createCat(name: String!, owner: UserForUpdteCat!): Cat!
        createUser(name: String!): User!
    }
    input UserForUpdteCat {
        id: ID!
    }
    input CreateCatInput {
        name: String!
        owner: UserForUpdteCat!
    }
    input CatFilter {
        q: String
        id: ID
        title: String
        views: Int
        views_lt: Int
        views_lte: Int
        views_gt: Int
        views_gte: Int
        user_id: ID
    }

    type ListMetadata {
        count: Int!
    }
`;
