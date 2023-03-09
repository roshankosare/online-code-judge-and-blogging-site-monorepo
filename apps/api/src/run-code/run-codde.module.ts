import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RunCodeController } from './run-code.controller';
import { RunCodeService } from './run-code.service';

@Module({
    imports:[ ClientsModule.register([
        {
          name: 'CODE_RUN_SERVICE',
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        },
      ]),],
  controllers: [RunCodeController],
  providers: [RunCodeService],
})
export class RunCodeModule {}
