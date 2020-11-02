import { gql } from 'apollo-server-express';
import {typeDefs as BusinessTypeDefs} from './models/Business/typeDefs';
import {typeDefs as CategoryTypeDefs} from './models/Category/typeDefs';
import {typeDefs as ProductTypeDefs} from './models/Product/typeDefs';
import {typeDefs as ThemeTypeDefs} from './models/Theme/typeDefs';
import {typeDefs as LogoTypeDefs} from './models/Logo/typeDefs';
import {typeDefs as FontTypeDefs} from './models/Font/typeDefs';

export const typeDefs = gql`    
    type Query {
        hello: String
    }
    type Mutation {
        helloMutation: String
    }
    ${BusinessTypeDefs}
    ${CategoryTypeDefs}
    ${ProductTypeDefs}
    ${ThemeTypeDefs}
    ${LogoTypeDefs}
    ${FontTypeDefs}
    type ListMetadata {
        count: Int!
    }
`;
