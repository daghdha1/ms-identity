import { MongoClient, ObjectId } from 'mongodb';

export async function getMongoClient() {
  const { host, port, user, password, maxPoolSize, minPoolSize } = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    maxPoolSize: process.env.MONGO_MAX_POOL_SIZE,
    minPoolSize: process.env.MONGO_MIN_POOL_SIZE,
  };
  const uri = `mongodb://${host}:${port}/?maxPoolSize=${maxPoolSize}`;
  return new MongoClient(uri);
}

export function getObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

export function getIdFromObjectId(obj: ObjectId): string {
  return obj.toString();
}
