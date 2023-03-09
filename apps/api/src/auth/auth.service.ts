import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  async singUp(singUpUserDto: SignUpUserDto) {
    const response = firstValueFrom(
      this.authService
        .send<string, SignUpUserDto>({ message: 'signup' }, singUpUserDto)
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );

    return response;
  }

  async signIn(singInUserDto: SignInUserDto) {
    const response = firstValueFrom(this.authService
      .send<string>({ message: 'signin' }, singInUserDto)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      ));

    return response;
  }
}
