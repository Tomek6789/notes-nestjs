import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { STATUS } from './create-link.dto';

@Schema()
export class Link extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  status: STATUS;

  @Prop()
  date: Date;

  @Prop([String])
  tags: string[];
}

export const LinkSchema = SchemaFactory.createForClass(Link);
