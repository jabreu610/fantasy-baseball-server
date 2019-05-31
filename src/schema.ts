import { buildSchema, GraphQLSchema } from 'graphql';

function gql([schema]: TemplateStringsArray): GraphQLSchema {
  return buildSchema(schema);
}

export default gql`
  type BattingStats {
    year: Int!
    age: Int!
    tm: String!
    lg: String!
    g: Int!
    pa: Int!
    ab: Int!
    r: Int!
    h: Int!
    doubles: Int!
    triples: Int!
    hr: Int!
    rbi: Int!
    sb: Int!
    cs: Int!
    bb: Int!
    so: Int!
    ba: Float!
    obp: Float!
    slg: Float!
    ops: Float!
    opsPlus: Int!
    tb: Int!
    gdp: Int!
    hbp: Int!
    sh: Int!
    sf: Int!
    ibb: Int!
    pos: Int!
    awards: String
  }

  type PitchingStats {
    year: Int!
    age: Int!
    tm: String!
    lg: String!
    w: Int!
    l: Int!
    winLoss: Float!
    era: Float!
    g: Int!
    gs: Int!
    gf: Int!
    cg: Int!
    sho: Int!
    sv: Int!
    ip: Float!
    h: Int!
    r: Int!
    er: Int!
    hr: Int!
    bb: Int!
    ibb: Int!
    so: Int!
    hbp: Int!
    bk: Int!
    wp: Int!
    bf: Int!
    eraPlus: Int!
    fip: Float!
    whip: Float!
    h9: Float!
    hr9: Float!
    bb9: Float!
    so9: Float!
    soPerW: Float!
    awards: String
  }

  type Appearances {
    year: Int!
    age: Int!
    tm: String!
    lg: String!
    g: Int!
    gs: Int!
    batting: Int!
    defense: Int!
    p: Int!
    c: Int!
    firstBase: Int!
    secondBase: Int!
    thirdBase: Int!
    ss: Int!
    lf: Int!
    cf: Int!
    rf: Int!
    of: Int!
    dh: Int!
    ph: Int!
    pr: Int!
  }

  type Player {
    _id: ID!
    name: String!
    position: String!
    team: String!
    injuryReport: String
    updateTs: String!
    batting: [BattingStats]
    pitching: [PitchingStats]
    appearances: [Appearances]
  }

  type Query {
    player(limit: Int = 10, name: String): [Player]
  }
`;
