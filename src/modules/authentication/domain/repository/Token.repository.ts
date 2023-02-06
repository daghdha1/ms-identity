export abstract class TokenRepository {
  public abstract existsRefreshToken(
    username: string,
    refreshToken: string
  ): Promise<boolean>;
  public abstract getRefreshToken(
    username: string
  ): Promise<string | undefined>;
  public abstract saveRefreshToken(
    username: string,
    refreshToken: string
  ): Promise<boolean>;
  public abstract revokeRefreshToken(username: string): Promise<boolean>; //TODO: to do
}
