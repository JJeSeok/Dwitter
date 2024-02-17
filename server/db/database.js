import MongoDb from 'mongodb';
import { config } from '../config.js';

export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => client.db());
}
