import { buildSchema, GraphQLSchema } from 'graphql';

function gql([schema]: TemplateStringsArray): GraphQLSchema {
  return buildSchema(schema);
}

export default gql`
  type Player {
    _id: ID!
    name: String!
    position: String!
    team: String!
    injuryReport: String
    updateTs: String!
  }

  type Query {
    player(limit: Int = 10, name: String): [Player]
  }
`;
