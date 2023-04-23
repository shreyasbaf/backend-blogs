import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
//import { Blog } from './blog.schema';
import { CreateBlogInput } from './dto/create-blog.input';
import { MessageResponse } from './dto/message-response.type';
import { UpdateBlogInput } from './dto/update-blog.input';
import { AddCommentInput } from './dto/add-comment.input';
import { UserService } from '../user/user.service';
import { GetBlogs } from './dto/get-blogs-type';
import { LikeBlogInput } from './dto/like-unlike.input';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(
    private readonly blogService: BlogService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Blog)
  createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return this.blogService.create(createBlogInput);
  }

  @Query(() => GetBlogs, { name: 'getAllBlogs' })
  findAll() {
    return this.blogService.findAll();
  }

  @Query(() => Blog, { name: 'getBlog' })
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.blogService.findOne(id);
  }

  @Mutation(() => Blog)
  updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogService.update(updateBlogInput._id, updateBlogInput);
  }

  @Mutation(() => MessageResponse)
  remove(@Args('id', { type: () => String }) id: string) {
    return this.blogService.remove(id);
  }

  @Mutation(() => Blog)
  async addComment(@Args('addCommentInput') addCommentInput: AddCommentInput) {
    return this.blogService.addComment(
      addCommentInput.id,
      addCommentInput.comment,
      addCommentInput.userId,
    );
  }

  @Mutation(() => MessageResponse)
  async likeBlog(@Args('likeBlogInput') likeBlogInput: LikeBlogInput) {
    return this.blogService.like(likeBlogInput.id, likeBlogInput.userId);
  }

  @Mutation(() => MessageResponse)
  async unLikeBlog(@Args('likeBlogInput') likeBlogInput: LikeBlogInput) {
    return this.blogService.unlike(likeBlogInput.id, likeBlogInput.userId);
  }
}
