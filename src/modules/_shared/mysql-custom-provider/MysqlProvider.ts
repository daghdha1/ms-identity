import { MysqlConfiguration } from './MysqlConfiguration';
import * as mysql from 'mysql2/promise';

export const MysqlProvider = async (
  config: MysqlConfiguration
): Promise<mysql.Pool> => {
  const { database, host, user, password, maxConnections, name, port } = config;
  const variablesNeeded = [];
  const defaultMaxConnections = 10;
  const poolNameString = name ? ` ${name} ` : ' ';
  if (!host || host.trim() === '') variablesNeeded.push('host');
  if (!database || database.trim() === '') variablesNeeded.push('database');
  if (!user || user.trim() === '') variablesNeeded.push('user');
  if (variablesNeeded.length > 0)
    console.log(
      `Mysql provider needs ${variablesNeeded.join(
        ', '
      )} to not be empty or undefined`
    );
  let pool: mysql.Pool = null;
  try {
    pool = mysql.createPool({
      host,
      user,
      database,
      password,
      port: port ?? 3306,
      waitForConnections: true,
      connectionLimit: maxConnections ?? defaultMaxConnections,
      queueLimit: 0,
      dateStrings: false,
    });
    await pool.query('SELECT 1');
    console.log(
      '\x1b[32m%s\x1b[0m',
      `Connection pool${poolNameString}(Mysql) created`
    );
  } catch (error) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      `Could not create${poolNameString}connection pool (Mysql)`
    );
  }
  return pool;
};
