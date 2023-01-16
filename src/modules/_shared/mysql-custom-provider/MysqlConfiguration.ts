export type MysqlConfiguration = {
  database: string;
  user: string;
  port?: number;
  password: string;
  host: string;
  maxConnections: number;
  minConnections?: number;
  name?: string;
};

export type MysqlRepositoryConfiguration = {
  debug?: boolean;
};
