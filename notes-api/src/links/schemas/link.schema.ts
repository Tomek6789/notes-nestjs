import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Link extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  date: Date;

  @Prop([String])
  tags: string[];
}

export const LinkSchema = SchemaFactory.createForClass(Link);
