import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class SigninGuard extends AuthGuard('local-signin') implements CanActivate {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }
}
