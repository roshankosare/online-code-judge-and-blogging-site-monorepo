import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCodeRunDto } from './dto/create-code-run.dto copy';

@Injectable()
export class RunCodeService {
  constructor(
    @Inject('CODE_RUN_SERVICE') private readonly codeRunService: ClientProxy,
  ) {}

  async runCodeAll(createCodeRunDto: CreateCodeRunDto) {
    return this.codeRunService.send({ cmd: 'run' }, createCodeRunDto);
  }

  async getJobStatus(id:string){
    return this.codeRunService.send({cmd:"jobStatus"},id);
  }
}
