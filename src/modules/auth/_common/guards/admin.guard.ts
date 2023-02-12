// TODO: TO DO ????
/* @Injectable()
export class AdminGuard extends LoggedinGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    console.log('Username in AdminGuard: ' + req.session.passport.user.username);
    return (
      super.canActivate(context) && req.session.passport.user.username === 'Suzuki'
    );
  }
} */
