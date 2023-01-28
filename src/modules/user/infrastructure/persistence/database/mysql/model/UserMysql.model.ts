import { partialAssign } from '@Shared/utils/PartialAssign';
import { User } from '@User/domain/entity/User';

export class UserMysqlModel {
  uid: number;
  id_client: string;
  secret_client: string;
  username: string;
  password: string;
  organization_name: string;
  phone: string;
  email: string;

  public static toEntity(model: UserMysqlModel): User {
    return partialAssign(new User(), {
      uid: model.uid,
      clientId: model.id_client,
      clientSecret: model.secret_client,
      username: model.username,
      password: model.password,
      organizationName: model.organization_name,
      phone: model.phone,
      email: model.email,
    });
  }

  public static fromEntity(entity: User): UserMysqlModel {
    return partialAssign(new UserMysqlModel(), {
      uid: entity.uid,
      id_client: entity.clientId,
      secret_client: entity.clientSecret,
      username: entity.username,
      password: entity.password,
      organization_name: entity.organizationName,
      phone: entity.phone,
      email: entity.email,
    });
  }
}
