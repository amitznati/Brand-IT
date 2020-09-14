import { gql } from 'apollo-server-express';
import {typeDefs as CatTypeDefs} from './models/Cat/typeDefs';
import {typeDefs as UserTypeDefs} from './models/User/typeDefs';

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
    ${CatTypeDefs}
    ${UserTypeDefs}
    type Mutation {
        createCat(name: String!, owner: UserForUpdteCat!): Cat!
        createUser(name: String!): User!
    }
    type ListMetadata {
        count: Int!
    }
`;
