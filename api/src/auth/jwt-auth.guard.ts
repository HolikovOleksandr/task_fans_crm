import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext): any {
    console.log('JWT err:', err);
    console.log('JWT info:', info);
    console.log('JWT user:', user);
    return super.handleRequest(err, user, info, context);
  }
}
