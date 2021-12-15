import { Body, Controller, UseGuards } from '@nestjs/common';

import { AuthLoginRequest } from '@server/Auth/dto/AuthLoginRequest';
import { AuthService } from '@server/Auth/services/auth.service';
import { ApiPost } from '@server/Common/decorators/ApiPost';
import { ClientRequestRef } from '@server/Common/services/clientRequestRef.service';
import { IAuthLoginResponse } from '@server/Auth/types/IAuthLoginResponse';
import { LocalAuthGuard } from '@server/Auth/guards/localAuth.guard';
import { JwtAuthGuard } from '@server/Auth/guards/jwtAuth.guard';

@Controller()
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly clientRequestRef: ClientRequestRef,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiPost('login')
  public login(@Body() dto: AuthLoginRequest): IAuthLoginResponse {
    const { access_token } = this.authService.login(dto);

    this.clientRequestRef.setCookie('Authorization', `Bearer ${access_token}`);

    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @ApiPost('check')
  public checkValid(): unknown {
    return {
      hello: true,
    };
  }
}
