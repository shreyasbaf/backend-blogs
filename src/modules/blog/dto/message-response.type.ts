import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field(() => String, { description: 'Message' })
  message: string;

  @Field(() => Number, { description: 'Status' })
  statusCode: number;
}
