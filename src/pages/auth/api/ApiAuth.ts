import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { AuthLoginRequest } from '@server/Auth/dto/AuthLoginRequest';
import { IAuthLoginResponse } from '@server/Auth/types/IAuthLoginResponse';
import { AuthRoute } from '@server/Auth/enums/AuthRoute';

export class ApiAuth extends ApiServiceBase {
  public constructor() {
    super();
  }

  public login(dto: AuthLoginRequest): Promise<IAuthLoginResponse> {
    return this.post(AuthRoute.LOGIN, dto);
  }
}

export const apiAuth = new ApiAuth();
