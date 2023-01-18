import { User } from '../entity/User';

export abstract class UserRepository {
  public abstract getUser(username: string): Promise<User>;
}
