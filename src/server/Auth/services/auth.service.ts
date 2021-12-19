import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthLoginRequest } from '@server/Auth/dto/AuthLoginRequest';
import { ClientRequestRef } from '@server/Common/services/clientRequestRef.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly clientRequestRef: ClientRequestRef,
  ) {}

  public login(dto: AuthLoginRequest): void {
    const payload = { username: dto.login, sub: dto.password };

    this.clientRequestRef.setCookie('token', this.jwtService.sign(payload));
  }
}
