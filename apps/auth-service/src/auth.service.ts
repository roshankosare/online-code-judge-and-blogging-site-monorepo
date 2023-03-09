import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userDto: SignUpUserDto) {
    const { email, password, username } = userDto;

    const userExists = await this.userService.findUser({ email });
    if (userExists) throw new Error('email is already taken');

    const user = await this.userService.create({ username, password, email });

    if (!user) throw new Error('internal server error');

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload);

    return access_token;
  }

  async signIn(userDto: SignInUserDto) {
    const { email, password } = userDto;

    // const errors = this.validationService.validateSignInUserDto(userDto);
    // if (errors.length > 0)
    //   return Promise.reject(
    //   );

    const user = await this.userService.findUser({ email });

    if (!user) throw new Error('email is not registered');

    if (!(await compare(password, user.password)))
      throw new Error('incorrect password');

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload);
    return access_token;
  }
}
