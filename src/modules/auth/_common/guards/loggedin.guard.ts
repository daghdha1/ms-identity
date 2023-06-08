import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class LoggedinGuard extends AuthGuard('custom-loggedin') implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // TODO: view Roman Kelifa article to create decorators and check authentication
    return super.canActivate(context)
  }
}
