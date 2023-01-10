import { MysqlRepositoryConfiguration } from './MysqlConfiguration';
import * as mysql from 'mysql2/promise';

export abstract class MysqlRepository {
  constructor(
    protected readonly pool: mysql.Pool,
    private readonly configuration: MysqlRepositoryConfiguration,
  ) {}

  protected async select(query: string): Promise<any[]> {
    if (this.configuration.debug) console.log(query);
    const start = performance.now();
    const [rows] = await this.pool.query(query);
    if (this.configuration.debug) console.log(performance.now() - start);
    return rows as any[];
  }

  protected async selectOne(query: string): Promise<any> {
    const rows = await this.select(query);
    return rows?.[0];
  }

  protected async insert(query, values?: any[]) {
    if (this.configuration.debug) console.log(query);
    const start = performance.now();
    const response = (
      await this.pool.query(query, values ? [values] : null)
    )[0];
    if (this.configuration.debug) console.log(performance.now() - start);
    if (response) return response;
  }

  protected async update(query) {
    if (this.configuration.debug) console.log(query);
    const start = performance.now();
    const response = await this.pool.query(query);
    if (this.configuration.debug) console.log(performance.now() - start);
    if (response) return response;
  }

  protected async delete(query) {
    if (this.configuration.debug) console.log(query);
    const start = performance.now();
    const response = await this.pool.query(query);
    if (this.configuration.debug) console.log(performance.now() - start);
    if (response) return response;
  }
}
