import {
  Player,
  BattingStats,
  PitchingStats,
  Appearances,
} from '../../model/player.interface';
import db from '../../db';

interface PlayerQuery {
  player: (args: { limit: number; name?: string }) => Promise<Player[]>;
}

const formatPitching = (stats: PitchingStats[]): PitchingStats[] =>
  stats.map(
    (p: PitchingStats): PitchingStats => ({
      ...p,
      winLoss: p['w-l%'],
      eraPlus: p['era+'],
      soPerW: p['so/w'],
    })
  );

const formatBatting = (stats: BattingStats[]): BattingStats[] =>
  stats.map(
    (b: BattingStats): BattingStats => ({
      ...b,
      doubles: b['2b'],
      triples: b['3b'],
      opsPlus: b['ops+'],
    })
  );

const formatAppearances = (appearences: Appearances[]): Appearances[] =>
  appearences.map(
    (a: Appearances): Appearances => ({
      ...a,
      firstBase: a['1b'],
      secondBase: a['2b'],
      thirdBase: a['3b'],
    })
  );

const query: PlayerQuery = {
  player: async ({ limit, name }) => {
    return Promise.all(
      (await db.getPlayers(limit, name)).map(
        async (p): Promise<Player> => {
          return {
            ...p,
            updateTs: new Date(p.updateTs).toISOString(),
            batting: await formatBatting.bind(
              globalThis,
              p.batting as BattingStats[]
            ),
            pitching: await formatPitching.bind(
              globalThis,
              p.pitching as PitchingStats[]
            ),
            appearances: formatAppearances.bind(
              globalThis,
              p.appearances as Appearances[]
            ),
          };
        }
      )
    );
  },
};

export default query;
