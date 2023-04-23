import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class CommentType {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Int, { nullable: true })
  count?: number;

  @Field(() => String, { nullable: true })
  userName?: string;
}

@ObjectType()
class BlogType {
  @Field(() => String)
  _id: string;

  @Field(() => String, { description: 'Blog Title' })
  title: string;

  @Field(() => String, { description: 'Blog Description' })
  description: string;

  @Field(() => [CommentType], {
    description: 'Blog Comments',
    nullable: true,
  })
  comments: CommentType[];

  @Field(() => [String], {
    description: 'Array of user ids who have liked the blog',
  })
  likes: string[];
}

@ObjectType()
export class GetBlogs {
  @Field(() => Number, { description: 'Count of Number of Blogs' })
  count: number;
  @Field(() => [BlogType], { nullable: true })
  blog: BlogType[];
}
