import { User } from '../entity/User';

export abstract class UserRepository {
  public abstract getUserByName(username: string): Promise<User>;
  public abstract getUserByClientId(clientId: string): Promise<User>;
  public abstract createUser(user: User): Promise<boolean>;
}
