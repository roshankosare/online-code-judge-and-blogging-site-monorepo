import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeRunServiceController } from './code-run-service.controller';
import { CodeRunService } from './code-run-service.service';
import { JobConsumer } from './run-time-env/Job.consumer';

import { JobModule } from './job/job.module';
import { RunTimeEnvModule } from './run-time-env/run-time-env.module';

@Module({
  imports: [
    JobModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'jobs',
    }),

    MongooseModule.forRoot('mongodb://localhost/code-run'),
    RunTimeEnvModule,
  ],
  controllers: [CodeRunServiceController],
  providers: [CodeRunService, JobConsumer],
})
export class CodeRunServiceModule {}
