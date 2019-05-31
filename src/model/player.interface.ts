export interface Player {
  _id: string;
  name: string;
  position: string;
  team: string;
  injuryReport: string | null;
  updateTs: string;
}
