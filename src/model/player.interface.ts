export interface BattingStats {
  year: number;
  age: number;
  tm: string;
  lg: string;
  g: number;
  pa: number;
  ab: number;
  r: number;
  h: number;
  '2b': number;
  '3b': number;
  doubles: number;
  triples: number;
  hr: number;
  rbi: number;
  sb: number;
  cs: number;
  bb: number;
  so: number;
  ba: number;
  obp: number;
  slg: number;
  ops: number;
  'ops+': number;
  opsPlus: number;
  tb: number;
  gdp: number;
  hbp: number;
  sh: number;
  sf: number;
  ibb: number;
  pos: number;
  awards: string | null;
}

export interface PitchingStats {
  year: number;
  age: number;
  tm: string;
  lg: string;
  w: number;
  l: number;
  'w-l%': number;
  winLoss: number;
  era: number;
  g: number;
  gs: number;
  gf: number;
  cg: number;
  sho: number;
  sv: number;
  ip: number;
  h: number;
  r: number;
  er: number;
  hr: number;
  bb: number;
  ibb: number;
  so: number;
  hbp: number;
  bk: number;
  wp: number;
  bf: number;
  'era+': number;
  eraPlus: number;
  fip: number;
  whip: number;
  h9: number;
  hr9: number;
  bb9: number;
  so9: number;
  'so/w': number;
  soPerW: number;
  awards: string | null;
}

export interface Appearances {
  year: number;
  age: number;
  tm: string;
  lg: string;
  g: number;
  gs: number;
  batting: number;
  defense: number;
  p: number;
  c: number;
  '1b': number;
  firstBase: number;
  '2b': number;
  secondBase: number;
  '3b': number;
  thirdBase: number;
  ss: number;
  lf: number;
  cf: number;
  rf: number;
  of: number;
  dh: number;
  ph: number;
  pr: number;
}

export interface Player {
  _id: string;
  name: string;
  position: string;
  team: string;
  injuryReport: string | null;
  updateTs: string;
  batting: BattingStats[] | BattingStatsFn;
  pitching: PitchingStats[] | PitchingStatsFn;
  appearances: Appearances[] | AppearancesFn;
}

type PitchingStatsFn = () => PitchingStats[];
type BattingStatsFn = () => BattingStats[];
type AppearancesFn = () => Appearances[];
