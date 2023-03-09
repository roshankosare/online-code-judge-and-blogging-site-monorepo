import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
 
} from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseFilters(new FitRpcException())
  @MessagePattern({ message: 'signup' })
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    try {
      const token = await this.authService.signUp(signUpUserDto);
      return token;
    } catch (error: any) {
      throw new RpcException(
        new HttpException(
          { statusCode: HttpStatus.UNAUTHORIZED, error: error.message },
          HttpStatus.UNAUTHORIZED,
        ),
      );
    }
  }

  @MessagePattern({ message: 'signin' })
  async signIn(@Body() signInUserDto: SignInUserDto) {
    try {
      const token = await this.authService.signIn(signInUserDto);
      return token;
    } catch (error: any) {
      throw new RpcException(
        new HttpException(
          { statusCode: HttpStatus.UNAUTHORIZED, error: error.message },
          HttpStatus.UNAUTHORIZED,
        ),
      );
    }
  }
}
