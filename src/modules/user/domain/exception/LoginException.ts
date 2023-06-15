export class LoginException {
  constructor(message: string) {
    throw new Error(`Error: ${message}`)
  }
}
