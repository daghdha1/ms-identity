export type MongoConfiguration = {
  name?: string;
  database: string;
  port: number;
  host: string;
  user: string;
  password: string;
  maxPoolSize: number;
  minPoolSize?: number;
};

export type MongoRepositoryConfiguration = {
  debug?: boolean;
};
