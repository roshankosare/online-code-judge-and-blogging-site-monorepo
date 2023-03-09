import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {  UserEntity } from './user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements UserEntity {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
