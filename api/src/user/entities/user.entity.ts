import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
