import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        Theme(id: ID!): Theme!
        allThemes(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ThemeFilter): [Theme]
        _allThemesMeta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ThemeFilter): ListMetadata
    }
    extend type Mutation {
        createTheme(name: String!, palette: PaletteInput!, fontFamilies: FontFamiliesInput!, images: imagesInput!): Theme!
        updateTheme(id: ID!, name: String!): Theme!
    }
	type Palette {
        primary: String!
        secondary: String!
        tertiary: String!
	}
	type FontFamilies {
        primary: String!
        secondary: String
        tertiary: String
    }
    type Theme {
        id: ID!
        name: String!
        palette: Palette!
        fontFamilies: FontFamilies!
        images: imagesForProduct!
    }
    type imagesForProduct {
        bg: String!
        frame: String!
        sideL: String!
        sideR: String!
        sideB: String!
        sideT: String!
    }
    input PaletteInput {
        primary: String!
        secondary: String!
        tertiary: String
    }
    input FontFamiliesInput {
        primary: Upload!
        secondary: Upload
        tertiary: Upload
    }
    input imagesInput {
        bg: Upload!
        frame: Upload
        sideL: Upload
        sideR: Upload
        sideB: Upload
        sideT: Upload
    }
    input ThemeFilter {
        q: String
        id: ID
        ids: [ID]
    }
`;
