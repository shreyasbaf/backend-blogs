import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddCommentInput {
  @Field(() => String, { description: 'Id' })
  id: string;

  @Field(() => String, { description: 'Comment' })
  comment: string;

  @Field(() => String, { description: 'User ID' })
  userId: string;
}
