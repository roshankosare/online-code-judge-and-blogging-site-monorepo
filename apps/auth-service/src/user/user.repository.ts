import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityAbstractRepositoryMongo } from '@online-compiler-judge-monorepo/mongo-database';

import { Model } from 'mongoose';
import { User, UserDocument } from './entity/user.schema';

@Injectable()
export class UserRepository extends EntityAbstractRepositoryMongo<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
