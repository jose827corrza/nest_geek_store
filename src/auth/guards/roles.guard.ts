import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import {ROLE_KEY} from '../decorators/role.decorator';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLE_KEY, context.getHandler());
    // ['admin', . . . ]
    if (!roles) {
      //Es para no tener que poner el decorador de roles en cada endpoint, sino saltaria un error de some undefined,
      // por que pues no estaria leyendo un array
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    //  { role: 'admin', sub: 007 }
    const isAuth = roles.some((role) => role === user.role); //recorre cada celda del array y verifica esto
    if (!isAuth) {
      throw new HttpException(
        'Forbidden, your role is not the expected',
        HttpStatus.FORBIDDEN,
      );
    }
    return isAuth;
  }
}
