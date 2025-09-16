import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

const isTrue = (v: unknown) =>
  v === true || v === 'true' || v === '1' || v === 1;

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request>();
    const h = req.headers;

    const headerAdmin = isTrue(h['x-admin']);

    const roleAdmin =
      (typeof h['x-user-role'] === 'string' &&
        h['x-user-role']!.toLowerCase() === 'admin') ||
      (typeof h['x-role'] === 'string' &&
        h['x-role']!.toLowerCase() === 'admin');

    const auth =
      typeof h['authorization'] === 'string' ? h['authorization']! : '';

    const bearerAdmin =
      auth.toLowerCase().startsWith('bearer ') &&
      auth.slice(7).trim().toLowerCase() === 'admin';

    if (!(headerAdmin || roleAdmin || bearerAdmin)) {
      throw new UnauthorizedException(
        'Admin is required. Use Authorization Bearer token - admin',
      );
    }
    return true;
  }
}
