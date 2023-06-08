import { CreateUserDto } from '@User/application/dto/CreateUser.dto'
import { partialAssign } from 'pkg-shared'

export class User {
  public uid: number
  public clientId: string
  public clientSecret: string
  public username: string
  public password: string
  public organizationName: string
  public phone: string
  public email: string

  public static create(dto: CreateUserDto): User {
    return partialAssign(new this(), {
      uid: dto.uid ?? null,
      clientId: dto.client_id,
      clientSecret: dto.client_secret,
      username: dto.username,
      password: dto.password,
      organizationName: dto.organization_name,
      phone: dto.phone,
      email: dto.email
    })
  }
}
