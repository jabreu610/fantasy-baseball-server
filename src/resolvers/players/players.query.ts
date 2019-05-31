import { Player } from '../../model/player.interface';
import db from '../../db';

interface PlayerQuery {
  player: (args: { limit: number; name?: string }) => Promise<Player[]>;
}

const query: PlayerQuery = {
  player: async ({ limit, name }) => {
    return (await db.getPlayers(limit, name)).map(
      (p): Player => ({
        ...p,
        updateTs: new Date(p.updateTs).toISOString(),
      })
    );
  },
};

export default query;
