import { buildSchema, GraphQLSchema } from 'graphql';

function gql([schema]: TemplateStringsArray): GraphQLSchema {
  return buildSchema(schema);
}

export default gql`
  type Query {
    hello: String!
  }
`;
