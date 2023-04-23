import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LikeBlogInput {
  @Field(() => String, { description: 'Id' })
  id: string;

  @Field(() => String, { description: 'User ID' })
  userId: string;
}
