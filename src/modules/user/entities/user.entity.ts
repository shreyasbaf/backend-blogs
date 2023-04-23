import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'First Name' })
  firstName: string;

  @Prop()
  @Field(() => String, { description: 'Last Name' })
  lastName: string;

  @Prop({ unique: true })
  @Field(() => String, { description: 'Email' })
  email: string;

  @Prop()
  @Field(() => String, { description: 'Password' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
