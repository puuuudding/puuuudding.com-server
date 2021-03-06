import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  abstract: string;

  @Prop()
  content: string;

  @Prop({ default: false })
  active: boolean;
}

export const postSchema = SchemaFactory.createForClass(Post);
