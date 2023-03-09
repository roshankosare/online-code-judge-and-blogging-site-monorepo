import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { RunCodeModule } from './run-code/run-codde.module';

@Module({
  imports: [AuthModule,RunCodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
