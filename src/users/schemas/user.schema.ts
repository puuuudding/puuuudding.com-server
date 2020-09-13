import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  userId: number;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
