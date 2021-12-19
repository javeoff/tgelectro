import { Body, Controller, UseGuards } from '@nestjs/common';

import { AuthLoginRequest } from '@server/Auth/dto/AuthLoginRequest';
import { AuthService } from '@server/Auth/services/auth.service';
import { ApiPost } from '@server/Common/decorators/ApiPost';
import { LocalAuthGuard } from '@server/Auth/guards/localAuth.guard';
import { JwtAuthGuard } from '@server/Auth/guards/jwtAuth.guard';

@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiPost('login')
  public login(@Body() dto: AuthLoginRequest): void {
    this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiPost('check')
  public checkValid(): unknown {
    return {
      hello: true,
    };
  }
}
