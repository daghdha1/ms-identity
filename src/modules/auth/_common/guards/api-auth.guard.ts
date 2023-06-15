import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class ApiAuthGuard extends AuthGuard('custom-api-auth') implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // view Roman Kelifa article to create decorators and check authentication
    return super.canActivate(context)
  }
}
