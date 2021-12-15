import { IsDefined, MaxLength, MinLength } from 'class-validator';

export class AuthLoginRequest {
  @MinLength(3, {
    message:
      'Длина логина пользователя не может быть меньше $constraint1 символов.',
  })
  @MaxLength(50, {
    message:
      'Длина логина пользователя не может быть больше $constraint1 символов.',
  })
  @IsDefined({
    message: 'Логин не может быть пустым.',
  })
  public login!: string;

  @MinLength(6, {
    message:
      'Длина пароля пользователя не может быть меньше $constraint1 символов.',
  })
  @MaxLength(32, {
    message:
      'Длина пароля пользователя не может быть больше $constraint1 символов.',
  })
  @IsDefined({
    message: 'Пароль не может быть пустым.',
  })
  public password!: string;
}
