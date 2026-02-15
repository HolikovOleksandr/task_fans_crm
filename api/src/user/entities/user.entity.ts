import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: false })
  email: string;

  @Prop({ required: true, unique: false })
  phone: string;

  @Prop({ type: Date, required: true })
  birthDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
