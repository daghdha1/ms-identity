import { partialAssign } from '@Shared/utils/PartialAssign';
import { User } from '@User/domain/entity/User';

export class UserMysqlModel {
  id: string;
  username: string;
  password: string;
  organization_name: string;
  phone: string;
  email: string;

  public static toEntity(model: UserMysqlModel): User {
    return partialAssign(new User(), {
      id: model.id,
      username: model.username,
      password: model.password,
      organizationName: model.organization_name,
      phone: model.phone,
      email: model.email,
    });
  }
}
