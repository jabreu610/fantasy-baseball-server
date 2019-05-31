import {
  Player,
  BattingStats,
  PitchingStats,
  Appearances,
  StatsArgs,
} from '../../model/player.interface';
import db from '../../db';

interface PlayerQuery {
  player: (args: { limit: number; name?: string }) => Promise<Player[]>;
}

const formatPitching = (
  stats: PitchingStats[],
  { year = [] }: StatsArgs
): PitchingStats[] => {
  if (year.length > 0) {
    stats = stats.filter((s): boolean => year.includes(s.year));
  }
  return stats.map(
    (p: PitchingStats): PitchingStats => ({
      ...p,
      winLoss: p['w-l%'],
      eraPlus: p['era+'],
      soPerW: p['so/w'],
    })
  );
};

const formatBatting = (
  stats: BattingStats[],
  { year = [] }: StatsArgs
): BattingStats[] => {
  if (year.length > 0) {
    stats = stats.filter((s): boolean => year.includes(s.year));
  }
  return stats.map(
    (b: BattingStats): BattingStats => ({
      ...b,
      doubles: b['2b'],
      triples: b['3b'],
      opsPlus: b['ops+'],
    })
  );
};

const formatAppearances = (
  appearences: Appearances[],
  { year = [] }: StatsArgs
): Appearances[] => {
  if (year.length > 0) {
    appearences = appearences.filter((a): boolean => year.includes(a.year));
  }
  return appearences.map(
    (a: Appearances): Appearances => ({
      ...a,
      firstBase: a['1b'],
      secondBase: a['2b'],
      thirdBase: a['3b'],
    })
  );
};

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
