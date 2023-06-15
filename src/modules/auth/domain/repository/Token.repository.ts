export abstract class TokenRepository {
  public abstract existsSessionToken(username: string, sessionToken: string): Promise<boolean>
  public abstract getSessionToken(username: string): Promise<string | undefined>
  public abstract saveSessionToken(username: string, sessionToken: string): Promise<boolean>
}
