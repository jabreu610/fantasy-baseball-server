import { MongoClient, Db, Collection } from 'mongodb';
import { Player } from './model/player.interface';

if (!process.env.MONGO_URL) {
  throw new Error("Required environment variable 'MONGO_URL' is not set");
}

class DB {
  private connection?: MongoClient;
  private db?: Db;
  private players?: Collection<Player>;
  public constructor(private connectionUrl: string) {}
  public async init(): Promise<void> {
    try {
      this.connection = await MongoClient.connect(this.connectionUrl, {
        useNewUrlParser: true,
      });
      this.db = this.connection.db();
      this.db.on('close', (): void => console.log('Closed MongoDB connection'));
      this.players = this.db.collection<Player>('players');
      console.log('Connected to DB');
    } catch (err) {
      console.error('Failed to connect to MongoDB server');
      throw err;
    }
  }
  public async getPlayers(limit: number, name?: string): Promise<Player[]> {
    if (!this.players) {
      throw new Error('DB has not been initialized, please call init() first');
    }
    let query = {};
    if (name) {
      query = {
        ...query,
        name: {
          $in: [new RegExp(`^${name}`, 'mi'), new RegExp(`\\s${name}`, 'mi')],
        },
      };
    }
    return this.players.find(query, { limit }).toArray();
  }

  public async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

export default new DB(process.env.MONGO_URL);
