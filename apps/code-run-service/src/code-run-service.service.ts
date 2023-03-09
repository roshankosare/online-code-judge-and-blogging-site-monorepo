import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Queue } from 'bull';
import { CreateCodeRunDto } from './dto/create-code-run.dto';
import { JobServie } from './job/job.service';

@Injectable()
export class CodeRunService {
  constructor(
    @InjectQueue('jobs') private readonly jobQueue: Queue,
    private readonly jobService: JobServie,
  ) {}

  async runCodeAll(codeRunDto: CreateCodeRunDto) {
    const { code, language } = codeRunDto;

    const result = await this.jobService.createJob({
      code: code,
      language: language,
    });

    if (!result) {
      throw new RpcException(
        new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'internal server error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    }

    await this.jobQueue.add({
      jobId: result.jobId,
    });

    return result;
  }

  async getJobStatus(id: string) {
    const result = await this.jobService.findOne({ jobId: id });
    if (!result) {
      throw new RpcException(
        new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'invlaid job id',
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    }

    return result;
  }
}
