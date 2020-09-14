import { gql } from 'apollo-server-express';

export const typeDefs = gql`	
    type Cat {
        id: ID!
        name: String!
        owner: UserForCat
    }
    type UserForCat {
        id: ID!
        name: String!
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
`;
