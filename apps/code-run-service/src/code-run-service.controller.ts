import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CodeRunService } from './code-run-service.service';
import { CreateCodeRunDto } from './dto/create-code-run.dto';

@Controller()
export class CodeRunServiceController {
  constructor(private readonly codeRunService: CodeRunService) {}

  @MessagePattern({cmd:"run"})
  async runCodeAll(@Body() createCodeRunDto: CreateCodeRunDto) {
    const response = await this.codeRunService.runCodeAll(createCodeRunDto);
    return response;
  }

  @MessagePattern({cmd:"jobStatus"})
  async getJobStatus(@Body() id: string) {
    const response = await this.codeRunService.getJobStatus(id);

    return response;
  }
}
