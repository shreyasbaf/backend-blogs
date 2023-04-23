// import { Field, ObjectType } from '@nestjs/graphql';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { Comments } from './entities/blog.entity';

// @Schema()
// @ObjectType()
// export class Blog {
//   @Field(() => String)
//   _id: string;

//   @Prop()
//   @Field(() => String, { description: 'Blog Title' })
//   title: string;

//   @Prop()
//   @Field(() => String, { description: 'Blog Description' })
//   description: string;

//   @Prop()
//   @Field(() => [Comments], {
//     description: 'Blog Comments',
//     nullable: true,
//   })
//   comments: Comments[];
// }

// export type BlogDocument = Blog & Document;

// export const BlogSchema = SchemaFactory.createForClass(Blog);
