import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
export class Comments {
  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  message?: string;

  @Prop({ required: false })
  @Field(() => Int, { nullable: true })
  count?: number;

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  userName?: string;
}

@Schema()
@ObjectType()
export class Blog {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'Blog Title' })
  title: string;

  @Prop()
  @Field(() => String, { description: 'Blog Description' })
  description: string;

  @Prop()
  @Field(() => [Comments], {
    description: 'Blog Comments',
    nullable: true,
  })
  comments: Comments[];

  @Prop()
  @Field(() => [String], {
    description: 'Array of user ids who have liked the blog',
  })
  likes: string[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
