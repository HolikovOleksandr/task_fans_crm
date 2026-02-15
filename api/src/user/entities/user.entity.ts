import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({
    example: '65f1b6f9c9e77a001c123456',
    description: 'Mongo ObjectId',
  })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'john@email.com' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: '+380991112233' })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({
    example: '1998-05-21T00:00:00.000Z',
    description: 'Birth date (ISO string)',
  })
  @Prop({ type: Date, required: true })
  birthDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
