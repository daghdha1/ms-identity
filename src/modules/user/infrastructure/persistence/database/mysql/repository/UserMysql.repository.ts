import { Inject } from '@nestjs/common'
import { Pool } from 'mysql2/promise'
import { UserRepository } from '@User/domain/repository/User.repository'
import { UserMysqlModel } from '../model/UserMysql.model'
import { User } from '@User/domain/entity/User'
import { UserConstants } from '@User/user.constants'
import { MysqlRepository, Provider, queryBuilder } from 'pkg-shared'

export class UserMysqlRepository extends MysqlRepository implements UserRepository {
  constructor(
    @Inject(Provider.MySQL)
    protected pool: Pool
  ) {
    super(pool, { debug: false })
  }

  public async getUserByName(username: string): Promise<User | undefined> {
    const query = queryBuilder.table(UserConstants.MYSQL_USER_PROFILE_TABLE).where({ username }).select().toString()
    const model: UserMysqlModel = await this.selectOne(query)
    return UserMysqlModel.toEntity(model)
  }

  public async getUserByClientId(clientId: string): Promise<User | undefined> {
    const query = queryBuilder
      .table(UserConstants.MYSQL_USER_PROFILE_TABLE)
      .where({ id_client: clientId })
      .select()
      .toString()
    const model: UserMysqlModel = await this.selectOne(query)
    return UserMysqlModel.toEntity(model)
  }

  public async createUser(user: User): Promise<boolean | undefined> {
    const model: UserMysqlModel = UserMysqlModel.fromEntity(user)
    const query = queryBuilder
      .table(UserConstants.MYSQL_USER_PROFILE_TABLE)
      .insert(model)
      .onConflict(['username', 'email'])
      .ignore()
      .toString()
    await this.insert(query)
    return true
  }
}
