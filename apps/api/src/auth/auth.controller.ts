import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async singUp(@Body() singUpUserDto: SignUpUserDto) {
    const token = await this.authService.singUp(singUpUserDto);
    return token;
  }

  @Post('signin')
  async signIn(@Body() singInUserDto: SignInUserDto) {
    const token = await this.authService.signIn(singInUserDto);

    return token;
  }

  @Get()
  async getHello(){
    return "hii";
  }
}
