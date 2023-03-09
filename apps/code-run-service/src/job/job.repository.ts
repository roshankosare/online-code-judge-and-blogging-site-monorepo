import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityAbstractRepositoryMongo } from '@online-compiler-judge-monorepo/mongo-database';

import { Model } from 'mongoose';

import { JObDocument, Jobs } from './entity/job.entity-mongo';


@Injectable()
export class JobRepository extends EntityAbstractRepositoryMongo<JObDocument> {
  constructor(@InjectModel(Jobs.name) jobModel: Model<JObDocument>) {
    super(jobModel);
  }
}
