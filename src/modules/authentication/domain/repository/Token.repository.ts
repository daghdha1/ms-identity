export abstract class TokenRepository {
  public abstract getAccessToken(clientId: string): Promise<string | undefined>;
  public abstract saveAccessToken(clientId: string, accessToken: string): Promise<boolean>;
}
