import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateCodeRunDto } from './dto/create-code-run.dto copy';
import { RunCodeService } from './run-code.service';

@Controller('code')
export class RunCodeController {
  constructor(private readonly runCodService:RunCodeService ) {}

  @Post('run')
  async runCodeAll(@Body() createCodeRunDto: CreateCodeRunDto) {
    return await this.runCodService.runCodeAll(createCodeRunDto);
  }

  @Get(':id')
  async getJobStatus(@Param('id') id: string) {
    return await this.runCodService.getJobStatus(id);
  }
}
