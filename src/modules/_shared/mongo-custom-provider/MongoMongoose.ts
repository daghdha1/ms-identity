import knex from 'knex';

export type MongoMongooseConfiguration = {
  database: string;
  user: string;
  port?: number;
  password: string;
  useNullAsDefault: boolean;
  host: string;
  maxConnections: number;
  minConnections?: number;
  name?: string;
};

/* export const mysqlKnex = knex({
  client: 'mysql2',
}); */

export const MongoMongooseProvider = async (
  config: MongoMongooseConfiguration
) => {
  const {
    host,
    database,
    port,
    user,
    password,
    name,
    maxConnections,
    minConnections,
    useNullAsDefault,
  } = config;
  const poolNameString = name ? ` ${name} ` : ' ';
  const knexPool = knex({
    client: 'mysql2',
    connection: {
      host: host,
      port: port ?? 3306,
      user,
      password,
      database,
    },
    useNullAsDefault,
    pool: { min: minConnections ?? 1, max: maxConnections ?? 5 },
  });
  try {
    await knexPool.select(1);
    console.log(
      '\x1b[32m%s\x1b[0m',
      `Connection pool${poolNameString}(MysqlKnex) created`
    );
  } catch (error) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      `Could not create${poolNameString}connection pool (MysqlKnex)`
    );
    return null;
  }
  return knexPool;
};
