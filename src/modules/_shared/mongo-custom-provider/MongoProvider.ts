import { MongoConfiguration } from './MongoConfiguration';
import { MongoClient, ObjectId } from 'mongodb';

export const MongoProvider = async (
  config: MongoConfiguration
): Promise<MongoClient> => {
  const { database, host, user, password, maxPoolSize, name, port } = config;
  const variablesNeeded = [];
  const poolNameString = name ? ` ${name} ` : ' ';
  let userAndPassFormatted = '';

  if (!database || database.trim() === '') variablesNeeded.push('database');
  if (!host || host.trim() === '') variablesNeeded.push('host');
  //if (!user || user.trim() === '') variablesNeeded.push('user');
  //if (!password || password.trim() === '') variablesNeeded.push('password');
  if (variablesNeeded.length > 0)
    console.log(
      `Mongo provider needs ${variablesNeeded.join(
        ', '
      )} to not be empty or undefined`
    );
  if (user && user.trim().length > 0 && password && password.trim().length > 0)
    userAndPassFormatted = `${user}${password}@`;

  let pool: MongoClient = null;
  try {
    const uri = `mongodb://${userAndPassFormatted}${host}:${port}/?maxPoolSize=${maxPoolSize}`;
    pool = new MongoClient(uri);
    await pool.connect();
    console.log(
      '\x1b[32m%s\x1b[0m',
      `Connection pool${poolNameString}(Mongo) created`
    );
  } catch (error) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      `Could not create${poolNameString}connection pool (Mongo)`
    );
  }
  return pool;
};

export function getObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

export function getIdFromObjectId(obj: ObjectId): string {
  return obj.toString();
}
