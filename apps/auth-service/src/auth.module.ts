import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtLocalModule } from '@online-compiler-judge-monorepo/auth';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/auth-database'),UserModule,JwtLocalModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
