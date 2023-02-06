import { Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { UserRepository } from '@User/domain/repository/User.repository';
import { UserMysqlModel } from '../model/UserMysql.model';
import { User } from '@User/domain/entity/User';
import { UserConstants } from '@User/user.constants';
import { AppConstants } from 'app.constants';
import { MysqlRepository, queryBuilder } from 'pkg-shared';

export class UserMysqlRepository
  extends MysqlRepository
  implements UserRepository
{
  constructor(
    @Inject(AppConstants.MYSQL_POOL)
    protected pool: Pool
  ) {
    super(pool, { debug: false });
  }

  public async getUserByName(username: string): Promise<User> {
    const query = queryBuilder
      .table(UserConstants.MYSQL_USER_PROFILE_TABLE)
      .where({ username })
      .select()
      .toString();
    const model: UserMysqlModel = await this.selectOne(query);
    return UserMysqlModel.toEntity(model);
  }

  public async getUserByClientId(clientId: string): Promise<User> {
    const query = queryBuilder
      .table(UserConstants.MYSQL_USER_PROFILE_TABLE)
      .where({ id_client: clientId })
      .select()
      .toString();
    const model: UserMysqlModel = await this.selectOne(query);
    return UserMysqlModel.toEntity(model);
  }

  public async createUser(user: User): Promise<boolean> {
    const model: UserMysqlModel = UserMysqlModel.fromEntity(user);
    const query = queryBuilder
      .table(UserConstants.MYSQL_USER_PROFILE_TABLE)
      .insert(model)
      .onConflict(['username', 'email'])
      .ignore()
      .toString();
    await this.insert(query);
    return true;
  }
}

/* public async createHookLog(hook: TrackingParcellabHook): Promise<void> {
    const model = TrackingParcellabHookMysqlModel.fromEntity(hook);
    const query = mysqlKnex
        .table(`${TrackingConstants.PREFIX_TRACKING_TABLE}_parcellab_hook_log`)
        .insert(model)
        .onConflict('tracking_number')
        .merge()
        .toString();
    await this.insert(query);
}

public async getHookLogs(trackingNumber?: string): Promise<TrackingParcellabHook[]> {
    const query = mysqlKnex
        .table(`${TrackingConstants.PREFIX_TRACKING_TABLE}_parcellab_hook_log`)
        .where((builder) => {
            if (trackingNumber) {
                builder.where({ tracking_number: trackingNumber });
            }
        })
        .select()
        .toString();
    const model: TrackingParcellabHookMysqlModel[] = await this.select(query);
    return model.map((hook: TrackingParcellabHookMysqlModel) => TrackingParcellabHookMysqlModel.toEntity(hook))
} */
