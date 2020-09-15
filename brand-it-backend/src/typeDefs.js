import { gql } from 'apollo-server-express';
import {typeDefs as BusinessTypeDefs} from './models/Business/typeDefs';
import {typeDefs as CategoryTypeDefs} from './models/Category/typeDefs';

export const typeDefs = gql`
    type Query {
        hello: String
    }
    type Mutation {
        helloMutation: String
    }
    ${BusinessTypeDefs}
    ${CategoryTypeDefs}
    type ListMetadata {
        count: Int!
    }
`;
