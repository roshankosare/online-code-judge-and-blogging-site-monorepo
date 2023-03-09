import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { User } from './entity/user.schema';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity | null> {
    const newUser: User = {
      id: uuid(),
      username: createUserDto.username,
      email: createUserDto.email,
      password: await hash(createUserDto.password, 12),
    };

    const user = await this.userRepository.create(newUser);
    if (!user) return null;

    delete user.password;
    return user;
  }

  async findUser(
    userFilterQuery: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    return await this.userRepository.findOne(userFilterQuery);
  }
}
