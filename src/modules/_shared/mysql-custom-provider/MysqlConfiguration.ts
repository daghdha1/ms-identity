export type MysqlConfiguration = {
  name?: string;
  database: string;
  port?: number;
  host: string;
  user: string;
  password: string;
  maxConnections: number;
  minConnections?: number;
  useNullAsDefault?: boolean;
};

export type MysqlRepositoryConfiguration = {
  debug?: boolean;
};
