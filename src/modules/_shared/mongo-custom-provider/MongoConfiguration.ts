export type MongoConfiguration = {
  name?: string;
  port?: number;
  host: string;
  database: string;
  user: string;
  password: string;
  maxPoolSize: number;
  minPoolSize?: number;
};

export type MongoRepositoryConfiguration = {
  debug?: boolean;
};
