import { Module } from '@nestjs/common';

import { RunTimeEnv } from './run-time-env.service';

@Module({
    providers:[RunTimeEnv],
  exports: [RunTimeEnv],
})
export class RunTimeEnvModule {}
