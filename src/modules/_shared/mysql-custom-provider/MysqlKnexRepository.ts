import { MysqlRepositoryConfiguration } from './MysqlConfiguration';
import { Knex } from 'knex';

export abstract class MysqlKnexRepository {
  constructor(
    protected readonly pool: Knex,
    private readonly configuration: MysqlRepositoryConfiguration
  ) {}

/*   protected async select(query: string): Promise<any[]> {}

  protected async selectOne(query: string): Promise<any> {}

  protected async insert(query, values?: any[]) {}

  protected async update(query) {}

  protected async delete(query) {} */
}
